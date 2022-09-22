export const todoColumnMap = new Map();
todoColumnMap.set('todo', '해야할 일');
todoColumnMap.set('doing', '하고있는 일');
todoColumnMap.set('done', '완료한 일');

export const getColumnMap = (key: string) => {
  return todoColumnMap.get(key);
};

export const setColumnMap = (title: string) => {
  todoColumnMap.set(title, title);
};
