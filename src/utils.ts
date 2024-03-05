export const makeTime = (date: Date) => {
  let year: number = date.getFullYear();
  let month: number = date.getMonth();
  let day: number = date.getDate();
  // 시간, 분, 초를 가져옵니다.
  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();
  let seconds: number | string = date.getSeconds();

  // "오전" 또는 "오후"를 판별합니다.
  const meridiem: string = hours >= 12 ? '오후' : '오전';

  // 12시간 형식으로 시간을 변환합니다.
  hours = hours % 12 || 12;

  // 시간, 분, 초를 두 자리로 표시하기 위해 필요한 형식을 적용합니다.
  minutes = (minutes < 10 ? '0' : '') + minutes;
  seconds = (seconds < 10 ? '0' : '') + seconds;

  return `${year}. ${month + 1}. ${day} ${meridiem} ${hours}:${minutes}:${seconds}`;
};
