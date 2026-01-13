import { sequelize } from '../config/database';
import '../models/sequelizeModels';
import Category from '../models/Category';
import User from '../models/User';
import Employee from '../models/Employee';
import Review from '../models/Review';

async function check() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to DB');

    const categoryCount = await Category.count();
    const userCount = await User.count();
    const employeeCount = await Employee.count();
    const reviewCount = await Review.count();

    console.log(`categories: ${categoryCount}`);
    console.log(`users: ${userCount}`);
    console.log(`employees: ${employeeCount}`);
    console.log(`reviews: ${reviewCount}`);

    const categories = await Category.findAll({ limit: 3 });
    const users = await User.findAll({ limit: 3 });
    const employees = await Employee.findAll({ limit: 3 });
    const reviews = await Review.findAll({ limit: 3 });

    console.log('--- sample categories ---');
    console.log(categories.map(c => c.toJSON()));
    console.log('--- sample users ---');
    console.log(users.map(u => u.toJSON()));
    console.log('--- sample employees ---');
    console.log(employees.map(e => e.toJSON()));
    console.log('--- sample reviews ---');
    console.log(reviews.map(r => r.toJSON()));

    process.exit(0);
  } catch (err) {
    console.error('❌ DB check failed:', err);
    process.exit(1);
  }
}

check();
