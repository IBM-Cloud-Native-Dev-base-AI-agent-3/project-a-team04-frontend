/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronRight,
  Bell,
  Newspaper,
  LayoutGrid,
  Users,
  Calendar,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const WIS_BLUE = '#0054A6';
const WIS_ORANGE = '#F68B1E';
const WIS_LOGO_BLUE = '#00d1ff';

function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <SiteHeader />

      {/* Hero Section with YouTube Video Background */}
      <section className="relative min-h-[100svh] overflow-hidden flex items-center justify-center">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100svh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover"
            src="https://www.youtube.com/embed/1rEzjdrfdxk?autoplay=1&mute=1&controls=0&loop=1&playlist=1rEzjdrfdxk&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1"
            title="WIC 2020 Background Video"
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
                <span className="font-black text-7xl md:text-[120px] tracking-tighter text-white drop-shadow-2xl">WIC</span>
                <span className="font-black text-7xl md:text-[120px] tracking-tighter text-[#00d1ff] drop-shadow-2xl">2020</span>
              </div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full inline-block"
              >
                <p className="text-xl md:text-3xl font-bold tracking-widest">
                  2020. 04. 15(WED) - 17(FRI) | COEX
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
                <span className="font-extrabold text-xl tracking-tighter text-white">WIC 2020</span>
              </div>
              <p className="mb-4 text-sm leading-relaxed">
                (06164) 서울특별시 강남구 영동대로 511 (삼성동) 코엑스<br />
                사업자등록번호 : 123-45-78910 | 대표자 : 코엑스
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
                <li>참가문의: 02-123-4567</li>
                <li>참관문의: 02-123-4567</li>
                <li>이메일: wlc@worlditconference.co.kr</li>
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
            <p>© WIC 2020. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FreeBoardPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const posts = Array.from({ length: 50 }, (_, index) => {
    const number = 50 - index;
    return {
      id: number,
      title: `WIC 2020 자유게시판 샘플 글 ${number}`,
      author: ['admin', 'itlover', 'visitor01', 'newbie', 'techdaily'][index % 5],
      date: `2026.04.${String((index % 28) + 1).padStart(2, '0')}`,
      views: 50 + index * 7,
      likes: 5 + index * 2,
    };
  });

  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePosts = posts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900">자유게시판</h1>
            <p className="text-slate-500 mt-2">자유롭게 의견을 나누는 공간입니다.</p>
          </div>
          <Button style={{ backgroundColor: WIS_BLUE }} className="text-white font-bold hover:brightness-95">
            글쓰기
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-bold w-24">번호</th>
                  <th className="px-4 py-3 text-left font-bold">제목</th>
                  <th className="px-4 py-3 text-left font-bold w-32">작성자</th>
                  <th className="px-4 py-3 text-left font-bold w-32">작성일</th>
                  <th className="px-4 py-3 text-left font-bold w-24">조회수</th>
                  <th className="px-4 py-3 text-left font-bold w-24">좋아요</th>
                </tr>
              </thead>
              <tbody>
                {visiblePosts.map((post) => (
                  <tr key={post.id} className="border-t border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                    <td className="px-4 py-3 text-slate-600">{post.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{post.title}</td>
                    <td className="px-4 py-3 text-slate-600">{post.author}</td>
                    <td className="px-4 py-3 text-slate-600">{post.date}</td>
                    <td className="px-4 py-3 text-slate-600">{post.views}</td>
                    <td className="px-4 py-3 text-slate-600">{post.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-sm text-slate-500 text-center">
            총 {posts.length}개 글 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, posts.length)}개 표시
          </p>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Button
              variant="outline"
              className="h-9 px-3 bg-white"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              이전
            </Button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  className={`h-9 w-9 p-0 ${currentPage === page ? 'text-white' : 'bg-white'}`}
                  style={currentPage === page ? { backgroundColor: WIS_BLUE } : undefined}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}

            <Button
              variant="outline"
              className="h-9 px-3 bg-white"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            >
              다음
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function ForumGuidePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const forumThemes = [
    'AI',
    '스타트업',
    '클라우드',
    '보안',
    '데이터',
    '네트워킹',
    'DX',
    '로보틱스',
    '스마트팩토리',
    '핀테크',
  ];

  const forumPlaces = ['COEX Hall A', 'COEX Hall B', 'COEX Hall C', 'COEX Conference Room'];
  const forumDates = ['2026.04.15', '2026.04.16', '2026.04.17'];
  const forumStatuses = ['등록가능', '모집중', '준비', '예정', '마감'];

  const forums = Array.from({ length: 30 }, (_, index) => {
    const number = index + 1;
    const theme = forumThemes[index % forumThemes.length];
    const secondaryTheme = forumThemes[(index + 3) % forumThemes.length];

    return {
      id: `F-${String(number).padStart(2, '0')}`,
      title: `${theme} 포럼 ${number}`,
      date: forumDates[index % forumDates.length],
      place: forumPlaces[index % forumPlaces.length],
      status: forumStatuses[index % forumStatuses.length],
      desc: `${theme}와 ${secondaryTheme} 트렌드를 중심으로 한 포럼 등록 샘플 데이터입니다.`,
      thumbnail: `https://picsum.photos/seed/forum-${number}/640/360`,
    };
  });

  const totalPages = Math.ceil(forums.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleForums = forums.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />
      <main className="container mx-auto px-4 pt-44 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-900">포럼안내</h1>
            <p className="text-slate-500 mt-2">포럼을 카드 또는 그리드 형식으로 등록하고 확인할 수 있습니다.</p>
          </div>
          <Button style={{ backgroundColor: WIS_BLUE }} className="text-white font-bold hover:brightness-95">
            포럼 등록하기
          </Button>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleForums.map((forum) => (
              <Card key={forum.id} className="rounded-none overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow bg-white *:[img:first-child]:!rounded-none *:[img:last-child]:!rounded-none">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 overflow-hidden rounded-none">
                    <img
                      src={forum.thumbnail}
                      alt={forum.title}
                      className="h-[calc(14rem*1.3)] w-full rounded-none object-cover transition-transform duration-500 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h2 className="text-xl font-black text-slate-900 mb-2 leading-snug">{forum.title}</h2>
                  <p className="text-sm text-slate-500 mb-4 flex-1">{forum.desc}</p>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex justify-between gap-3">
                      <span className="font-medium text-slate-500">일정</span>
                      <span className="font-semibold text-slate-800 text-right">{forum.date}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="font-medium text-slate-500">장소</span>
                      <span className="font-semibold text-slate-800 text-right">{forum.place}</span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="font-medium text-slate-500">상태</span>
                      <span className="font-semibold text-slate-800 text-right">{forum.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm text-slate-500 text-center">
              총 {forums.length}개 포럼 중 {startIndex + 1}-{Math.min(startIndex + itemsPerPage, forums.length)}개 표시
            </p>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Button
                variant="outline"
                className="h-9 px-3 bg-white"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              >
                이전
              </Button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    className={`h-9 w-9 p-0 ${currentPage === page ? 'text-white' : 'bg-white'}`}
                    style={currentPage === page ? { backgroundColor: WIS_BLUE } : undefined}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                className="h-9 px-3 bg-white"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-black mb-2">로그인</h1>
          <p className="text-slate-500 mb-6">계정 정보를 입력해 주세요.</p>
          <div className="space-y-4">
            <Input placeholder="이메일" type="email" />
            <Input placeholder="비밀번호" type="password" />
            <Button className="w-full h-11 text-white font-bold" style={{ backgroundColor: WIS_BLUE }}>
              로그인
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <SiteHeader />
      <main className="container mx-auto px-4 min-h-screen pt-28 pb-10 flex items-center justify-center">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-black mb-2">회원가입</h1>
          <p className="text-slate-500 mb-6">간단한 정보를 입력해 가입하세요.</p>
          <div className="space-y-4">
            <Input placeholder="이름" />
            <Input placeholder="이메일" type="email" />
            <Input placeholder="비밀번호" type="password" />
            <Button className="w-full h-11 text-white font-bold" style={{ backgroundColor: WIS_BLUE }}>
              회원가입
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/free-board" element={<FreeBoardPage />} />
      <Route path="/forum-guide" element={<ForumGuidePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
