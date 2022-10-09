export const getToday = () => {
  const offset = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - offset)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
};

export const calculateDate = (date: any) => {
  const diffDate = new Date().getTime() - new Date(date).getTime();

  // 년 달 일 시간 분 초
  const parsingDateMap = new Map();
  parsingDateMap.set('년', ~~(diffDate / (1000 * 60 * 60 * 24 * 30 * 12)));
  parsingDateMap.set('달', ~~(diffDate / (1000 * 60 * 60 * 24 * 30)));
  parsingDateMap.set('일', ~~(diffDate / (1000 * 60 * 60 * 24)));
  parsingDateMap.set('시간', ~~(diffDate / (1000 * 60 * 60)));
  parsingDateMap.set('분', ~~(diffDate / (1000 * 60)));
  parsingDateMap.set('초', ~~(diffDate / 1000));

  for (const [key, value] of parsingDateMap) {
    if (value) return `${value}${key}`;
  }
  return '방금';
};
