import { DELETE_ACTION_TEXT } from '@/constants/modal';
import { API_SUCCESS_CODE } from '@/constants/statusCode';
import api from '@/helpers/api';
import { createGlobalModal } from '@/helpers/globalModal';
import IAction from '@/interface/IAction';
import actionStore, { SET_ACTIONS, DRAW_ACTION } from '@/store/actionStore';
import userStore from '@/store/userStore';
import { calculateDate } from '@/utils/date';
import { $$ } from '@/utils/dom';

export default class TodoAction {
  uuid: string;

  subject: string;

  title: string;

  content: string;

  status: string;

  endStatus: string;

  type: string;

  date: string;

  element: HTMLElement | null;

  constructor(state: IAction) {
    this.uuid = state.uuid;
    this.subject = state.subject;
    this.title = state.title;
    this.content = state.content || '';
    this.status = state.status;
    this.endStatus = state.endStatus || '';
    this.type = state.type;
    this.date = state.date;
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
        return `📜 ${this.status}칼럼에 ${this.title}을 등록하였습니다.`;
      case 'modify':
        return `📜 ${this.status}칼럼의 제목: ${this.title}와 내용: ${this.content}로 수정되었습니다.`;
      case 'delete':
        return `🗑 ${this.status}칼럼의 ${this.title}이 삭제되었습니다.`;
      case 'drag':
        return `🖱 Todo ${this.title}를 ${this.status}칼럼에서 ${this.endStatus}칼럼으로 이동 하였습니다.`;

      default:
        return 'error';
    }
  };

  setColumnContent = () => {
    switch (this.type) {
      case 'add':
        return `🚧 컬럼${this.title}를 등록하였습니다.`;
      case 'modify':
        return `🚧 ${this.status}컬럼이 ${this.title}로 수정되었습니다.`;
      case 'delete':
        return `🗑 컬럼${this.title}이 삭제되었습니다.`;

      default:
        return 'error';
    }
  };

  handleTrashIconClick = () => {
    if (this.element) {
      const $trashIcon = this.element.querySelector('.action__header--trash');
      if ($trashIcon) {
        $trashIcon.addEventListener('click', () => {
          createGlobalModal(
            `${this.title} ${DELETE_ACTION_TEXT}`,
            this.handleDeleteAction,
          );
        });
      }
    }
  };

  handleDeleteAction = async () => {
    const newActions = actionStore.getState().filter((action: IAction) => {
      return action.uuid !== this.uuid;
    });

    // 해당 Action을 삭제 하고 다시 액션 셋팅과 동시에 액션 그려주기.
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
            <img class="action__icon" src="${
              userStore.getState() && userStore.getState().avatarurl
            }" />
            <div class="action__contents">
                <header class="action__header">
                  <p class="action__writer">${
                    userStore.getState() && userStore.getState().email
                  }</p>
                  <div class="action__header--trash"></div>
                </header>
                <p class="action__content">
                  ${this.setContent()}
                </p>
                <p class="action__time">${calculateDate(this.date)}전</p>
            </div>
        </article>
    `;
  };
}
