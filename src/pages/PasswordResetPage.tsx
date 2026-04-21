import { useState } from 'react';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { APP_STYLES, APP_THEME } from '@/constants/theme';

export default function PasswordResetPage() {
  const [step, setStep] = useState(1);

  return (
    <div className={APP_THEME.classes.pageShellMuted}>
      <SiteHeader isLoggedIn={false} />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-black mb-2">비밀번호 재설정</h1>
          <p className="text-slate-500 mb-6">
            {step === 1 ? '이메일을 입력해 주세요.' : '새로운 비밀번호를 입력해 주세요.'}
          </p>
          
          <div className="space-y-4">
            {step === 1 ? (
              <>
                <Input placeholder="이메일 주소" type="email" />
                <Button 
                  className="w-full h-11 text-white font-bold" 
                  style={APP_STYLES.primaryButton}
                  onClick={() => setStep(2)}
                >
                  다음
                </Button>
              </>
            ) : (
              <>
                <Input placeholder="새로운 비밀번호" type="password" />
                <Input placeholder="비밀번호 확인" type="password" />
                <Button className="w-full h-11 text-white font-bold" style={APP_STYLES.primaryButton}>
                  재설정하기
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full h-11 font-bold"
                  onClick={() => setStep(1)}
                >
                  이전
                </Button>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
