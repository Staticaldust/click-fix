import { sequelize } from '../config/database';
import Category from '../models/Category';
import User from '../models/User';
import Employee from '../models/Employee';
import Review from '../models/Review';

async function cleanup() {
  try {
    await sequelize.authenticate();
    console.log('Connected to DB — cleaning seed rows');

    // Known seed identifiers
    const seedCategoryNames = ['חשמלאי', 'מנקה', 'קוסמטיקאית'];
    const seedUserEmails = ['john@example.com', 'jane@example.com'];
    const seedEmployeeEmails = ['david@example.com', 'sarah@example.com'];

    // Delete reviews referencing seed users/employees
    await Review.destroy({ where: { comment: 'Excellent service!' } });

    // Delete seed employees
    await Employee.destroy({ where: { email: seedEmployeeEmails } });

    // Delete seed users
    await User.destroy({ where: { email: seedUserEmails } });

    // Delete seed categories by name
    await Category.destroy({ where: { name: seedCategoryNames } });

    console.log('Seed cleanup completed');
    process.exit(0);
  } catch (err) {
    console.error('Cleanup failed', err);
    process.exit(1);
  }
}

cleanup();
