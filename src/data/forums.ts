export const FORUMS = Array.from({ length: 30 }, (_, index) => {
  const forumThemes = ['AI', '스타트업', '클라우드', '보안', '데이터', '네트워킹', 'DX', '로보틱스', '스마트팩토리', '핀테크'];
  const forumPlaces = ['COEX Hall A', 'COEX Hall B', 'COEX Hall C', 'COEX Conference Room'];
  const forumDates = ['2026.04.15', '2026.04.16', '2026.04.17'];
  const forumStatuses = ['등록가능', '모집중', '준비', '예정', '마감'];

  const number = index + 1;
  const theme = forumThemes[index % forumThemes.length];

  return {
    id: `F-${String(number).padStart(2, '0')}`,
    title: `${theme} 포럼 ${number}`,
    date: forumDates[index % forumDates.length],
    place: forumPlaces[index % forumPlaces.length],
    status: forumStatuses[index % forumStatuses.length],
    desc: `${theme} 트렌드를 중심으로 한 포럼 등록 샘플 데이터입니다.`,
    thumbnail: `https://picsum.photos/seed/forum-${number}/640/360`,
    content: `이 포럼에서는 ${theme} 관련 최신 기술 트렌드와 실제 산업 적용 사례를 나누는 자리입니다.`,
  };
});
