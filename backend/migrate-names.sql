-- Migration: Change name column to first_name and last_name
-- Run this SQL script on your PostgreSQL database

-- Users table
ALTER TABLE users RENAME COLUMN name TO first_name;
ALTER TABLE users ADD COLUMN last_name VARCHAR(255);

-- Update existing data - split name into first and last
-- This is a simple split, you may need to adjust based on your data
UPDATE users
SET last_name = SPLIT_PART(first_name, ' ', 2),
    first_name = SPLIT_PART(first_name, ' ', 1)
WHERE first_name IS NOT NULL AND first_name LIKE '% %';

-- Employees table
ALTER TABLE employees RENAME COLUMN name TO first_name;
ALTER TABLE employees ADD COLUMN last_name VARCHAR(255) NOT NULL DEFAULT '';

-- Update existing data - split name into first and last
UPDATE employees
SET last_name = SPLIT_PART(first_name, ' ', 2),
    first_name = SPLIT_PART(first_name, ' ', 1)
WHERE first_name LIKE '% %';

-- Remove default constraint from employees.last_name if needed
ALTER TABLE employees ALTER COLUMN last_name DROP DEFAULT;
