import * as employeeDAL from "../dal/employeeDAL";

export const getAllEmployees = async (): Promise<any[]> => {
  return employeeDAL.findAll();
};

export const getEmployeeById = async (id: number): Promise<any | null> => {
  return employeeDAL.findById(id);
};

export const getEmployeesByCategory = async (categoryId: number): Promise<any[]> => {
  return employeeDAL.findByCategory(categoryId);
};

export const getEmployeesByArea = async (area: string): Promise<any[]> => {
  return employeeDAL.findByArea(area);
};

export const getEmployeesByRating = async (minRating: number): Promise<any[]> => {
  return employeeDAL.findByMinRating(minRating);
};

export const createEmployee = async (
  employee: any
): Promise<any> => {
  return employeeDAL.create(employee);
};

export const updateEmployee = async (
  id: number,
  updates: Partial<any>
): Promise<any | null> => {
  return employeeDAL.update(id, updates);
};

export const deleteEmployee = async (id: number): Promise<boolean> => {
  return employeeDAL.delete_(id);
};

export const updateAverageRatings = async (employeeId: number): Promise<void> => {
  await employeeDAL.updateRatings(employeeId);
};
