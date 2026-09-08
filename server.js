import express from 'express';
import cors from 'cors';
import { createClient } from 'redis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const homeDir = process.env.HOME || process.env.USERPROFILE || '';
const galleryAssetsDir = process.env.GALLERY_ASSETS_DIR || path.join(homeDir, 'assets');
const PREVIEW_HOST = 'preview.mianhuamao.cn';

const isPreviewHost = (req) => {
    const host = req.headers['x-forwarded-host'] || req.headers.host || '';
    return String(host).split(',')[0].split(':')[0] === PREVIEW_HOST;
};

const app = express();
app.use(cors());
app.use(express.json());

const client = createClient({
    url: 'redis://127.0.0.1:7000'
});

client.on('error', (err) => console.log('Redis Client Error', err));
console.log('Connecting to Redis...');
await client.connect();
console.log('Connected to Redis!');

app.post('/api/vote', async (req, res) => {
    try {
        const { name, destinations } = req.body;
        if (!name || !destinations || !Array.isArray(destinations) || destinations.length === 0) {
            return res.status(400).json({ error: '请提供姓名和目的地' });
        }
        
        // 序列化数组存储到 redis
        await client.hSet('votes:season4', name, JSON.stringify(destinations));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/results', async (req, res) => {
    try {
        const votes = await client.hGetAll('votes:season4');
        const results = {};
        const userVotes = {}; // 记录每个人投了什么
        for (const [name, destinationsStr] of Object.entries(votes)) {
            try {
                const destinations = JSON.parse(destinationsStr);
                const destArray = Array.isArray(destinations) ? destinations : [destinationsStr];
                userVotes[name] = destArray;
                
                for (const destination of destArray) {
                    if (!results[destination]) {
                        results[destination] = { count: 0, voters: [] };
                    }
                    results[destination].count += 1;
                    results[destination].voters.push(name);
                }
            } catch (e) {
                const destination = destinationsStr;
                userVotes[name] = [destination];
                if (!results[destination]) {
                    results[destination] = { count: 0, voters: [] };
                }
                results[destination].count += 1;
                results[destination].voters.push(name);
            }
        }
        res.json({ results, userVotes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use('/gallery-assets', express.static(galleryAssetsDir, {
    immutable: true,
    maxAge: '30d'
}));

app.use('/gallery-assets', (req, res) => {
    res.status(404).send('Asset not found');
});

app.get('/', (req, res, next) => {
    if (isPreviewHost(req)) {
        return res.redirect(302, '/preview');
    }
    next();
});

// 托管前端静态文件
app.use(express.static(path.join(__dirname, 'dist')));

// 所有未匹配的路由都返回 index.html（支持 React Router SPA）
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
