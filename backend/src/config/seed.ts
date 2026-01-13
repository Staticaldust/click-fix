import Category from '../models/Category';
import User from '../models/User';
import Employee from '../models/Employee';
import Review from '../models/Review';

export const seedDatabase = async () => {
//   try {
//     // Check if data already exists
//     const categoryCount = await Category.count();
//     if (categoryCount > 0) {
//       console.log('✅ Database already seeded, skipping...');
//       return;
//     }

//     console.log('🌱 Seeding database with sample data...');

//     // Create categories
//     const categories = await Category.bulkCreate([
//       {
//         name: 'חשמלאי',
//         description: 'שירותי חשמל',
//         image: '⚡',
//         fatherCategory: 'חשמל ואלקטרוניקה',
//       },
//       {
//         name: 'מנקה',
//         description: 'ניקיון ופינוק',
//         image: '🧹',
//         fatherCategory: 'שירותים כלליים',
//       },
//       {
//         name: 'קוסמטיקאית',
//         description: 'שירותי קוסמטיקה',
//         image: '💅',
//         fatherCategory: 'קוסמטיקה וטיפוח',
//       },
//     ]);

//     // Create users
//     const users = await User.bulkCreate([
//       {
//         username: 'john_doe',
//         email: 'john@example.com',
//         image: null,
//         address: '123 Main St, Tel Aviv',
//       },
//       {
//         username: 'jane_smith',
//         email: 'jane@example.com',
//         image: null,
//         address: '456 Oak Ave, Jerusalem',
//       },
//     ]);

//     // Create employees
//     const employees = await Employee.bulkCreate([
//       {
//         name: 'דוד כהן',
//         image: '👨‍🔧',
//         area: 'מרכז',
//         categoryId: categories[0].id,
//         gender: 'M',
//         avgRate: 4.5,
//         avgPriceRate: 4.0,
//         avgPerformanceRate: 4.5,
//         avgServiceRate: 4.8,
//         email: 'david@example.com',
//         phone: '0501234567',
//       },
//       {
//         name: 'שרה לוי',
//         image: '👩‍💄',
//         area: 'צפון',
//         categoryId: categories[2].id,
//         gender: 'F',
//         avgRate: 4.8,
//         avgPriceRate: 4.5,
//         avgPerformanceRate: 4.8,
//         avgServiceRate: 5.0,
//         email: 'sarah@example.com',
//         phone: '0507654321',
//       },
//     ]);

//     // Create reviews
//     await Review.bulkCreate([
//       {
//         reviewerId: users[0].id,
//         employeeId: employees[0].id,
//         rate: 5,
//         priceRate: 4,
//         performanceRate: 5,
//         serviceRate: 5,
//         comment: 'Excellent service!',
//       },
//     ]);

//     console.log('✅ Database seeded successfully');
//   } catch (error) {
//     console.error('❌ Error seeding database:', error);
//     throw error;
//   }
};
