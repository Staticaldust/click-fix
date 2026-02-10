const { sequelize } = require('./dist/config/database');

async function migrateNames() {
  console.log('Starting migration: name -> firstName + lastName...');

  try {
    // Users table
    console.log('1. Renaming users.name to first_name...');
    await sequelize.query('ALTER TABLE users RENAME COLUMN name TO first_name');

    console.log('2. Adding users.last_name column...');
    await sequelize.query('ALTER TABLE users ADD COLUMN last_name VARCHAR(255)');

    console.log('3. Splitting existing user names...');
    await sequelize.query(`
      UPDATE users
      SET last_name = SPLIT_PART(first_name, ' ', 2),
          first_name = SPLIT_PART(first_name, ' ', 1)
      WHERE first_name IS NOT NULL AND first_name LIKE '% %'
    `);

    // Employees table
    console.log('4. Renaming employees.name to first_name...');
    await sequelize.query('ALTER TABLE employees RENAME COLUMN name TO first_name');

    console.log('5. Adding employees.last_name column...');
    await sequelize.query("ALTER TABLE employees ADD COLUMN last_name VARCHAR(255) NOT NULL DEFAULT ''");

    console.log('6. Splitting existing employee names...');
    await sequelize.query(`
      UPDATE employees
      SET last_name = SPLIT_PART(first_name, ' ', 2),
          first_name = SPLIT_PART(first_name, ' ', 1)
      WHERE first_name LIKE '% %'
    `);

    console.log('7. Removing default constraint from employees.last_name...');
    await sequelize.query('ALTER TABLE employees ALTER COLUMN last_name DROP DEFAULT');

    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateNames();
