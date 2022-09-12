export default interface ITodo {
  id: any;
  uuid: string;
  columnId: number;
  title: string;
  content: string;
  status: string;
  userId?: number;
  date: Date;
}
