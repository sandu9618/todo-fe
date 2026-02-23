import api from "../intercepter/axiosInstance";

export const userService = {
  getUsers: async () => {
    const response = await api.get('/auth/get-users');
    return response.data;
  }
}