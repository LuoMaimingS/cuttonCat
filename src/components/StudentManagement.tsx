import { motion } from 'framer-motion';
import { BookOpen, CalendarCheck, Award, LogIn } from 'lucide-react';

export default function StudentManagement() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: "课程记录",
      desc: "随时查看孩子的上课进度与课后作业评价",
      color: "bg-blue-400",
      shadow: "shadow-blue-200"
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-white" />,
      title: "在线排课",
      desc: "一键请假、调课，智能匹配合适的补课时间",
      color: "bg-green-400",
      shadow: "shadow-green-200"
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: "成长档案",
      desc: "自动生成孩子的阶段性作品集与成长报告",
      color: "bg-purple-400",
      shadow: "shadow-purple-200"
    }
  ];

  return (
    <section id="management" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              智能教务系统
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
              家校互通，<br/>
              让成长轨迹<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">清晰可见</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              棉花猫专属家校服务平台，为家长提供透明、便捷的教务服务。见证孩子的每一次进步，让艺术教育更省心。
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 hover:-translate-y-1">
                <LogIn className="w-5 h-5" />
                家长登录
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-gray-700 border-2 border-gray-200 font-bold text-lg hover:border-gray-300 transition-all hover:-translate-y-1">
                教师入口
              </button>
            </div>
          </motion.div>

          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100/40 to-purple-100/40 rounded-[3rem] -z-10 blur-xl"></div>
              
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300 ${index === 2 ? 'sm:col-span-2 sm:w-2/3 sm:mx-auto' : ''}`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.color} ${feature.shadow}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
