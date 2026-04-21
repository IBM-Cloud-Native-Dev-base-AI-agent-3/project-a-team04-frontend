import { motion } from 'motion/react';
import { LayoutGrid, Users, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

export default function QuickLinksSection() {
  return (
    <section className="py-20 text-white relative overflow-hidden" style={{ backgroundColor: APP_THEME.colors.primary }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -mr-48 -mt-48" style={{ backgroundColor: `${APP_THEME.colors.logoBlue}33` }} />
      <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-blue-950/20 rounded-full blur-3xl -ml-48 -mb-48" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "참가신청", desc: "Exhibitor", icon: LayoutGrid },
              { title: "참관등록", desc: "Visitor", icon: Users },
              { title: "참가업체 리스트", desc: "Exhibitor List", icon: Calendar },
              { title: "공지사항", desc: "Notice", icon: Bell },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl cursor-pointer hover:bg-white/20 transition-all group"
              >
                <item.icon className="mb-4 group-hover:text-white transition-colors" style={{ color: APP_THEME.colors.logoBlue }} size={28} />
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-xs opacity-60 uppercase tracking-wider">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
            <div className="mb-8">
              <h2 className="text-3xl font-black mb-3">WIS 뉴스레터 구독</h2>
              <p className="text-blue-100 font-medium opacity-80">
                전시회 주요 소식과 최신 IT 트렌드를 <br />
                가장 빠르게 이메일로 받아보실 수 있습니다.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="이메일 주소를 입력하세요" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl px-6 focus:bg-white/20 transition-all"
              />
              <Button style={APP_STYLES.secondaryButton} className="h-14 px-10 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 transition-all">
                구독하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
