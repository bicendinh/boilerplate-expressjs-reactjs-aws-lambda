import axios from "axios";

export const getAllTodos= async () => {
  const result = await axios.get(
    `/api/todos`
  );
  return result.data;
};
