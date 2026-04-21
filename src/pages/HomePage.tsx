import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import NoticeAndNewsSection from '@/components/home/NoticeAndNewsSection';
import Footer from '@/components/layout/Footer';
import { APP_THEME } from '@/constants/theme';

interface HomePageProps {
  isLoggedIn: boolean;
}

export default function HomePage({ isLoggedIn }: HomePageProps) {
  return (
    <div className={APP_THEME.classes.pageShellPlain}>
      <SiteHeader isLoggedIn={isLoggedIn} />
      <HeroSection />
      <QuickLinksSection />
      <NoticeAndNewsSection />
      <Footer />
    </div>
  );
}
