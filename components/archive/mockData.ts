export const categoryTree = [
  {
    name: '개발 (Development)',
    id: 'dev',
    subCategories: [
      { name: 'JavaScript', id: 'js' },
      { name: 'React', id: 'react' },
      { name: 'HTML/CSS', id: 'html' },
      { name: 'Next.js', id: 'nextjs' },
    ],
  },
  {
    name: '자격증 (Certifications)',
    id: 'cert',
    subCategories: [
      { name: '컴활 1급/2급', id: 'computer' },
      { name: '산업안전기사', id: 'safety_eng' },
      { name: '산업보건지도사', id: 'safety_doc' },
    ],
  },
  {
    name: '프로젝트 (Projects)',
    id: 'project',
    subCategories: [{ name: 'MCP 구축기', id: 'mcp' }],
  },
];

export const allPosts = [
  {
    id: 1,
    title: '리액트 useEffect 완벽 가이드',
    categoryId: 'react',
    date: '2024-01-05',
    tags: ['React', 'Hooks'],
  },
  {
    id: 2,
    title: '자바스크립트 비동기 처리 (Promise)',
    categoryId: 'js',
    date: '2024-01-03',
    tags: ['JS', 'Async'],
  },
  {
    id: 3,
    title: '산업안전보건법 핵심 요약 1장',
    categoryId: 'safety_eng',
    date: '2023-12-28',
    tags: ['산안기', '법령'],
  },
  {
    id: 4,
    title: '컴활 1급 실기 엑셀 함수 모음',
    categoryId: 'computer',
    date: '2023-12-20',
    tags: ['Excel', '컴활'],
  },
  {
    id: 5,
    title: 'Next.js 14 라우팅 시스템',
    categoryId: 'nextjs',
    date: '2023-12-15',
    tags: ['Next.js'],
  },
  {
    id: 6,
    title: '시멘틱 태그란 무엇인가?',
    categoryId: 'html',
    date: '2023-11-30',
    tags: ['HTML'],
  },
  {
    id: 7,
    title: 'zustand 상태관리 패턴',
    categoryId: 'react',
    date: '2023-11-10',
    tags: ['React', 'State'],
  },
  {
    id: 8,
    title: '타입스크립트 제네릭 활용',
    categoryId: 'js',
    date: '2023-10-25',
    tags: ['TS', 'Dev'],
  },
];
