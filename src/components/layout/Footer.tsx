import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6 grayscale opacity-70">
              <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-white font-bold">W</div>
              <span className="font-extrabold text-xl tracking-tighter text-white">WIC 2020</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed">
              (06164) 서울특별시 강남구 영동대로 511 (삼성동) 코엑스<br />
              사업자등록번호 : 123-45-78910 | 대표자 : 코엑스
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                <Facebook size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                <Youtube size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-colors cursor-pointer">
                <Linkedin size={20} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">전시회 문의</h4>
            <ul className="space-y-3 text-sm">
              <li>참가문의: 02-123-4567</li>
              <li>참관문의: 02-123-4567</li>
              <li>이메일: wlc@worlditconference.co.kr</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">관련 사이트</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">한국정보통신진흥협회</li>
              <li className="hover:text-white cursor-pointer transition-colors">한국무역협회</li>
              <li className="hover:text-white cursor-pointer transition-colors">코엑스</li>
              <li className="hover:text-white cursor-pointer transition-colors">전자신문</li>
            </ul>
          </div>
        </div>
        <Separator className="bg-slate-800 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">개인정보처리방침</span>
            <span className="hover:text-white cursor-pointer">이용약관</span>
            <span className="hover:text-white cursor-pointer">이메일무단수집거부</span>
          </div>
          <p>© WIC 2020. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
