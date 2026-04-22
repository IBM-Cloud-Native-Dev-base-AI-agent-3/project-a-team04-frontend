import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6 grayscale opacity-70">
              <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-white font-bold">W</div>
              <span className="font-extrabold text-xl tracking-tighter text-white">WIC 2020</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed">
              {t('footer.address')}<br />
              {t('footer.businessNumber')} | {t('footer.representative')}
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                <Facebook size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                <Youtube size={20} />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-colors cursor-pointer">
                <Linkedin size={20} />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.inquiry')}</h4>
            <ul className="space-y-3 text-sm">
              <li>{t('footer.exhibitorInquiry')}: 02-123-4567</li>
              <li>{t('footer.visitorInquiry')}: 02-123-4567</li>
              <li>{t('footer.email')}: wlc@worlditconference.co.kr</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.relatedSites')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.koreanICT')}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.koreanTrade')}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.coex')}</li>
              <li className="hover:text-white cursor-pointer transition-colors">{t('footer.electronicTimes')}</li>
            </ul>
          </div>
        </div>
        <Separator className="bg-slate-800 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <div className="flex space-x-6">
            <span className="hover:text-white cursor-pointer">{t('footer.privacyPolicy')}</span>
            <span className="hover:text-white cursor-pointer">{t('footer.termsOfUse')}</span>
            <span className="hover:text-white cursor-pointer">{t('footer.emailSpamRefusal')}</span>
          </div>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
