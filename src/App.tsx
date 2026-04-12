/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Menu,
  ChevronRight,
  Globe,
  Bell,
  Newspaper,
  LayoutGrid,
  Users,
  Calendar,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const WIS_BLUE = "#0054A6";
const WIS_LOGO_BLUE = "#00d1ff";
const WIS_ORANGE = "#F68B1E";

const NAV_ITEMS = [
  { 
    title: "WIS 소개", 
    items: ["전시회 개요", "전시품목", "부대행사", "동시개최행사", "지난행사결과", "Contact Us"] 
  },
  { 
    title: "참가안내", 
    items: ["참가신청 안내", "참가업체 로그인", "스폰서쉽 패키지 프로그램"] 
  },
  { 
    title: "관람안내", 
    items: ["관람안내", "온라인 사전등록", "참가업체 리스트", "부스배치도"] 
  },
  { 
    title: "Mingling Zone", 
    items: ["Mingling Zone"] 
  },
  { 
    title: "미디어", 
    items: ["공지사항", "보도자료", "뉴스레터", "갤러리"] 
  },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header & Mega Menu */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isNavHovered ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-sm"}`}
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
      >
        {/* Top Bar (Now inside fixed header) */}
        <div className="bg-[#f8f9fa] border-b border-slate-200 py-2 hidden md:block">
          <div className="container mx-auto px-4 flex justify-end items-center space-x-6 text-[11px] font-bold text-[#666]">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#0054A6]">
              <Globe size={12} />
              <span>KOR / ENG</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="cursor-pointer hover:text-[#0054A6]">로그인</span>
              <span className="cursor-pointer hover:text-[#0054A6]">회원가입</span>
              <span className="cursor-pointer hover:text-[#0054A6]">마이페이지</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer">
              <span className="font-black text-3xl tracking-tighter text-[#1a3a6c]">WIS</span>
              <span className="font-black text-3xl tracking-tighter" style={{ color: WIS_LOGO_BLUE }}>2026</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-12">
              {NAV_ITEMS.map((item) => (
                <div key={item.title} className="relative group h-20 flex items-center">
                  <button className="text-[17px] font-bold text-[#333] hover:text-[#0054A6] transition-colors">
                    {item.title}
                  </button>
                </div>
              ))}
            </nav>

            {/* Right Side Icons */}
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

        {/* Mega Menu Panel */}
        <AnimatePresence>
          {isNavHovered && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="container mx-auto px-4 py-12">
                <div className="flex justify-center items-start space-x-20">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.title} className="flex flex-col items-center w-32">
                      <ul className="space-y-4 text-center">
                        {item.items.map((subItem) => (
                          <li key={subItem}>
                            <a href="#" className="text-[15px] font-medium text-white/80 hover:text-white hover:font-bold transition-all block whitespace-nowrap">
                              {subItem}
                            </a>
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

      {/* Hero Section with YouTube Video Background */}
      <section className="relative min-h-[100svh] overflow-hidden flex items-center justify-center">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100svh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover"
            src="https://www.youtube.com/embed/1rEzjdrfdxk?autoplay=1&mute=1&controls=0&loop=1&playlist=1rEzjdrfdxk&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1"
            title="WIS 2026 Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          {/* Overlay Gradients */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-white"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center mb-4">
                <span className="font-black text-7xl md:text-[120px] tracking-tighter text-white drop-shadow-2xl">WIS</span>
                <span className="font-black text-7xl md:text-[120px] tracking-tighter text-[#00d1ff] drop-shadow-2xl">2026</span>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full inline-block"
              >
                <p className="text-xl md:text-3xl font-bold tracking-widest">
                  2026. 04. 15(WED) - 17(FRI) | COEX
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Quick Links Integrated with Newsletter */}
      <section className="py-20 text-white relative overflow-hidden bg-[#0054A6]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d1ff]/20 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-blue-950/20 rounded-full blur-3xl -ml-48 -mb-48" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Quick Links Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "참가신청", desc: "Exhibitor", icon: LayoutGrid },
                { title: "참관등록", desc: "Visitor", icon: Users },
                { title: "참가업체 리스트", desc: "Exhibitor List", icon: Calendar },
                { title: "공지사항", desc: "Notice", icon: Bell },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl cursor-pointer hover:bg-white/20 transition-all group"
                >
                  <item.icon className="mb-4 text-[#00d1ff] group-hover:text-white transition-colors" size={28} />
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-xs opacity-60 uppercase tracking-wider">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-md">
              <div className="mb-8">
                <h2 className="text-3xl font-black mb-3">WIS 뉴스레터 구독</h2>
                <p className="text-blue-100 font-medium opacity-80">
                  전시회 주요 소식과 최신 IT 트렌드를 <br />
                  가장 빠르게 이메일로 받아보실 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="이메일 주소를 입력하세요" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-14 rounded-xl px-6 focus:bg-white/20 transition-all"
                />
                <Button style={{ backgroundColor: WIS_ORANGE }} className="h-14 px-10 rounded-xl font-bold text-lg shadow-lg hover:brightness-110 transition-all">
                  구독하기
                </Button>
              </div>
              <p className="mt-4 text-[11px] text-blue-200 opacity-60">
                * 구독 시 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notice & News */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Notice */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">공지사항</h2>
                  <p className="text-slate-500 font-medium">WIS 2025의 새로운 소식을 전해드립니다.</p>
                </div>
                <Button variant="ghost" className="text-blue-600 font-bold">
                  전체보기 <ChevronRight size={16} />
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { title: "World IT Show 2025 참가업체 모집 안내", date: "2025.04.10", category: "공지" },
                  { title: "WIS 2024 결과보고서 및 사진 자료실 업데이트", date: "2024.12.20", category: "자료" },
                  { title: "전시장 오시는 길 및 주차 안내 (코엑스)", date: "2024.11.15", category: "안내" },
                  { title: "WIS 혁신상(Innovation Awards) 신청 안내", date: "2024.10.05", category: "이벤트" },
                ].map((item, idx) => (
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

            {/* News */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 mb-2">보도자료</h2>
                  <p className="text-slate-500 font-medium">미디어에 비친 World IT Show</p>
                </div>
                <Button variant="ghost" className="text-blue-600 font-bold">
                  전체보기 <ChevronRight size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    title: "AI와 디지털 트랜스포메이션의 총집합, WIS 2025 개최", 
                    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=250",
                    date: "2025.04.11"
                  },
                  { 
                    title: "글로벌 빅테크 기업들, WIS 2025 대거 참가 확정", 
                    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400&h=250",
                    date: "2025.04.09"
                  },
                ].map((item, idx) => (
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6 grayscale opacity-70">
                <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center text-white font-bold">W</div>
                <span className="font-extrabold text-xl tracking-tighter text-white">WORLD IT SHOW</span>
              </div>
              <p className="mb-4 text-sm leading-relaxed">
                (06164) 서울특별시 강남구 영동대로 511 (삼성동) 코엑스<br />
                사업자등록번호 : 120-81-27235 | 대표자 : 구자열
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
              <h4 className="text-white font-bold mb-6">전시회 문의</h4>
              <ul className="space-y-3 text-sm">
                <li>참가문의: 02-551-7131</li>
                <li>참관문의: 02-551-7132</li>
                <li>이메일: wis@worlditshow.co.kr</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">관련 사이트</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white cursor-pointer transition-colors">한국정보통신진흥협회</li>
                <li className="hover:text-white cursor-pointer transition-colors">한국무역협회</li>
                <li className="hover:text-white cursor-pointer transition-colors">코엑스</li>
                <li className="hover:text-white cursor-pointer transition-colors">전자신문</li>
              </ul>
            </div>
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
            <div className="flex space-x-6">
              <span className="hover:text-white cursor-pointer">개인정보처리방침</span>
              <span className="hover:text-white cursor-pointer">이용약관</span>
              <span className="hover:text-white cursor-pointer">이메일무단수집거부</span>
            </div>
            <p>© WORLD IT SHOW. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
