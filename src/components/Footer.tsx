export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] py-8 text-[13px] text-gray-500 font-sans mt-20 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
        <div className="flex flex-wrap justify-center items-center gap-4">
          <span>© 北京火山引擎科技有限公司 2026 版权所有</span>
          <span>代理域名注册服务机构: 新网数码 商中在线</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-800 transition-colors">服务条款</a>
            <a href="#" className="hover:text-gray-800 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-gray-800 transition-colors">更多协议</a>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4">
          <a href="#" className="flex items-center gap-1 hover:text-gray-800 transition-colors">
            <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/beian.png" alt="公网安备" className="w-4 h-4" />
            京公网安备11010802032137号
          </a>
          <a href="#" className="hover:text-gray-800 transition-colors">ICP备-展位123456</a>
          <a href="#" className="hover:text-gray-800 transition-colors">营业执照</a>
          <span>增值电信业务经营许可证京B2-20202418, A2.B1.B2-20202637</span>
        </div>

        <div>
          <span>网络文化经营许可证：京网文（2023）4872-140号</span>
        </div>
      </div>
    </footer>
  );
}
