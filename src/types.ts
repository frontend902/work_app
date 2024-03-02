export interface ITask {
  createdAt: Date;
  endedAt: Date;
  hotel: string;
  id: string;
  location: string;
  mail: string;
  option: string;
  person: string;
  state: '미처리' | '처리중' | '처리 완료' | '질의중';
  textarea: 'string';
}
