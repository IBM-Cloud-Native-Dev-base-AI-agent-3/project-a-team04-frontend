# project-a-team04-frontend

https://www.worlditshow.co.kr/main/main.php        

WIS 2026 행사 소개 페이지 형태로 구성된 React + Vite 프론트엔드 프로젝트입니다.

현재 구현에는 다음이 포함됩니다.
- 메가 메뉴 헤더, 히어로 섹션, 뉴스레터 구독 섹션 등 랜딩 페이지 UI
- `shadcn/ui` 컴포넌트 기반 UI 구성
- Tailwind CSS 기반 스타일링

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- lucide-react
- motion

## 사전 요구사항

- Node.js 18 이상 권장
- npm

## 설치

```bash
npm install
```

## 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 설정하세요.

```env
GEMINI_API_KEY=your_api_key_here
```

`GEMINI_API_KEY`는 빌드 시 주입되도록 설정되어 있습니다.

## 개발 서버 실행

```bash
npm run dev
```

개발 서버 정보:
- 주소: `http://localhost:4000`
- 포트: `4000`
- `strictPort: true` 설정으로, 4000 포트가 사용 중이면 다른 포트로 자동 변경되지 않고 실행이 실패합니다.

## 빌드 및 미리보기

```bash
npm run build
npm run preview
```

## 스크립트

- `npm run dev`: 개발 서버 실행 (`--port=4000 --host=0.0.0.0`)
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드 결과 미리보기
- `npm run clean`: `dist` 폴더 삭제
- `npm run lint`: TypeScript 타입 체크
