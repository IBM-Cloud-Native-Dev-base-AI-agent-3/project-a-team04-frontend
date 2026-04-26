import SiteHeader from '@/components/SiteHeader';
import HeroSection from './HeroSection';
import QuickLinksSection from './QuickLinksSection';
import NoticeAndNewsSection from './NoticeAndNewsSection';
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
