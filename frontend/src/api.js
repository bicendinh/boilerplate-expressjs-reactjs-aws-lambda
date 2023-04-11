import axios from "axios";

export const getAllTodos = async () => {
  const result = await axios.get(`/api/todos`);
  return result.data;
};

export const createTodo = async (data) => {
  const result = await axios.post(`/api/todos`, data);
  return result.data;
};

export const deleteTodo = async (itemId) => {
  await axios.delete(`/api/todos/${itemId}`);
};

export const updateTodo = async (itemId, data) => {
  await axios.put(`/api/todos/${itemId}`, data);
};
