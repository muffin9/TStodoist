const API_END_POINT = 'http://127.0.0.1:3000';
import IAction from '@/interface/IAction';
import ITodo from '@/interface/ITodo';
import { getErrorMessage } from '@/utils/util';

const request = async () => {
  try {
    const response = await fetch(`${API_END_POINT}/datas`);

    if (response.status === 504) {
      window.location.href = '/login';
    }

    if (!response.ok) {
      throw new Error('HTTP Error');
    }

    return await response.json();
  } catch (err: unknown) {
    reportError({ message: getErrorMessage(err) });
  }
};

const postOrPatchTodoRequest = async (uuid: string, data: ITodo) => {
  const method = uuid ? 'PATCH' : 'POST';
  const url = `${API_END_POINT}/todo/${uuid ? uuid : ''}`;

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 504) {
      window.location.href = '/login';
    }

    if (!response.ok) {
      throw new Error('HTTP Error');
    }

    return response.status;
  } catch (err: unknown) {
    reportError({ message: getErrorMessage(err) });
  }
};

const deleteTodoRequest = async (uuid: string) => {
  try {
    const response = await fetch(`${API_END_POINT}/todo/${uuid}`, {
      method: 'DELETE',
    });

    if (response.status === 504) {
      window.location.href = '/login';
    }

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

    if (response.status === 504) {
      window.location.href = '/login';
    }

    if (!response.ok) {
      throw new Error('HTTP Error');
    }

    return response.status;
  } catch (err: unknown) {
    reportError({ message: getErrorMessage(err) });
  }
};

const deleteActionRequest = async (uuid: string) => {
  try {
    const response = await fetch(`${API_END_POINT}/action/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 504) {
      window.location.href = '/login';
    }

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

  postOrPatchTodoFetch(uuid: string, data: ITodo) {
    return postOrPatchTodoRequest(uuid, data);
  },

  deleteTodoFetch(uuid: string) {
    return deleteTodoRequest(uuid);
  },

  postActionFetch(data: IAction) {
    return postActionRequest(data);
  },

  deleteActionFetch(uuid: string) {
    return deleteActionRequest(uuid);
  },
};

export default api;
