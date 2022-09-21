import IAction from '@/interface/IAction';

export type ActionPostParams = Omit<IAction, 'uuid'>;
