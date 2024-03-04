export interface ITask {
  createdAt: Date;
  endedAt: Date | string;
  startedAt: Date | string;
  hotel: string;
  id: string;
  location: string;
  mail: string;
  option: string;
  person: string;
  state: string;
  textarea: 'string';
}
