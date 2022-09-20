import actionStore, { SET_ACTIONS, DRAW_ACTION } from '@/actionStore';
import { Trash } from '@/assets';
import GlobalModal from '@/components/GlobalModal';
import { todoColumnMap } from '@/constants/todo';
import api from '@/helpers/api';
import IAction from '@/interface/IAction';
import { $$ } from '@/utils/dom';

export default class TodoAction {
  uuid: string;

  title: string;

  content?: string;

  status: string;

  endStatus?: string;

  type: string;

  element: HTMLElement | null;

  constructor(state: IAction) {
    this.uuid = state.uuid;
    this.title = state.title;
    this.content = state.content;
    this.status = state.status;
    this.endStatus = state.endStatus;
    this.type = state.type;
    this.element = null;
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

  handleTrashIconClick = () => {
    if (this.element) {
      const $trashIcon = this.element.querySelector('.action--trash');
      if ($trashIcon) {
        $trashIcon.addEventListener('click', () => {
          const modalContent = '액션을 삭제 하시겠습니까?';
          const globalModal = new GlobalModal(
            modalContent,
            this.handleDeleteAction,
          );
          globalModal.addBody();
          globalModal.registerEventListener();
        });
      }
    }
  };

  handleDeleteAction = async () => {
    const newActions = actionStore.getState().filter((action: IAction) => {
      return action.uuid !== this.uuid;
    });

    actionStore.dispatch({ type: SET_ACTIONS, newActions });
    actionStore.dispatch({
      type: DRAW_ACTION,
    });

    const responseStatus = await api.deleteActionFetch(this.uuid);
    if (responseStatus === 200) {
      this.element?.remove();
    }
  };

  registerEventListener = () => {
    this.element = $$(this.uuid);
    this.handleTrashIconClick();
  };

  render = () => {
    return /* html */ `
        <article class="action__inner" id="${this.uuid}">
            <div class="action__icon">😀</div>
            <div class="action__contents">
                <header class="action__header">
                  <p class="action__writer">Muffin</p>
                  <img src=${Trash} alt="trash icon" class="action--trash" />
                </header>
                <p class="action__content">
                  ${this.setContent()}
                </p>
                <p class="action__time">방금전</p>
            </div>
        </article>
    `;
  };
}
