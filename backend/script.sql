CREATE TYPE category AS ENUM (
       'חשמל ואלקטרוניקה',
       'שירותים כלליים',
       'קוסמטיקה וטיפוח',
       'מבנה ואינסטלציה',
        'עיצוב ואדריכלות'
   );
CREATE TYPE area AS ENUM (
            'צפון',
            'מרכז',
            'דרום',
            'ירושלים',
            'יהודה ושומרון'
);
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY,
    name TEXT,
    description TEXT,
    image TEXT,
    father_category category,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    name TEXT,
    address TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    last_entrance TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY,
    name TEXT,
    area area,
    gender TEXT,
    email TEXT UNIQUE,
    password TEXT,
    phone TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_entrance TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS employee_categories (
    employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    UNIQUE (employee_id, category_id)
);
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY,
    user_id INT REFERENCES users(id),
    employee_id INT REFERENCES employees(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id),
    price_rate INT,
    service_rate INT,
    performance_rate INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO categories (id, name, description, image, father_category) VALUES
(1,'חשמלאי','עבודות חשמל לבית', '⚡','חשמל ואלקטרוניקה'),
(2, 'אינסטלטור', 'תיקון והתקנת צנרת', 'plumbing.png', 'מבנה ואינסטלציה'),
(3, 'עיצוב פנים', 'עיצוב דירות וחדרים', 'design.png', 'עיצוב ואדריכלות');
INSERT INTO users (id, name, address, email, password) VALUES
(1, 'יוסי כהן', 'רחוב הרצל 10, תל אביב', 'yossi@example.com', 'hashed_password_1'),
(2, 'דנה לוי', 'רחוב בן גוריון 5, חיפה', 'dana@example.com', 'hashed_password_2'),
(3, 'אבי מזרחי', 'שדרות ירושלים 22, באר שבע', 'avi@example.com', 'hashed_password_3');
INSERT INTO employees (id, name, area, gender, email, password, phone) VALUES
(1, 'משה אהרוני', 'מרכז', 'M', 'moshe@example.com', 'hashed_emp_1', '050-1234567'),
(2, 'רונית אינסטלטורית', 'צפון', 'F', 'ronit@example.com', 'hashed_emp_2', '052-7654321'),
(3, 'אלון עיצוב של המחר', 'ירושלים', 'M', 'alon@example.com', 'hashed_emp_3', '054-1112223');
INSERT INTO employee_categories (employee_id, category_id) VALUES
(1, 1), -- משה → חשמל
(2, 2), -- רונית → אינסטלציה
(3, 3), -- אלון → עיצוב פנים
(1, 2); -- משה גם אינסטלציה
INSERT INTO reviews (
    id,
    user_id,
    employee_id,
    category_id,
    price_rate,
    service_rate,
    performance_rate,
    comment
) VALUES
(1, 1, 1, 1, 5, 5, 4, 'עבודה מקצועית ומהירה, מחיר הוגן'),
(2, 2, 2, 2, 4, 5, 5, 'שירות מצוין, הגיעה בזמן ופתרה את הבעיה'),
(3, 3, 3, 3, 3, 4, 4, 'עיצוב יפה אבל לקח קצת יותר זמן מהמתוכנן');
