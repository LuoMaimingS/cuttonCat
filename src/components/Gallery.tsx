import { motion } from 'framer-motion';

const artworks = [
  {
    id: 1,
    title: "星空下的猫",
    author: "小明 (7岁)",
    category: "水彩",
    imgUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "未来的城市",
    author: "李华 (12岁)",
    category: "马克笔",
    imgUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "森林朋友",
    author: "安安 (5岁)",
    category: "儿童画",
    imgUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "梦幻城堡",
    author: "张伟 (9岁)",
    category: "丙烯",
    imgUrl: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    title: "向日葵的微笑",
    author: "小红 (8岁)",
    category: "彩铅",
    imgUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    title: "夏日海滩",
    author: "王芳 (15岁)",
    category: "油画",
    imgUrl: "https://images.unsplash.com/photo-1533038590840-1c7847b7e809?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">作品展示</h2>
          <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            每一次落笔都是心灵的独白，每一抹色彩都是对世界的想象。来看看棉花猫小学员们的精彩画作吧。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 aspect-square">
                <img 
                  src={art.imgUrl} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-orange-300 text-sm font-medium mb-1">{art.category}</span>
                  <h3 className="text-white text-xl font-bold mb-1">{art.title}</h3>
                  <p className="text-gray-300 text-sm">{art.author}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-8 py-3 rounded-full border-2 border-orange-500 text-orange-600 font-bold hover:bg-orange-50 transition-colors">
            查看更多作品
          </button>
        </div>
      </div>
    </section>
  );
}
