import IAction from '@/interface/IAction';

type PostParamRemoveFields = 'uuid' | 'content' | 'endStatus' | 'date';

export type ActionPostParams = Omit<IAction, PostParamRemoveFields>;
