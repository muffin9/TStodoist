import TodoColumn from './TodoColumn';

import GlobalModal from '@/components/GlobalModal';
import { SUBJECT_COLUMN, TYPE_ADD } from '@/constants/actionType';
import api from '@/helpers/api';
import actionStore, { ADD_ACTION } from '@/store/actionStore';
import { $, $$ } from '@/utils/dom';

export default class TodoColumnFab {
  title: string;

  constructor() {
    this.title = '';
  }

  handleChangeColumnValue = () => {
    const $ColumnTitleChangeInput = $('.fab__input-header');
    if ($ColumnTitleChangeInput) {
      $ColumnTitleChangeInput.addEventListener('keyup', e => {
        const target = e.target as HTMLInputElement;
        this.title = target.value;
      });
    }
  };

  handleAddColumn = async () => {
    const newColumn = await api.postOrPatchColumnFetch('', {
      title: this.title,
    });

    const actionData = {
      subject: SUBJECT_COLUMN,
      title: this.title,
      status: this.title,
      type: TYPE_ADD,
    };

    const newAction = await api.postActionFetch(actionData);

    if (newColumn && newAction) {
      actionStore.dispatch({ type: ADD_ACTION, payload: newAction });

      const column = new TodoColumn({ ...newColumn, status: newColumn.title });
      const $columnWrapper = $$('root')?.querySelector('.column-wrapper');

      if ($columnWrapper) {
        $columnWrapper.insertAdjacentHTML('beforeend', column.render());
        column.registerEventListener();
      }
    }
  };

  handleFabClick = () => {
    const $columnAddButton = $('.fab');
    if ($columnAddButton) {
      $columnAddButton.addEventListener('click', () => {
        const modalContent = this.contentRender();
        const globalModal = new GlobalModal(modalContent, this.handleAddColumn);
        globalModal.addBody();
        globalModal.registerEventListener();
        this.handleChangeColumnValue();
      });
    }
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
        <div class="fab-wrapper">
          <div class="fab"><button class="fab__add-button">+</button></div>
        </div>
    `;
  };
}
