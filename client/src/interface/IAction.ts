export default interface IAction {
  uuid: string;
  title: string;
  content?: string;
  status: string;
  endStatus?: string;
  type: string;
  subject: string;
}
