import { $ } from '@/utils/dom';

export default class TodoAction {
  handleEventListener = () => {
    $('.action--close')!.addEventListener('click', () => {
      $('.action-wrapper')?.remove();
    });
  };

  render = () => {
    return /* html */ `
        <article class="action-wrapper">
          <button class="action--close">X</button>
          <div class="action">
            <div class="action__inner">
              <div class="action__icon">😀</div>
              <div class="action__contents">
                  <p class="action__writer">Muffin</p>
                  <p class="action__content">
                    HTML/CSS공부하기를 해야할 일에서 하고있는 일로 이동하였습니다.
                  </p>
                  <p class="action__time">1시간 전</p>
              </div>
            </div>
          </div>
        </article>
    `;
  };
}
