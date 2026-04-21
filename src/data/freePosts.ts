export const FREE_POSTS = Array.from({ length: 50 }, (_, index) => {
  const number = 50 - index;
  return {
    id: number,
    title: `WIC 2020 자유게시판 샘플 글 ${number}`,
    author: ['admin', 'itlover', 'visitor01', 'newbie', 'techdaily'][index % 5],
    date: `2026.04.${String((index % 28) + 1).padStart(2, '0')}`,
    views: 50 + index * 7,
    content: `안녕하세요. WIC 2020 자유게시판입니다.\n\n이 게시물은 샘플 데이터입니다. 사용자들이 다양한 주제로 의견을 나누고 정보를 공유하는 공간입니다.\n\n행사 후기, 기술 트렌드, 현장 경험 등을 자유롭게 작성해 주세요.`,
  };
});
