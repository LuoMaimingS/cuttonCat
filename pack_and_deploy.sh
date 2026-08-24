#!/bin/bash
set -e

# 配置服务器信息
# 根据你的截图，你使用的 ssh 别名是 mhm，部署目录是 /root/cuttonCat
SERVER="mhm" 
REMOTE_DIR="/root/cuttonCat"

echo "=========================================="
echo "🚀 开始本地构建并自动上传部署..."
echo "=========================================="

echo "🔨 1. 正在本地进行前端构建..."
npm run build

echo "📦 2. 正在打包必要文件 (排除冗余的 node_modules)..."
# 我们只需要打包 dist 静态资源、server.js 后端脚本和 package.json
tar -czvf deploy.tar.gz dist server.js package.json

echo "📤 3. 正在将压缩包上传到服务器 ($SERVER)..."
scp deploy.tar.gz $SERVER:$REMOTE_DIR/

echo "⚙️ 4. 正在服务器上执行解压和热启动..."
ssh $SERVER "cd $REMOTE_DIR && \
    echo '正在解压...' && \
    tar -xzvf deploy.tar.gz && \
    echo '安装仅生产环境依赖 (极速)...' && \
    npm install --production --registry=https://registry.npmmirror.com && \
    echo '重启 PM2 服务...' && \
    (pm2 restart cotton-cat-web || PORT=8080 pm2 start server.js --name cotton-cat-web) && \
    pm2 save"

echo "🧹 5. 清理本地压缩包..."
rm deploy.tar.gz

echo "=========================================="
echo "✅ 极速部署完成！"
echo "=========================================="