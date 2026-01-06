// This file sets up all Sequelize model associations and registers models.
// Each model file defines its model; associations are defined here to avoid circular dependencies.
import Category from './Category';
import User from './User';
import Employee from './Employee';
import Review from './Review';
import EmployeeCategory from './EmployeeCategory';

// Employee <-> Category (Many-to-Many)
Employee.belongsToMany(Category, {
  through: EmployeeCategory,
  foreignKey: 'employee_id',
  otherKey: 'category_id',
  as: 'categories',
});

Category.belongsToMany(Employee, {
  through: EmployeeCategory,
  foreignKey: 'category_id',
  otherKey: 'employee_id',
  as: 'employees',
});

// Review -> User (Many-to-One)
Review.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

User.hasMany(Review, {
  foreignKey: 'user_id',
  as: 'reviews',
});

// Review -> Employee (Many-to-One)
Review.belongsTo(Employee, {
  foreignKey: 'employee_id',
  as: 'employee',
});

Employee.hasMany(Review, {
  foreignKey: 'employee_id',
  as: 'reviews',
});

// Review -> Category (Many-to-One)
Review.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category',
});

Category.hasMany(Review, {
  foreignKey: 'category_id',
  as: 'reviews',
});

export {};
