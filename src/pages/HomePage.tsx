import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import NoticeAndNewsSection from '@/components/home/NoticeAndNewsSection';
import Footer from '@/components/layout/Footer';

interface HomePageProps {
  isLoggedIn: boolean;
}

export default function HomePage({ isLoggedIn }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <SiteHeader isLoggedIn={isLoggedIn} />
      <HeroSection />
      <QuickLinksSection />
      <NoticeAndNewsSection />
      <Footer />
    </div>
  );
}
