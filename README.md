# My Knowledge Archive

> **"검증된 지식만이 대체 불가능한 전문성을 만든다."**

<!-- > AI 활용 능력과 PM 역량을 겸비한 안전관리자가 되기 위한 개인화된 지식 저장소(Knowledge Archive) 구축 프로젝트입니다. -->

## 1. Project Vision & Goals

### Ultimate Goal

**AI & PM 역량을 갖춘 스마트 안전관리자 (Smart Safety Manager)**
본 프로젝트는 단순한 학습 기록용 웹사이트가 아닙니다. 방대한 산업안전 지식과 IT 기술(Docker, AI)을 융합하여, 현장에서 즉시 활용 가능한 **'오류 없는(Zero-Hallucination) 지식 베이스'**를 구축하는 것을 목표로 합니다.

### Core Value

- **Verification (검증):** 직접 학습하고 이해한 데이터만 시스템에 적재합니다.
- **Structure (구조화):** 비정형 텍스트(교재, 법령)를 정형 데이터(JSON/DB)로 변환하여 관리합니다.
- **Scalability (확장성):** 산업안전기사를 시작으로 개발, 경영 등 타 도메인으로 확장이 가능한 아키텍처를 지향합니다.

---

## 2. Project Management Methodology

본 프로젝트는 1인 개발이지만, 엔터프라이즈급 PM 방법론을 적용하여 품질과 유지보수성을 보장합니다.

### Issue Driven Development (IDD)

- **선(先) 기획, 후(後) 개발:** 모든 작업은 GitHub Issue를 통해 목적(Why)과 할 일(To-Do)이 정의된 후 진행됩니다.
- **추적성 확보:** 커밋 메시지에 이슈 번호를 명시하여, 특정 코드가 왜 작성되었는지에 대한 히스토리를 관리합니다.

### Quality Control (QC)

- **Convention:** ESLint와 Prettier를 통해 코드 스타일을 강제 통일합니다.
- **Automation:** Husky와 Lint-staged를 도입하여, 규약에 맞지 않는 코드는 커밋 단계에서 시스템적으로 차단합니다.

---

## 3. Knowledge Management Strategy

수많은 지식을 단순 나열하는 것이 아니라, 검색과 확장이 용이하도록 다음과 같이 관리합니다.

### Phase 1: Data Structuring (데이터 구조화)

- **Raw Data:** 구민사 교재, 법령, 기출문제 등 비정형 텍스트.
- **Processing:** 학습 단위별(Chapter)로 분해하고 메타데이터(중요도, 출제 빈도, 관련 키워드)를 부여하여 JSON 포맷으로 변환합니다.
- **Storage:** `/data` 디렉토리 내에 도메인별(Safety, Dev, Docker)로 격리하여 저장합니다.

### Phase 2: Docker Containerization (지식의 모듈화)

- **Domain Isolation:** 추후 '산업안전 컨테이너', '개발지식 컨테이너' 등 주제별로 독립된 Docker 컨테이너를 운용합니다.
- **Portable Knowledge:** 개발 환경과 배포 환경의 일치성을 보장하며, 언제 어디서든 내 지식 서버를 띄울 수 있는 환경을 구축합니다.

### Phase 3: AI Integration (지능형 검색)

- **RAG (Retrieval-Augmented Generation):** 검증된 내 데이터베이스만을 참조하는 AI 에이전트를 연동합니다.
- **Objective:** 외부 LLM의 거짓 정보(Hallucination)를 배제하고, 내가 쌓은 신뢰할 수 있는 데이터 내에서 답을 도출합니다.

---

## 4. System Architecture

### Frontend

- **Framework:** Next.js (App Router) - SEO 최적화 및 서버 사이드 렌더링(SSR)
- **Language:** TypeScript - 정적 타입 시스템을 통한 데이터 무결성 확보
- **Styling:** Tailwind CSS - 일관된 디자인 시스템 적용

### Infrastructure (Planned)

- **Container:** Docker
- **CI/CD:** GitHub Actions (예정)

---

## 5. Development Setup

### Prerequisites

- Node.js (LTS Version)
- npm
- Git

<!-- ### Installation & Run
```bash
# Repository Clone
git clone [https://github.com/](https://github.com/)[YOUR_ID]/my-archive.git

# Install Dependencies
npm install

# Run Development Server
npm run dev -->
