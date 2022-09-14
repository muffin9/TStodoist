export default class LoginComponent {
  render = () => {
    return /* html */ `
        <article class="todo-login flex-row">
            <div class="flex-col todo-login__box">
                <p class="todo-login__title">
                    <strong>투두리스트</strong> 서비스를 이용하기 위해서는 <br />아래 로그인을 진행해주세요!
                </p>
                <form method="GET" action="/auth/google" class="todo-login__form">
                    <input id="google_login_btn" type="submit" value="" />
                </form>
        </div>
        </article>
    `;
  };
}
