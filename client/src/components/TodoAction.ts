import { todoColumnMap } from '@/constants/todo';
import IAction from '@/interface/IAction';

export default class TodoAction {
  title: string;

  content: string;

  status: string;

  type: string;

  constructor(state: IAction) {
    this.title = state.title;
    this.content = state.content;
    this.status = state.status;
    this.type = state.type;
  }

  setContent = () => {
    const columnValue = todoColumnMap.get(this.status);
    switch (this.type) {
      case 'add':
        return `${columnValue}에 ${this.title}을 등록하였습니다.`;
      case 'modify':
        return `${columnValue}의 ${this.title}와 ${this.content}로 수정되었습니다.`;
      case 'delete':
        return `${columnValue}의 ${this.title}이 삭제되었습니다.`;
      case 'drag':
        return '';

      default:
        return 'error';
    }
  };

  render = () => {
    return /* html */ `
        <div class="action__inner">
            <div class="action__icon">😀</div>
            <div class="action__contents">
                <p class="action__writer">Muffin</p>
                <p class="action__content">
                  ${this.setContent()}
                </p>
                <p class="action__time">방금전</p>
            </div>
        </div>
    `;
  };
}
