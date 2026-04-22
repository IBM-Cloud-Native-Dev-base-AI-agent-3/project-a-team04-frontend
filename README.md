# project-a-team04-frontend

WIS 2026 행사 소개 페이지 형태로 구성된 React + Vite 프론트엔드 프로젝트입니다.

## 사전 요구사항

- Node.js 18 이상 권장
- npm

## 설치

```bash
npm install
```

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

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- lucide-react
- motion

## 사용 라이브러리 설명

### Dependencies

- `react`: UI 컴포넌트 기반 화면 구성을 위한 핵심 라이브러리입니다.
- `react-dom`: React 컴포넌트를 브라우저 DOM에 렌더링합니다.
- `react-router-dom`: 페이지 라우팅과 URL 기반 화면 전환을 처리합니다.
- `vite`: 빠른 개발 서버와 번들링을 제공하는 빌드 도구입니다.
- `@vitejs/plugin-react`: Vite에서 React(특히 Fast Refresh)를 지원합니다.
- `tailwindcss`: 유틸리티 클래스 기반 스타일링 프레임워크입니다.
- `@tailwindcss/vite`: Vite 환경에서 Tailwind CSS 통합을 돕는 플러그인입니다.
- `shadcn`: shadcn/ui 컴포넌트 생성을 위한 CLI 도구 패키지입니다.
- `@base-ui/react`: 접근성을 고려한 저수준 UI 프리미티브 컴포넌트 모음입니다.
- `class-variance-authority`: 컴포넌트 variant별 class 조합을 타입 안전하게 관리합니다.
- `clsx`: 조건에 따라 className 문자열을 간결하게 합칩니다.
- `tailwind-merge`: 중복/충돌하는 Tailwind 클래스를 병합 정리합니다.
- `tw-animate-css`: Tailwind와 함께 쓰는 애니메이션 유틸리티 스타일을 제공합니다.
- `motion`: React에서 선언형 애니메이션을 구현합니다.
- `lucide-react`: 아이콘 컴포넌트를 제공합니다.
- `@fontsource-variable/geist`: Geist 가변 폰트를 로컬 패키지로 로드합니다.
- `@google/genai`: Google GenAI API 연동을 위한 SDK입니다.
- `dotenv`: 환경변수(`.env`)를 로드합니다.
- `express`: Node.js 웹 서버 및 API 라우팅을 위한 프레임워크입니다.
- `@tiptap/react`: React에서 TipTap 에디터를 사용할 수 있게 하는 React 바인딩입니다.
- `@tiptap/starter-kit`: 기본 에디터 기능(텍스트 서식, 단락 등)을 포함한 확장 패키지입니다.
- `@tiptap/extension-placeholder`: 에디터 입력 필드에 플레이스홀더 텍스트를 표시합니다.
- `@tiptap/extension-underline`: 텍스트 밑줄 기능을 에디터에 추가합니다.
- `@tiptap/extension-link`: 하이퍼링크 삽입 및 관리 기능을 제공합니다.
- `@tiptap/extension-highlight`: 텍스트에 배경색(하이라이트) 처리 기능을 추가합니다.
- `@tiptap/extension-image`: 에디터에 이미지 삽입 기능을 제공합니다.
- `@tiptap/extension-text-style`: 텍스트 스타일(폰트, 크기 등) 속성을 관리합니다.
- `@tiptap/extension-color`: 텍스트 색상 변경 기능을 제공합니다.
- `@tiptap/extension-font-family`: 폰트 패밀리 변경 기능을 제공합니다.

### DevDependencies

- `typescript`: 정적 타입 검사를 위한 TypeScript 컴파일러입니다.
- `tsx`: TypeScript 파일을 빠르게 실행하는 런타임 도구입니다.
- `@types/node`: Node.js API 타입 정의입니다.
- `@types/express`: Express 타입 정의입니다.
- `autoprefixer`: CSS에 브라우저 벤더 프리픽스를 자동 추가합니다.

### 디자인 

- 스타일/컴포넌트 축은 `Tailwind CSS + shadcn/ui + Base UI` 조합입니다.

## 참고 링크

https://www.worlditshow.co.kr/main/main.php
