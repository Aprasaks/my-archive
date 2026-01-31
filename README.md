# 🌌 Dechive (Developers' Archive)

> **"기록되지 않는 성장은 증발한다."** > Notion을 CMS로 활용하여, 지식의 파편을 구조화된 아카이브로 전환하는 Next.js 기반의 지식 저장소 프로젝트입니다.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Notion](https://img.shields.io/badge/Notion_API-CMS-000000?style=for-the-badge&logo=notion)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel)

---

## 1. Project Identity

### 🔭 Vision

**"Zero-Hallucination Knowledge Base"** 단순한 블로그가 아닙니다. **검증된 지식(Notion DB)**만을 소스로 활용하여, 향후 AI 에이전트(RAG)가 신뢰할 수 있는 답변을 도출할 수 있도록 **데이터의 무결성**을 최우선으로 하는 아카이브를 구축합니다.

### 💎 Core Values

- **Verification (검증):** 직접 학습하고 소화한 내용만 Notion에 기록합니다.
- **Synchronization (동기화):** 별도의 배포 과정 없이, Notion에 글을 쓰면 웹사이트에 즉시 반영됩니다.
- **Aesthetics (미학):** 개발자스러운 터미널 감성과 현대적인 Glassmorphism(유리 질감) UI를 융합했습니다.

---

## 2. Key Features

### 🗂️ Dynamic File Tree System

- **Notion as a DB:** 노션의 하위 페이지 구조를 재귀적으로 파싱하여, 웹사이트에서 **폴더 트리(File Tree)** 형태로 시각화합니다.
- **Instant Search:** 복잡한 뎁스(Depth) 속에서도 원하는 문서를 즉시 찾아내는 클라이언트 사이드 검색 기능을 제공합니다.

### 💬 Interactive Request System

- **Discord Webhook Integration:** 사용자가 필요한 지식을 요청하면, Discord Webhook을 통해 관리자의 채널로 알림이 전송됩니다.
- **Interactive UI:** '알약(Pill)' 형태의 모던한 UI와 모달(Modal) 인터랙션을 통해 사용자 경험을 극대화했습니다.

### 🎨 Aura Design Language

- **Glassmorphism:** 배경이 은은하게 비치는 반투명 UI와 격자(Grid) 패턴 배경을 적용했습니다.
- **Glow Effect:** 주요 컨텐츠(트리 박스 등) 주변에 은은한 오오라 효과를 주어 몰입감을 높였습니다.

---

## 3. Tech Stack & Architecture

### Frontend

- **Framework:** Next.js 14 (App Router) - SEO 최적화 및 ISR(Incremental Static Regeneration) 적용
- **Language:** TypeScript - 엄격한 타입 지정을 통한 런타임 에러 방지
- **Styling:** Tailwind CSS - 유틸리티 퍼스트 CSS를 통한 빠른 UI 구축

### Backend & Infrastructure

- **CMS (Content Management System):** Notion API (Notion Database를 백엔드로 활용)
- **Deployment:** Vercel (CI/CD 자동화 및 Edge Network 배포)
- **Communication:** Discord Webhook API

---

## 4. Project Management (IDD)

본 프로젝트는 **Issue Driven Development (이슈 주도 개발)** 방법론을 따릅니다.

1.  **Issue First:** 모든 기능 개발과 버그 수정은 GitHub Issue 생성으로 시작합니다.
2.  **Explicit Commit:** 커밋 메시지에 이슈 번호를 명시하여 개발 히스토리를 추적합니다. (예: `feat: add discord webhook #10`)
3.  **Convention:** ESLint와 Prettier를 통해 코드 품질을 시스템적으로 관리합니다.

---

## 5. Roadmap

- [x] **Phase 1: Foundation** - Next.js 환경 구축 및 Notion API 연동 (완료)
- [x] **Phase 2: Archive UI** - 파일 트리 구조화 및 검색 기능 구현 (완료)
- [x] **Phase 3: Interaction** - Discord 요청 기능 및 Webhook 연동 (완료)
- [ ] **Phase 4: AI Integration** - 내 Notion 데이터를 기반으로 답변하는 AI Chatbot (RAG) 도입 (예정)
- [ ] **Phase 5: Domain Expansion** - 산업안전, 개발, 경영 등 멀티 도메인 지식 확장

---

## 6. Installation

```bash
# 1. Repository Clone
git clone [https://github.com/](https://github.com/)[YOUR_GITHUB_ID]/dechive.git

# 2. Install Dependencies
npm install

# 3. Environment Setup (.env.local)
# NOTION_API_KEY=...
# NOTION_DATABASE_ID=...
# DISCORD_WEBHOOK_URL=...

# 4. Run Development Server
npm run dev
```
