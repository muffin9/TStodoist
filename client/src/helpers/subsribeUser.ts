import userStore, { GET_USER, SET_USER } from '@/store/userStore';

export const subscribeUser = () => {
  userStore.subscribe(SET_USER, () => {});
  userStore.subscribe(GET_USER, () => {});
};
