import { motion } from 'framer-motion';
import { Palette, Sparkles, MoveRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-orange-50 to-pink-50" id="recruit">
      {/* Abstract background shapes */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-yellow-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-pink-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-orange-600 font-medium mb-8 shadow-sm border border-orange-100 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>2026春季班招生进行中</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              点亮童心，<br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">绘出无限可能</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              「棉花猫」美术培训专注于 3-18 岁儿童与青少年的美育启蒙与专业指导。
              我们不仅教画画，更致力于培养孩子的审美能力、想象力与创造力。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#recruit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1"
              >
                立即加入体验
                <MoveRight className="w-5 h-5" />
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-gray-800 font-bold text-lg hover:bg-gray-50 transition-all shadow-sm border border-gray-200 hover:-translate-y-1"
              >
                <Palette className="w-5 h-5 text-orange-500" />
                欣赏学员作品
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
