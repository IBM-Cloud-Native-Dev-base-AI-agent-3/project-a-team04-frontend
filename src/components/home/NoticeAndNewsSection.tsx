import { ChevronRight, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NoticeAndNewsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">공지사항</h2>
                <p className="text-slate-500 font-medium">WIS 2025의 새로운 소식을 전해드립니다.</p>
              </div>
              <Button variant="ghost" className="text-blue-600 font-bold">
                전체보기 <ChevronRight size={16} />
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { title: "World IT Show 2025 참가업체 모집 안내", date: "2025.04.10", category: "공지" },
                { title: "WIS 2024 결과보고서 및 사진 자료실 업데이트", date: "2024.12.20", category: "자료" },
                { title: "전시장 오시는 길 및 주차 안내 (코엑스)", date: "2024.11.15", category: "안내" },
                { title: "WIS 혁신상(Innovation Awards) 신청 안내", date: "2024.10.05", category: "이벤트" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex justify-between items-center group">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">{item.category}</Badge>
                    <span className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors">{item.title}</span>
                  </div>
                  <span className="text-sm text-slate-400 font-medium">{item.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">보도자료</h2>
                <p className="text-slate-500 font-medium">미디어에 비친 World IT Show</p>
              </div>
              <Button variant="ghost" className="text-blue-600 font-bold">
                전체보기 <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: "AI와 디지털 트랜스포메이션의 총집합, WIS 2025 개최", 
                  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=250",
                  date: "2025.04.11"
                },
                { 
                  title: "글로벌 빅테크 기업들, WIS 2025 대거 참가 확정", 
                  image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400&h=250",
                  date: "2025.04.09"
                },
              ].map((item, idx) => (
                <Card key={idx} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <CardContent className="p-6 bg-white">
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                    <div className="flex items-center text-slate-400 text-sm font-medium">
                      <Newspaper size={14} className="mr-2" />
                      <span>{item.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
