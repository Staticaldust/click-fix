import Category from "../models/Category";

/**
 * Category Data Access Layer (Sequelize)
 * Handles all database operations for categories
 */

export const findAll = async (): Promise<any[]> => {
  try {
    console.log(66666);
    const categories = await Category.findAll();
    console.log({ categories }, 77777);
    return categories;
  } catch (error) {
    console.error("Error in findAll:", error);
    throw error;
  }
};

export const findById = async (id: number): Promise<any | null> => {
  return Category.findByPk(id);
};

export const findByFatherCategory = async (
  fatherCategory: string
): Promise<any[]> => {
  return Category.findAll({ where: { fatherCategory } });
};

export const create = async (category: Omit<any, "id">): Promise<any> => {
  return Category.create(category as any);
};

export const update = async (
  id: number,
  updates: Partial<Omit<any, "id">>
): Promise<any | null> => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  await category.update(updates as any);
  return category;
};

export const delete_ = async (id: number): Promise<boolean> => {
  const deleted = await Category.destroy({ where: { id } });
  return deleted > 0;
};
