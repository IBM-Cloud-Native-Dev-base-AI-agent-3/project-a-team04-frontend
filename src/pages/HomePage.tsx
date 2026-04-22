import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import NoticeAndNewsSection from '@/components/home/NoticeAndNewsSection';
import Footer from '@/components/layout/Footer';
import { APP_THEME } from '@/constants/theme';

interface HomePageProps {
  isLoggedIn: boolean;
  onLogout?: () => void;
}

export default function HomePage({ isLoggedIn, onLogout }: HomePageProps) {
  return (
    <div className={APP_THEME.classes.pageShellPlain}>
      <SiteHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <HeroSection />
      <QuickLinksSection />
      <NoticeAndNewsSection />
      <Footer />
    </div>
  );
}
