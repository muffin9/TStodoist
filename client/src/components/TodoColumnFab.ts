import TodoColumn from './TodoColumn';

import GlobalModal from '@/components/GlobalModal';
import api from '@/helpers/api';
import actionStore, { ADD_ACTION } from '@/store/actionStore';
import { $, $$ } from '@/utils/dom';

export default class TodoColumnFab {
  title: string;

  changeTitle: string;

  constructor() {
    this.title = '';
    this.changeTitle = '';
  }

  handleChangeColumnValue = () => {
    $('.fab__input-header')?.addEventListener('keyup', e => {
      const target = e.target as HTMLInputElement;
      this.changeTitle = target.value;
    });
  };

  handleAddColumn = async () => {
    const newColumn = await api.postOrPatchColumnFetch('', {
      title: this.changeTitle,
    });

    const actionData = {
      title: this.changeTitle,
      status: this.title,
      type: 'add',
      subject: 'column',
    };

    const newAction = await api.postActionFetch(actionData);

    // set Action
    actionStore.dispatch({ type: ADD_ACTION, payload: actionData });

    if (newColumn && newAction) {
      const column = new TodoColumn(newColumn);
      $$('root')
        ?.querySelector('.column-wrapper')
        ?.insertAdjacentHTML('beforeend', column.render());
      column.registerEventListener();
    }
  };

  handleFabClick = () => {
    $('.fab')?.addEventListener('click', () => {
      const modalContent = this.contentRender();
      const globalModal = new GlobalModal(modalContent, this.handleAddColumn);
      globalModal.addBody();
      globalModal.registerEventListener();
      this.handleChangeColumnValue();
    });
  };

  registerEventListener = () => {
    this.handleFabClick();
  };

  contentRender = () => {
    return /*html*/ `
        <input class="fab__input-header" placeholder="칼럼을 추가하세요" maxlength ='500' />
    `;
  };

  render = () => {
    return /*html*/ `
        <div class="fab"><button class="fab__add-button">+</button></div>
    `;
  };
}
