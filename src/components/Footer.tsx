export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] py-8 text-[13px] text-gray-500 font-sans mt-20 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        {/* 通用导航链接 */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          <a href="#" className="hover:text-gray-800 transition-colors">关于我们</a>
          <a href="#" className="hover:text-gray-800 transition-colors">联系我们</a>
          <a href="#" className="hover:text-gray-800 transition-colors">服务条款</a>
          <a href="#" className="hover:text-gray-800 transition-colors">隐私政策</a>
        </div>
        
        {/* 版权信息与备案号 */}
        <div className="flex flex-wrap justify-center items-center gap-4 text-gray-400">
          <span>© {new Date().getFullYear()} 版权所有</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <a 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noreferrer"
            className="hover:text-gray-800 transition-colors"
          >
            苏ICP备2026019322号-1
          </a>
        </div>
      </div>
    </footer>
  );
}
