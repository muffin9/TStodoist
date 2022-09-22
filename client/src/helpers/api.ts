const API_END_POINT = 'http://127.0.0.1:3000';
import { ActionPostParams } from '@/types/action';
import { ColumnPostParams } from '@/types/column';
import { TodoPostParams } from '@/types/todo';
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

const postOrPatchTodoRequest = async (uuid: string, data: TodoPostParams) => {
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

    return await response.json();
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

const postActionRequest = async (data: ActionPostParams) => {
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

const postOrPatchColumnRequest = async (
  uuid: string,
  data: ColumnPostParams,
) => {
  const method = uuid ? 'PATCH' : 'POST';
  const url = `${API_END_POINT}/column/${uuid ? uuid : ''}`;

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

    return await response.json();
  } catch (err: unknown) {
    reportError({ message: getErrorMessage(err) });
  }
};

const api = {
  fetch() {
    return request();
  },

  postOrPatchTodoFetch(uuid: string, data: TodoPostParams) {
    return postOrPatchTodoRequest(uuid, data);
  },

  deleteTodoFetch(uuid: string) {
    return deleteTodoRequest(uuid);
  },

  postActionFetch(data: ActionPostParams) {
    return postActionRequest(data);
  },

  deleteActionFetch(uuid: string) {
    return deleteActionRequest(uuid);
  },

  postOrPatchColumnFetch(uuid: string, data: ColumnPostParams) {
    return postOrPatchColumnRequest(uuid, data);
  },
};

export default api;
