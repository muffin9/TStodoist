export const calculateDate = (date: any) => {
  const diffDate = new Date().getTime() - new Date(date).getTime();

  const year = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 30 * 12));
  const month = Math.floor(diffDate / (1000 * 60 * 60 * 24 * 30));
  const day = Math.floor(diffDate / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diffDate / (1000 * 60 * 60));
  const minutes = Math.floor(diffDate / (1000 * 60));
  const seconds = Math.floor(diffDate / 1000);

  // 년 달 일 시간 분 초
  const parsingDateMap = new Map();
  parsingDateMap.set('년', year);
  parsingDateMap.set('달', month);
  parsingDateMap.set('일', day);
  parsingDateMap.set('시간', hours);
  parsingDateMap.set('분', minutes);
  parsingDateMap.set('초', seconds);

  for (const [key, value] of parsingDateMap) {
    if (value) return `${value}${key}`;
  }
  return '방금';
};
