import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_STYLES } from '@/constants/theme';

const NAV_ITEMS = [
  {
    titleKey: 'navigation.wisAbout',
    items: [
      'navigation.exhibitionOverview',
      'navigation.exhibitionItems',
      'navigation.sideEvents',
      'navigation.coLocatedEvents',
      'navigation.previousResults',
      'navigation.contactUs',
    ],
  },
  {
    titleKey: 'navigation.participationGuide',
    items: ['navigation.applicationGuide', 'navigation.exhibitorLogin', 'navigation.sponsorshipProgram'],
  },
  {
    titleKey: 'navigation.visitorGuide',
    items: [
      'navigation.visitorGuide',
      'navigation.forumGuide',
      'navigation.onlinePreRegistration',
      'navigation.exhibitorList',
      'navigation.boothLayout',
    ],
  },
  {
    titleKey: 'navigation.forumGuide',
    path: '/forum-guide',
    items: ['navigation.forumGuide'],
  },
  {
    titleKey: 'navigation.media',
    items: ['navigation.announcements', 'navigation.pressReleases', 'navigation.newsletter', 'navigation.gallery'],
  },
  {
    titleKey: 'navigation.freeBoard',
    path: '/free-board',
    items: ['navigation.freeBoard'],
  },
];

interface SiteHeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function SiteHeader({ isLoggedIn = false, onLogout = () => {} }: SiteHeaderProps) {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    onLogout?.();
    navigate('/');
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isNavHovered ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      <div className="bg-[#f8f9fa] border-b border-slate-200 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-6 text-[11px] font-bold text-[#666]">
          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center space-x-1 cursor-pointer hover:text-brand-primary transition-colors"
            >
              <Globe size={12} />
              <span>{i18n.language === 'en' ? t('navigation.english') : t('navigation.korean')}</span>
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-md shadow-lg z-50">
                <button
                  onClick={() => handleLanguageChange('ko')}
                  className={`block w-full text-left px-4 py-2 text-xs font-bold transition-colors ${i18n.language === 'ko' ? 'bg-blue-100 text-brand-primary' : 'hover:bg-slate-100'}`}
                >
                  {t('navigation.korean')}
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`block w-full text-left px-4 py-2 text-xs font-bold transition-colors ${i18n.language === 'en' ? 'bg-blue-100 text-brand-primary' : 'hover:bg-slate-100'}`}
                >
                  {t('navigation.english')}
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="cursor-pointer hover:text-brand-primary">
                  {t('navigation.mypage')}
                </Link>
                <button type="button" onClick={handleLogout} className="cursor-pointer hover:text-brand-primary flex items-center gap-1">
                  <LogOut size={11} />
                  {t('navigation.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="cursor-pointer hover:text-brand-primary">
                  {t('navigation.login')}
                </Link>
                <Link to="/signup" className="cursor-pointer hover:text-brand-primary">
                  {t('navigation.signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center cursor-pointer">
            <span className="font-black text-3xl tracking-tighter text-[#1a3a6c]">WIC</span>
            <span className="font-black text-3xl tracking-tighter" style={APP_STYLES.logoAccent}>
              2020
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-12">
            {NAV_ITEMS.map((item) => (
              <div key={item.titleKey} className="relative group h-20 flex items-center">
                {item.path ? (
                  <Link to={item.path} className="text-[17px] font-bold text-[#333] hover:text-brand-primary transition-colors">
                    {t(item.titleKey)}
                  </Link>
                ) : (
                  <button className="text-[17px] font-bold text-[#333] hover:text-brand-primary transition-colors">
                    {t(item.titleKey)}
                  </button>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden lg:flex">
              <Search size={22} className="text-[#333]" />
            </Button>
            <Button variant="ghost" size="icon">
              <Menu size={28} className="text-[#333]" />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isNavHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-4 py-12">
              <div className="flex justify-center items-start space-x-20">
                {NAV_ITEMS.map((item) => (
                  <div key={item.titleKey} className="flex flex-col items-center w-32">
                    <ul className="space-y-4 text-center">
                      {item.items.map((subItem, index) => (
                        <li key={subItem}>
                          {item.path && index === 0 ? (
                            <Link to={item.path} className="text-[15px] font-medium text-white/80 hover:text-white hover:font-bold transition-all block whitespace-nowrap">
                              {t(subItem)}
                            </Link>
                          ) : (
                            <a href="#" className="text-[15px] font-medium text-white/80 hover:text-white hover:font-bold transition-all block whitespace-nowrap">
                              {t(subItem)}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}