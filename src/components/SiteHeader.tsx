import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, Menu, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { APP_STYLES } from '@/constants/theme';

const NAV_ITEMS = [
  {
    title: 'WIS 소개',
    items: ['전시회 개요', '전시품목', '부대행사', '동시개최행사', '지난행사결과', 'Contact Us'],
  },
  {
    title: '참가안내',
    items: ['참가신청 안내', '참가업체 로그인', '스폰서쉽 패키지 프로그램'],
  },
  {
    title: '관람안내',
    items: ['관람안내', '포럼안내', '온라인 사전등록', '참가업체 리스트', '부스배치도'],
  },
  {
    title: '포럼안내',
    path: '/forum-guide',
    items: ['포럼안내'],
  },
  {
    title: '미디어',
    items: ['공지사항', '보도자료', '뉴스레터', '갤러리'],
  },
  {
    title: '자유게시판',
    path: '/free-board',
    items: ['자유게시판'],
  },
];

interface SiteHeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

export default function SiteHeader({ isLoggedIn = false, onLogout = () => {} }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
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

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isNavHovered ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'}`}
      onMouseEnter={() => setIsNavHovered(true)}
      onMouseLeave={() => setIsNavHovered(false)}
    >
      <div className="bg-[#f8f9fa] border-b border-slate-200 py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-end items-center space-x-6 text-[11px] font-bold text-[#666]">
          <div className="flex items-center space-x-1 cursor-pointer hover:text-brand-primary">
            <Globe size={12} />
            <span>KOR / ENG</span>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="cursor-pointer hover:text-brand-primary">
                  마이페이지
                </Link>
                <button type="button" onClick={handleLogout} className="cursor-pointer hover:text-brand-primary flex items-center gap-1">
                  <LogOut size={11} />
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="cursor-pointer hover:text-brand-primary">
                  로그인
                </Link>
                <Link to="/signup" className="cursor-pointer hover:text-brand-primary">
                  회원가입
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
              <div key={item.title} className="relative group h-20 flex items-center">
                {item.path ? (
                  <Link to={item.path} className="text-[17px] font-bold text-[#333] hover:text-brand-primary transition-colors">
                    {item.title}
                  </Link>
                ) : (
                  <button className="text-[17px] font-bold text-[#333] hover:text-brand-primary transition-colors">
                    {item.title}
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
                  <div key={item.title} className="flex flex-col items-center w-32">
                    <ul className="space-y-4 text-center">
                      {item.items.map((subItem) => (
                        <li key={subItem}>
                          {item.path && subItem === '자유게시판' ? (
                            <Link to={item.path} className="text-[15px] font-medium text-white/80 hover:text-white hover:font-bold transition-all block whitespace-nowrap">
                              {subItem}
                            </Link>
                          ) : (
                            <a href="#" className="text-[15px] font-medium text-white/80 hover:text-white hover:font-bold transition-all block whitespace-nowrap">
                              {subItem}
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