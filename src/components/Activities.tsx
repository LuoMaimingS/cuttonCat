import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: "「色彩的秘密」户外写生记",
    date: "2026年5月15日",
    location: "朝阳公园",
    spots: "限额30人",
    desc: "带上画板和颜料，我们在大自然中寻找最真实的色彩。专业老师带队，感受光影的变化，提升户外观察能力。",
    image: "https://images.unsplash.com/photo-1518991669955-9c7e78ec80ca?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "「未来的我」主题画展",
    date: "2026年6月1日",
    location: "798艺术区",
    spots: "全员参与",
    desc: "棉花猫年度儿童艺术展，展示孩子们的奇思妙想。届时将邀请知名艺术家现场点评，为孩子们颁发参展证书。",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "大师工坊：毕加索的立体派",
    date: "2026年4月20日",
    location: "棉花猫本校区",
    spots: "限额15人",
    desc: "解构与重组，探索立体派的奥秘。通过剪贴和绘画结合的方式，创作属于自己的立体派风格作品。",
    image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Activities() {
  return (
    <section id="activities" className="py-24 bg-orange-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">近期活动</h2>
          <div className="w-24 h-1 bg-pink-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            走出课堂，走进艺术的殿堂。丰富的实践活动让孩子们在快乐中成长。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-orange-100 flex flex-col group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-orange-500 shadow-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {activity.date}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{activity.title}</h3>
                
                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-pink-400" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-pink-400" />
                    <span>{activity.spots}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">
                  {activity.desc}
                </p>
                
                <button className="flex items-center gap-2 text-orange-500 font-bold hover:text-orange-600 transition-colors group/btn">
                  了解详情
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
