import GlobalModal from '@/components/GlobalModal';
import { DELETE_ACTION_TEXT } from '@/constants/modal';
import { API_SUCCESS_CODE } from '@/constants/statusCode';
import api from '@/helpers/api';
import IAction from '@/interface/IAction';
import actionStore, { SET_ACTIONS, DRAW_ACTION } from '@/store/actionStore';
import { $$ } from '@/utils/dom';

export default class TodoAction {
  uuid: string;

  title: string;

  content?: string;

  status: string;

  endStatus?: string;

  type: string;

  element: HTMLElement | null;

  subject: string;

  constructor(state: IAction) {
    this.uuid = state.uuid;
    this.title = state.title;
    this.content = state.content;
    this.status = state.status;
    this.endStatus = state.endStatus;
    this.type = state.type;
    this.subject = state.subject;
    this.element = null;
  }

  setContent = () => {
    if (this.subject === 'todo') return this.setTodoContent();
    else if (this.subject === 'column') return this.setColumnContent();
    else {
      return 'not Found subject';
    }
  };

  setTodoContent = () => {
    switch (this.type) {
      case 'add':
        return `📜 ${this.status}에 ${this.title}을 등록하였습니다.`;
      case 'modify':
        return `📜 ${this.status}의 ${this.title}와 ${this.content}로 수정되었습니다.`;
      case 'delete':
        return `🗑 ${this.status}의 ${this.title}이 삭제되었습니다.`;
      case 'drag':
        return '';

      default:
        return 'error';
    }
  };

  setColumnContent = () => {
    switch (this.type) {
      case 'add':
        return `🚧 ${this.status} ${this.title}를 등록하였습니다.`;
      case 'modify':
        return `🚧 ${this.status}컬럼이 ${this.title}로 수정되었습니다.`;
      case 'delete':
        return `🗑 ${this.status}이 삭제되었습니다.`;
      case 'drag':
        return '';

      default:
        return 'error';
    }
  };

  handleTrashIconClick = () => {
    if (this.element) {
      const $trashIcon = this.element.querySelector('.action__header--trash');

      if ($trashIcon) {
        $trashIcon.addEventListener('click', () => {
          const modalContent = DELETE_ACTION_TEXT;
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
    if (responseStatus === API_SUCCESS_CODE) {
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
                  <div class="action__header--trash"></div>
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
