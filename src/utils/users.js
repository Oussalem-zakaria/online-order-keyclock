// import api from "./api/api";

// export const createUser = async (userData, role) => {
//   console.info("ROLE: ", role);
//   try {
//     const response = await api.post(`/users?role=${role}`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Create user error", error);
//     throw error;
//   }
// };

// export const getUserById = async (userId) => {
//   try {
//     const response = await api.get(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Get user error", error);
//     throw error;
//   }
// };

// export const getUserByEmail = async (email) => {
//   try {
//     console.log("EMAIL: ", email)
//     const response = await api.get(`/users/email/${email}`);
//     return response.data;
//   } catch (error) {
//     console.error("Get user by email error", error);
//     throw error;
//   }
// };

// export const getAllUsers = async () => {
//   try {
//     const response = await api.get("/users");
//     return response.data;
//   } catch (error) {
//     console.error("Get all users error", error);
//     throw error;
//   }
// };

// export const updateUser = async (userId, userData) => {
//   try {
//     const response = await api.put(`/users/${userId}`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Update user error", error);
//     throw error;
//   }
// };

// export const deleteUser = async (userId) => {
//   try {
//     const response = await api.delete(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Delete user error", error);
//     throw error;
//   }
// };
