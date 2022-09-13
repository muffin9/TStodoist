const API_END_POINT = 'http://127.0.0.1:3000';
import ITodo from '@/interface/ITodo';

const request = async () => {
  try {
    const response = await fetch(`${API_END_POINT}`);

    if (!response.ok) {
      throw new Error('HTTP Error');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postOrPatchRequest = async (id: number, data: ITodo) => {
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const deleteRequest = async (id: number) => {
  try {
    const response = await fetch(`${API_END_POINT}/todo/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('HTTP Error');
    }

    return response.status;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const api = {
  fetch() {
    return request();
  },

  postOrPatchFetch(id: number, data: ITodo) {
    return postOrPatchRequest(id, data);
  },

  deleteFetch(id: number) {
    return deleteRequest(id);
  },
};

export default api;
