// 성공코드 => 200 => 응답
// api 요청시 접근 권한 에러 코드 => 403 => 로그인 페이지로 리다이렉트
// 중복코드 => 409 => globalModal 창 띄우기.

export const API_SUCCESS_CODE: number = 200;
export const API_FAIL_CODE: number = 404;
export const API_AUTH_DENINED: number = 403;
export const API_CONFLICT_DATA: number = 409;
