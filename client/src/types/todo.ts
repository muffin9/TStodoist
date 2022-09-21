import IForm from '@/interface/IForm';
import ITodo from '@/interface/ITodo';

export type TodoPostParams = Omit<ITodo, 'id' | 'uuid'> | 'type';
export type TodoAddFormType = Pick<IForm, 'status' | 'type'>;
export type TodoFormType = IForm;
