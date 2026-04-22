import { useTranslation } from 'react-i18next';
import { ChevronRight, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NoticeAndNewsSection() {
  const { t } = useTranslation();

  // 샘플 데이터 - 실제로는 서버에서 불러와야 함
  const notices = [
    { title: t('home.news.notices.title1'), date: "2025.04.10", category: t('home.news.category.notice') },
    { title: t('home.news.notices.title2'), date: "2024.12.20", category: t('home.news.category.data') },
    { title: t('home.news.notices.title3'), date: "2024.11.15", category: t('home.news.category.guide') },
    { title: t('home.news.notices.title4'), date: "2024.10.05", category: t('home.news.category.event') },
  ];

  const pressReleases = [
    { 
      title: t('home.news.title1'),
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=250",
      date: "2025.04.11"
    },
    { 
      title: t('home.news.title2'),
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400&h=250",
      date: "2025.04.09"
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">{t('home.announcements')}</h2>
                <p className="text-slate-500 font-medium">{t('home.announcementsDescription')}</p>
              </div>
              <Button variant="ghost" className="text-blue-600 font-bold">
                {t('home.viewAll')} <ChevronRight size={16} />
              </Button>
            </div>
            <div className="space-y-4">
              {notices.map((item, idx) => (
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
                <h2 className="text-3xl font-black text-slate-900 mb-2">{t('home.pressReleases')}</h2>
                <p className="text-slate-500 font-medium">{t('home.pressReleasesDescription')}</p>
              </div>
              <Button variant="ghost" className="text-blue-600 font-bold">
                {t('home.viewAll')} <ChevronRight size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pressReleases.map((item, idx) => (
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
