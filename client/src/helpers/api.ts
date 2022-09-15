const API_END_POINT = 'http://127.0.0.1:3000';
import IAction from '@/interface/IAction';
import ITodo from '@/interface/ITodo';
import { getErrorMessage } from '@/utils/util';

const request = async () => {
  try {
    const response = await fetch(`${API_END_POINT}/datas`);

    if (!response.ok) {
      throw new Error('HTTP Error');
    }
    return await response.json();
  } catch (err: unknown) {
    reportError({ message: getErrorMessage(err) });
  }
};

const postOrPatchTodoRequest = async (id: number, data: ITodo) => {
  const method = id ? 'PATCH' : 'POST';
  const url = `${API_END_POINT}/todo/${id ? id : ''}`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('HTTP Error');
    }

    return response.status;
  } catch (err: unknown) {
    reportError({ message: getErrorMessage(err) });
  }
};

const deleteTodoRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_END_POINT}/todo/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('HTTP Error');
    }

    return response.status;
  } catch (err: unknown) {
    reportError({ message: getErrorMessage(err) });
  }
};

const postActionRequest = async (data: IAction) => {
  try {
    const response = await fetch(`${API_END_POINT}/action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('HTTP Error');
    }

    return response.status;
  } catch (err: unknown) {
    reportError({ message: getErrorMessage(err) });
  }
};

const api = {
  fetch() {
    return request();
  },

  postOrPatchTodoFetch(id: number, data: ITodo) {
    return postOrPatchTodoRequest(id, data);
  },

  deleteTodoFetch(id: number) {
    return deleteTodoRequest(id);
  },

  postActionFetch(data: IAction) {
    return postActionRequest(data);
  },
};

export default api;
