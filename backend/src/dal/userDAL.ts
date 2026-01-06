import User from "../models/User";

/**
 * User Data Access Layer (Sequelize)
 */

export const findAll = async (): Promise<any[]> => {
  return User.findAll();
};

export const findById = async (id: number): Promise<any | null> => {
  return User.findByPk(id);
};

export const findByEmail = async (email: string): Promise<any | null> => {
  return User.findOne({ where: { email } });
};

export const findByUsername = async (
  username: string
): Promise<any | null> => {
  return User.findOne({ where: { username } });
};

export const create = async (user: Omit<any, "id" | "reviews">): Promise<any> => {
  return User.create(user as any);
};

export const update = async (
  id: number,
  updates: Partial<Omit<any, "id" | "reviews">>
): Promise<any | null> => {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.update(updates as any);
  return user;
};

export const delete_ = async (id: number): Promise<boolean> => {
  const deleted = await User.destroy({ where: { id } });
  return deleted > 0;
};
