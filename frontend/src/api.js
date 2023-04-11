import axios from "axios";

export const getAllUsers = async () => {
  const result = await axios.get(
    `/api/users`
  );
  return result.data;
};
