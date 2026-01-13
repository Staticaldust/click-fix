import * as userDAL from "../dal/userDAL";

export const getAllUsers = async (): Promise<any[]> => {
  return userDAL.findAll();
};

export const getUserById = async (id: number): Promise<any | null> => {
  return userDAL.findById(id);
};

export const getUserByEmail = async (email: string): Promise<any | null> => {
  return userDAL.findByEmail(email);
};

export const getUserByUsername = async (username: string): Promise<any | null> => {
  return userDAL.findByUsername(username);
};

export const createUser = async (user: any): Promise<any> => {
  return userDAL.create(user);
};

export const updateUser = async (
  id: number,
  updates: Partial<any>
): Promise<any | null> => {
  return userDAL.update(id, updates);
};

export const deleteUser = async (id: number): Promise<boolean> => {
  return userDAL.delete_(id);
};
