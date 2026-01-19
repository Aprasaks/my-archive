// data/examList.ts

export type ExamRound = {
  year: number;
  rounds: number[];
};

export type ExamCategory = {
  id: string; // 고유 ID (url이나 선택용)
  title: string; // 화면에 보일 이름
  description: string; // 간단 설명
  exams: ExamRound[]; // 해당 자격증의 기출 목록
};

export const examDatabase: ExamCategory[] = [
  {
    id: 'safety',
    title: '산업안전기사',
    description: '산업현장의 안전관리를 위한 필수 자격증',
    exams: [
      { year: 2022, rounds: [1, 2] },
      { year: 2021, rounds: [1, 2, 3] },
      { year: 2020, rounds: [1, 2, 3] },
      { year: 2019, rounds: [1, 2, 3] },
      { year: 2018, rounds: [1, 2, 3] },
      { year: 2017, rounds: [1, 2, 3] },
      { year: 2016, rounds: [1, 2, 3] },
    ],
  },
  {
    id: 'info-process',
    title: '정보처리기사',
    description: '소프트웨어 개발의 국가기술자격 표준',
    exams: [
      { year: 2023, rounds: [1, 2, 3] }, // 예시 데이터
      { year: 2022, rounds: [1, 2, 3] },
    ],
  },
  // 나중에 여기에 다른 자격증 계속 추가하면 됨
];
