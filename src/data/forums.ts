type ForumStatus = 'OPEN' | 'CLOSED' | 'UPCOMING' | 'IN_PROGRESS' | 'ENDED';

type ForumMedia = {
  type: 'youtube' | 'image';
  url: string;
};

export type Forum = {
  id: string;
  title: string;
  date: string;
  place: string;
  status: ForumStatus;
  desc: string;
  thumbnail: string;
  content: string;
  speaker: string;
  applicantCount: number;
  maxParticipants: number;
  media: ForumMedia[];
};

export const FORUMS: Forum[] = Array.from({ length: 30 }, (_, index) => {
  const forumThemes = ['AI', '스타트업', '클라우드', '보안', '데이터', '네트워킹', 'DX', '로보틱스', '스마트팩토리', '핀테크'];
  const forumPlaces = ['COEX Hall A', 'COEX Hall B', 'COEX Hall C', 'COEX Conference Room'];
  const forumDates = ['2026.04.15', '2026.04.16', '2026.04.17'];
  const forumStatuses: ForumStatus[] = ['OPEN', 'IN_PROGRESS', 'UPCOMING', 'CLOSED', 'ENDED'];
  const speakers = ['김현우', '이서연', '박지민', '최민석', '정유진', '오세훈'];

  const number = index + 1;
  const theme = forumThemes[index % forumThemes.length];
  const maxParticipants = 60 + (index % 5) * 20;
  const applicantCount = Math.min(maxParticipants, 12 + index * 3);

  return {
    id: `F-${String(number).padStart(2, '0')}`,
    title: `${theme} 포럼 ${number}`,
    date: forumDates[index % forumDates.length],
    place: forumPlaces[index % forumPlaces.length],
    status: forumStatuses[index % forumStatuses.length],
    desc: `${theme} 트렌드를 중심으로 실무 사례와 전략을 공유하는 세션입니다.`,
    thumbnail: `https://picsum.photos/seed/forum-${number}/960/540`,
    content: `이 포럼에서는 ${theme} 관련 최신 기술 트렌드와 실제 산업 적용 사례를 나누는 자리입니다.\n\n참가자는 현업 전문가의 발표와 Q&A 세션을 통해 실무 인사이트를 얻을 수 있습니다.`,
    speaker: speakers[index % speakers.length],
    applicantCount,
    maxParticipants,
    media: [
      {
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=1rEzjdrfdxk',
      },
      {
        type: 'image',
        url: `https://picsum.photos/seed/forum-media-${number}-1/1200/700`,
      },
      {
        type: 'image',
        url: `https://picsum.photos/seed/forum-media-${number}-2/1200/700`,
      },
    ],
  };
});
