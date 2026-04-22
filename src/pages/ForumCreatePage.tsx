import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

const forumThemes = ['AI', '스타트업', '클라우드', '보안', '데이터', '네트워킹', 'DX', '로보틱스', '스마트팩토리', '핀테크'];
const forumPlaces = ['COEX Hall A', 'COEX Hall B', 'COEX Hall C', 'COEX Conference Room'];

interface ForumCreatePageProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function ForumCreatePage({ isLoggedIn, onLogout }: ForumCreatePageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 mb-2">{t('forum.forumCreate')}</h1>
          <p className="text-slate-500 mb-8">{t('forum.forumCreateDescription')}</p>

          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('forum.title')} *</label>
                  <Input placeholder={t('forum.titlePlaceholder')} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('forum.theme')} *</label>
                    <select className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>{t('forum.selectTheme')}</option>
                      {forumThemes.map((theme) => (
                        <option key={theme} value={theme}>{theme}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t('forum.date')} *</label>
                    <Input type="datetime-local" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('forum.location')} *</label>
                  <select className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>{t('forum.selectLocation')}</option>
                    {forumPlaces.map((place) => (
                      <option key={place} value={place}>{place}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('forum.description')} *</label>
                  <textarea 
                    className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('forum.descriptionPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('forum.image')}</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                    <p className="text-slate-600 font-medium">{t('forum.imageDragHint')}</p>
                    <p className="text-sm text-slate-500 mt-1">{t('forum.imageMaxSize')}</p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 h-11 text-white font-bold" 
                    style={APP_STYLES.primaryButton}
                    onClick={() => navigate('/forum-guide')}
                  >
                    {t('forum.register')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 h-11 font-bold"
                    onClick={() => navigate('/forum-guide')}
                  >
                    {t('common.cancel')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
