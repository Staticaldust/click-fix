# נספח קוד - Code Appendix

## תהליך 1: Quote Request End-to-End Process
### תהליך בקשת הצעת מחיר מקצה לקצה

---

### 4.1 שם ומטרה (Name and Purpose)

**שם התהליך:** Quote Request End-to-End Process

**מטרת התהליך:**
תהליך זה מאפשר ללקוחות (משתמשים רשומים או אורחים) לשלוח בקשות להצעות מחיר לאנשי מקצוע. התהליך כולל איסוף מידע מפורט על הצורך של הלקוח, ולידציה של הנתונים, שמירה במסד הנתונים עם קשרים מורכבים, וניתוב מותאם אישית בהתאם לסוג המשתמש. התהליך מייצג את הליבה העסקית של המערכת ומדגים טיפול באותנטיקציה אופציונלית, טרנספורמציה של נתונים, וטיפול בשני סוגי משתמשים שונים (רשומים ואורחים) באותו flow.

---

### 4.2 צד לקוח (Frontend)

**קבצי קוד Frontend:**
- `/frontend/src/pages/customer/QuoteRequestPage.tsx` - Main component for quote request form
- `/frontend/src/services/quote.service.ts` - API service for quote operations
- `/frontend/src/store/authStore.ts` - Authentication state management
- `/frontend/src/types/quote.types.ts` - TypeScript interfaces for quotes

**קוד Frontend - QuoteRequestPage.tsx (Main Logic):**

```typescript
// QuoteRequestPage.tsx - Main quote request form component
// This component handles both authenticated users and guest users

/**
 * Handle form submission
 * Transforms form data, validates based on authentication status,
 * and sends to backend API
 */
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true);
  try {
    // Transform answers from object to array format expected by backend
    const answersArray = Object.entries(data.answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      }),
    );

    // Build request payload with conditional guest information
    const requestData: any = {
      professionalId: id!,
      answers: answersArray,
      description: data.description,
      urgency: data.urgency,
      responseMethod: data.responseMethod,
    };

    // Add guest info only if user is not authenticated
    // This allows the same flow to work for both registered and guest users
    if (!isAuthenticated) {
      requestData.guestName = data.guestName;
      requestData.guestEmail = data.guestEmail;
    }

    // Call API service to create quote
    await quoteService.create(requestData);

    // Conditional navigation based on user type
    // Guest users go to home page and receive email notification
    // Authenticated users go to their quotes dashboard
    if (!isAuthenticated) {
      navigate('/', { state: { success: true } });
    } else {
      navigate('/quotes', { state: { success: true } });
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'שגיאה בשליחת הבקשה';
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};
```

**קוד Frontend - quote.service.ts (API Service):**

```typescript
// quote.service.ts - API service for quote-related operations

export const quoteService = {
  /**
   * Create a new quote request
   * If user is authenticated, JWT token is automatically included in headers
   * If user is guest, guestName and guestEmail must be in data
   */
  create: async (data: QuoteRequestFormData): Promise<QuoteRequest> => {
    const response = await api.post<{ quote: QuoteRequest }>('/quotes', data);
    return response.data.quote;
  },

  /**
   * Get all quotes for current authenticated user
   */
  getMyQuotes: async (page = 1, limit = 10, status?: string): Promise<QuotesListResponse> => {
    const response = await api.get<QuotesListResponse>('/quotes/my', {
      params: { page, limit, status },
    });
    return response.data;
  },
};
```

---

### 4.3 צד שרת (Server / Backend)

**קבצי Backend:**
- `/backend/src/controllers/quoteController.ts` - HTTP request handlers
- `/backend/src/services/quoteService.ts` - Business logic layer
- `/backend/src/dal/quoteDAL.ts` - Data access layer (database operations)
- `/backend/src/middleware/optionalAuthMiddleware.ts` - Optional authentication middleware
- `/backend/src/models/Quote.ts` - Quote database model
- `/backend/src/routes/quoteRoutes.ts` - API route definitions

**קוד Backend - quoteController.ts:**

```typescript
// quoteController.ts - Controller for quote-related HTTP requests

/**
 * Create a new quote request
 * Handles both authenticated users and guest users
 * Authentication: Optional (uses optionalAuthMiddleware)
 */
export const createQuote = async (req: AuthRequest, res: Response) => {
  try {
    // Extract customer ID from authenticated user, or null for guest
    const customerId = req.user?.id || null;
    const { professionalId, answers, description, urgency, responseMethod, guestName, guestEmail } = req.body;

    // Validation: If not authenticated, guest information is required
    if (!customerId && (!guestName || !guestEmail)) {
      res.status(400).json({ message: 'Guest name and email are required for non-authenticated users' });
      return;
    }

    if (!professionalId || !answers || !urgency || !responseMethod) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Call service layer to create quote with all necessary data
    const quote = await quoteService.createQuote({
      customerId,
      professionalId: Number(professionalId),
      categoryId: req.body.categoryId || 1,
      guestName: guestName || null,
      guestEmail: guestEmail || null,
      answers,
      description,
      urgency,
      responseMethod,
    });

    res.status(201).json({ quote });
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ message: 'Error creating quote', error });
  }
};

/**
 * Get all quotes for the current authenticated customer
 * Returns transformed data with proper name formatting
 */
export const getMyQuotes = async (req: AuthRequest, res: Response) => {
  try {
    const customerId = req.user?.id;
    if (!customerId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string | undefined;

    const { quotes, total } = await quoteService.getQuotesByCustomer(customerId, { page, limit, status });

    // Transform quotes to match frontend expected format
    // Concatenate first and last names from related models
    const transformedQuotes = quotes.map((quote: any) => ({
      id: quote.id.toString(),
      customerId: quote.customerId?.toString() || null,
      customerName: quote.guestName || (quote.customer ? `${quote.customer.firstName} ${quote.customer.lastName}` : 'אורח'),
      professionalId: quote.professionalId.toString(),
      professionalName: quote.professional ? `${quote.professional.firstName} ${quote.professional.lastName}` : 'לא ידוע',
      categoryId: quote.category?.name || 'לא ידוע',
      answers: quote.answers || [],
      description: quote.description,
      urgency: quote.urgency,
      responseMethod: quote.responseMethod,
      status: quote.status,
      createdAt: quote.createdAt,
      respondedAt: quote.respondedAt,
    }));

    const totalPages = Math.ceil(total / limit);
    res.status(200).json({ quotes: transformedQuotes, total, page, totalPages });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Error fetching quotes', error });
  }
};
```

**קוד Backend - optionalAuthMiddleware.ts:**

```typescript
// optionalAuthMiddleware.ts - Middleware for optional JWT authentication
// Allows both authenticated and guest users to access the same endpoint

/**
 * Optional Authentication Middleware
 * Does NOT block requests without authentication
 * If JWT is present and valid, adds user to request
 * If JWT is missing or invalid, continues without user data
 */
export default function optionalAuthMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];

  if (!authHeader) {
    next();
    return;
  }

  const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : null;

  if (!token) {
    next();
    return;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || '';
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;  // Add user data to request for authenticated users
  } catch (err) {
    // If token is invalid, continue as guest (don't fail the request)
    console.log('Invalid token in optional auth, continuing as guest');
  }

  next();  // Continue regardless of auth status
}
```

**קוד Backend - quoteDAL.ts (Data Access Layer):**

```typescript
// quoteDAL.ts - Data Access Layer for Quote operations

/**
 * Find quotes by customer ID with pagination and filtering
 * Includes related data (professional, category, responses) to avoid N+1 queries
 */
export const findByCustomerId = async (
  customerId: number,
  options?: { page?: number; limit?: number; status?: string; }
): Promise<{ quotes: any[]; total: number }> => {
  const { page = 1, limit = 10, status } = options || {};
  const offset = (page - 1) * limit;

  const where: any = { customerId };
  if (status) {
    where.status = status;
  }

  // Execute query with Sequelize ORM
  // Include related models for efficient data fetching
  const { count, rows } = await Quote.findAndCountAll({
    where,
    include: [
      { model: Employee, as: 'professional' },
      { model: Category, as: 'category' },
      { model: QuoteResponse, as: 'response' },
    ],
    limit,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return { quotes: rows, total: count };
};

/**
 * Create a new quote in the database
 * Sequelize handles default status, timestamps, and foreign key validation
 */
export const create = async (quoteData: {
  customerId: number | null;  // Null for guest users
  professionalId: number;
  categoryId: number;
  guestName?: string | null;
  guestEmail?: string | null;
  answers: Array<{ questionId: string; question: string; answer: string | string[] | number; }>;
  description?: string;
  urgency: 'low' | 'medium' | 'high';
  responseMethod: 'system' | 'phone';
}): Promise<any> => {
  return Quote.create(quoteData as any);
};
```

**תיאור זרימת התהליך:**

1. **Client Side:** משתמש ממלא טופס בקשת הצעת מחיר (רשום או אורח)
2. **Validation:** React Hook Form מבצע ולידציה של השדות
3. **API Call:** שליחת בקשה ל-`POST /api/quotes` עם הנתונים
4. **Middleware:** `optionalAuthMiddleware` בודק אם יש JWT - מוסיף user או ממשיך כ-guest
5. **Controller:**
   - מזהה את סוג המשתמש (רשום/אורח)
   - מוודא שכל השדות הנדרשים קיימים
   - קורא ל-service layer
6. **Service Layer:** מבצע business logic ומעביר ל-DAL
7. **DAL:** שומר ב-database עם קשרים ל-professional, category
8. **Response:** מחזיר quote שנוצר ללקוח
9. **Client Redirect:** ניתוב מותאם - רשומים ל-`/quotes`, אורחים ל-home

---

### 4.4 בסיס נתונים (Database)

**טבלאות רלוונטיות:**

**1. `quotes` (Main Table)**
- `id` (INTEGER, PRIMARY KEY) - Unique identifier
- `customer_id` (INTEGER, FOREIGN KEY -> users.id, NULLABLE) - Null for guest users
- `professional_id` (INTEGER, FOREIGN KEY -> employees.id, NOT NULL) - Target professional
- `category_id` (INTEGER, FOREIGN KEY -> categories.id, NOT NULL) - Service category
- `guest_name` (VARCHAR, NULLABLE) - Name for guest users
- `guest_email` (VARCHAR, NULLABLE) - Email for guest users
- `answers` (JSONB) - Structured answers to category questions
- `description` (TEXT) - Additional details from customer
- `urgency` (ENUM: 'low', 'medium', 'high') - Priority level
- `response_method` (ENUM: 'system', 'phone') - Preferred contact method
- `status` (ENUM: 'pending', 'responded', 'accepted', 'rejected', 'expired') - Quote lifecycle
- `responded_at` (TIMESTAMP, NULLABLE) - When professional responded
- `created_at` (TIMESTAMP) - Creation time
- `updated_at` (TIMESTAMP) - Last update time

**2. `users` (Customer Table)**
- `id` (INTEGER, PRIMARY KEY)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `email` (VARCHAR, UNIQUE)
- `role` (VARCHAR) - 'customer'

**3. `employees` (Professional Table)**
- `id` (INTEGER, PRIMARY KEY)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `email` (VARCHAR)
- `phone` (VARCHAR)
- `area` (VARCHAR)

**4. `categories`**
- `id` (INTEGER, PRIMARY KEY)
- `name` (VARCHAR)
- `description` (TEXT)

**קשרים (Relationships):**
- `quotes.customer_id` -> `users.id` (Many-to-One, NULLABLE for guests)
- `quotes.professional_id` -> `employees.id` (Many-to-One, NOT NULL)
- `quotes.category_id` -> `categories.id` (Many-to-One, NOT NULL)

**השפעת התהליך על הנתונים:**
- **CREATE:** יוצר רשומה חדשה ב-`quotes` עם status 'pending'
- **Dual Mode:** תומך גם במשתמשים רשומים (customer_id מלא) וגם באורחים (customer_id NULL + guest fields)
- **JSON Storage:** answers מאוחסנים כ-JSONB לגמישות בשאלות דינמיות
- **Foreign Key Constraints:** מבטיח שה-professional וה-category קיימים במערכת
- **Timestamps:** אוטומטי created_at ו-updated_at לצורך audit trail

---

## תהליך 2: Professional Quote Response Process
### תהליך מענה לבקשת הצעת מחיר על ידי איש מקצוע

---

### 4.1 שם ומטרה (Name and Purpose)

**שם התהליך:** Professional Quote Response Process

**מטרת התהליך:**
תהליך זה מאפשר לאנשי מקצוע לצפות בבקשות הצעות מחיר הממתינות להם ולשלוח הצעות מחיר עם פרטי מחיר, זמינות ותוקף. התהליך כולל טעינה דינמית של נתונים מה-database עם joins מורכבים, המרת נתונים לפורמט frontend, ולוגיקת אימות מורכבת לוודא שרק אנשי המקצוע המתאימים יכולים לגשת ולהגיב לבקשות. התהליך מדגים ניהול state מורכב, real-time updates, וטיפול בזרימת עבודה עם סטטוסים מרובים.

---

### 4.2 צד לקוח (Frontend)

**קבצי קוד Frontend:**
- `/frontend/src/pages/professional/IncomingRequestsPage.tsx` - Main page for viewing and responding to quotes
- `/frontend/src/services/quote.service.ts` - API service
- `/frontend/src/components/common/Modal.tsx` - Response modal component

**קוד Frontend - IncomingRequestsPage.tsx:**

```typescript
// IncomingRequestsPage.tsx - Professional's incoming quote requests dashboard

/**
 * Fetch incoming quote requests on component mount
 * Backend uses JWT to identify the professional
 */
useEffect(() => {
  const fetchRequests = async () => {
    try {
      const data = await quoteService.getIncomingRequests();
      setRequests(data.quotes);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
      toast.error('שגיאה בטעינת הבקשות');
      setRequests(mockRequests);  // Fallback to mock data
    } finally {
      setIsLoading(false);
    }
  };
  fetchRequests();
}, []);

/**
 * Handle response submission
 * Validates required fields, calls API, refreshes list
 */
const submitResponse = async () => {
  if (!selectedRequest) return;

  if (!responseData.price || !responseData.availability || !responseData.validUntil) {
    toast.error('אנא מלא את כל השדות הנדרשים');
    return;
  }

  setIsSubmitting(true);
  try {
    await quoteService.respond(selectedRequest.id, {
      price: Number(responseData.price),
      availability: responseData.availability,
      notes: responseData.notes || undefined,
      validUntil: new Date(responseData.validUntil),
    });

    toast.success('הצעת המחיר נשלחה בהצלחה!');

    // Refresh requests list to show updated status
    const data = await quoteService.getIncomingRequests();
    setRequests(data.quotes);

    // Reset form and close modal
    setShowResponseModal(false);
    setResponseData({ price: '', availability: '', notes: '', validUntil: '' });
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'שגיאה בשליחת ההצעה';
    toast.error(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### 4.3 צד שרת (Server / Backend)

**קבצי Backend:**
- `/backend/src/controllers/quoteController.ts` - Request handlers
- `/backend/src/services/quoteService.ts` - Business logic
- `/backend/src/dal/quoteDAL.ts` - Database operations
- `/backend/src/models/QuoteResponse.ts` - Quote response model

**קוד Backend - quoteController.ts:**

```typescript
// quoteController.ts - Quote response endpoints

/**
 * Get incoming quote requests for professional
 * Authentication: Required (JWT token with professional role)
 */
export const getIncomingRequests = async (req: AuthRequest, res: Response) => {
  try {
    const professionalId = req.user?.id;
    if (!professionalId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string | undefined;

    const { quotes, total } = await quoteService.getQuotesByProfessional(professionalId, { page, limit, status });
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({ quotes, total, page, totalPages });
  } catch (error) {
    console.error('Error fetching incoming requests:', error);
    res.status(500).json({ message: 'Error fetching incoming requests', error });
  }
};

/**
 * Professional responds to a quote request
 * Creates QuoteResponse record and updates Quote status
 * Authorization: Professional must be the target of the quote
 */
export const respondToQuote = async (req: AuthRequest, res: Response) => {
  try {
    const professionalId = req.user?.id;
    if (!professionalId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const { price, availability, notes, validUntil } = req.body;

    if (!price || !availability || !validUntil) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Fetch original quote to verify it exists and belongs to this professional
    const quote = await quoteService.getQuoteById(Number(id));

    if (!quote) {
      res.status(404).json({ message: 'Quote not found' });
      return;
    }

    // Authorization check: prevents professionals from responding to quotes meant for others
    if (quote.professionalId !== professionalId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    // Create quote response and update quote status to 'responded'
    const response = await quoteService.createQuoteResponse({
      quoteId: Number(id),
      professionalId,
      price,
      availability,
      notes,
      validUntil: new Date(validUntil),
    });

    res.status(201).json({ response });
  } catch (error) {
    console.error('Error responding to quote:', error);
    res.status(500).json({ message: 'Error responding to quote', error });
  }
};
```

**קוד Backend - quoteService.ts (Business Logic):**

```typescript
// quoteService.ts - Business logic for quote responses

/**
 * Get quotes by professional ID
 */
export const getQuotesByProfessional = async (
  professionalId: number,
  options?: { page?: number; limit?: number; status?: string; }
): Promise<{ quotes: any[]; total: number }> => {
  return quoteDAL.findByProfessionalId(professionalId, options);
};

/**
 * Create a quote response
 * Creates QuoteResponse record and updates Quote status + timestamp
 */
export const createQuoteResponse = async (responseData: {
  quoteId: number;
  professionalId: number;
  price: number;
  availability: string;
  notes?: string;
  validUntil: Date;
}): Promise<any> => {
  const response = await quoteDAL.createResponse(responseData);

  // Update original quote status to 'responded' and set respondedAt timestamp
  await quoteDAL.update(responseData.quoteId, {
    status: 'responded',
    respondedAt: new Date(),
  });

  return response;
};
```

**תיאור זרימת התהליך:**

1. **Authentication:** Professional מתחבר עם JWT token
2. **Page Load:** `getIncomingRequests` מביא את כל הבקשות הרלוונטיות
3. **Data Join:** Backend מבצע joins עם users, categories לנתונים מלאים
4. **Transform:** נתונים מומרים לפורמט frontend עם שמות מחוברים
5. **Display:** Professional רואה רשימת בקשות ממוינת לפי תאריך
6. **Select Quote:** לחיצה על "שלח הצעת מחיר" פותחת modal
7. **Fill Form:** Professional ממלא מחיר, זמינות, תוקף
8. **Submit:** שליחה ל-`respondToQuote` endpoint
9. **Validate:** Backend בודק authentication, authorization, ונתונים
10. **Create Response:** יצירת QuoteResponse record
11. **Update Status:** עדכון Quote status ל-'responded'
12. **Refresh UI:** ריענון רשימת הבקשות עם הסטטוס המעודכן

---

### 4.4 בסיס נתונים (Database)

**טבלאות רלוונטיות:**

**1. `quotes` (Main Table)** - כבר מוגדר למעלה

**2. `quote_responses` (Response Table)**
- `id` (INTEGER, PRIMARY KEY) - Unique identifier
- `quote_id` (INTEGER, FOREIGN KEY -> quotes.id, UNIQUE) - One response per quote
- `professional_id` (INTEGER, FOREIGN KEY -> employees.id) - Responding professional
- `price` (DECIMAL) - Quoted price in ILS
- `availability` (VARCHAR) - When professional can do the job
- `notes` (TEXT, NULLABLE) - Additional information from professional
- `valid_until` (DATE) - Quote expiration date
- `created_at` (TIMESTAMP) - Response submission time
- `updated_at` (TIMESTAMP) - Last update time

**קשרים (Relationships):**
- `quote_responses.quote_id` -> `quotes.id` (One-to-One, UNIQUE constraint)
- `quote_responses.professional_id` -> `employees.id` (Many-to-One)
- `quotes.professional_id` must match `quote_responses.professional_id` (Business rule)

**השפעת התהליך על הנתונים:**

1. **READ Operations:**
   - Query quotes with `professional_id = current_user_id`
   - JOIN with users (customer info), categories (category name)
   - Filter by status if needed
   - Order by created_at DESC (newest first)

2. **CREATE Operations:**
   - INSERT new record into `quote_responses`
   - Includes validation that quote_id doesn't already have a response (UNIQUE constraint)

3. **UPDATE Operations:**
   - UPDATE `quotes.status` from 'pending' to 'responded'
   - SET `quotes.responded_at` to current timestamp
   - Enables audit trail of when quotes were answered

4. **Transaction Handling:**
   - Response creation and quote update happen in transaction
   - If either fails, both roll back (data integrity)

5. **Authorization:**
   - Database constraint: quote.professional_id must match logged-in user
   - Prevents unauthorized responses to other professionals' quotes

---

## נספח ממשק משתמש (UI Appendix)

### מסך 1: Quote Request Form (QuoteRequestPage)

**מי המשתמש:**
- לקוחות רשומים (Registered Customers)
- משתמשי אורח (Guest Users) - ללא הרשמה

**מטרת המסך:**
מסך זה מאפשר ללקוחות לשלוח בקשות מפורטות להצעות מחיר לאנשי מקצוע ספציפיים. המסך פותר את הבעיה של חוסר יכולת ליצור קשר מובנה עם אנשי מקצוע ומאפשר לקוחות לקבל הצעות מחיר ממוקדות על בסיס פרטים מדויקים של הצורך שלהם.

**פעולות המשתמש במסך:**
1. צפייה במידע על איש המקצוע שנבחר (שם, תמונה, דירוג)
2. משתמשי אורח: מילוי פרטי קשר (שם מלא ואימייל)
3. משתמשים רשומים: פרטי הקשר נמשכים אוטומטית מהמערכת
4. מילוי תשובות לשאלות דינמיות ספציפיות לקטגוריה (סוג עבודה, תיאור, כמות וכו')
5. הוספת תיאור חופשי נוסף על הצורך
6. בחירת רמת דחיפות (רגיל/בינוני/דחוף)
7. בחירת אופן מענה מועדף (במערכת או שיחת טלפון)
8. שליחת הבקשה
9. ניתוב אוטומטי: משתמשים רשומים לדף הצעות המחיר שלהם, אורחים לעמוד הבית עם הודעה

**תכונות ייחודיות:**
- תמיכה דואלית באורחים ומשתמשים רשומים באותו ממשק
- שאלות דינמיות המותאמות לפי קטגוריית השירות
- ולידציה חכמה המותאמת לסוג המשתמש

---

### מסך 2: Incoming Requests Dashboard (IncomingRequestsPage)

**מי המשתמש:**
- אנשי מקצוע רשומים במערכת (Registered Professionals)

**מטרת המסך:**
מסך זה מציג לאנשי מקצוע את כל בקשות הצעות המחיר שנשלחו אליהם ומאפשר להם לנהל ולהגיב לבקשות. המסך פותר את הבעיה של ניהול מרכזי של כל הפניות ממתינות, מאפשר סינון וסידור עדיפויות, ומספק כלי לשליחת הצעות מחיר מקצועיות ומובנות.

**פעולות המשתמש במסך:**
1. צפייה ברשימת כל בקשות הצעות המחיר שנשלחו אליו
2. צפייה במידע על הלקוח (שם, תמונה) ופרטי הבקשה
3. סינון בקשות לפי סטטוס (ממתין/נענה/התקבל/נדחה/פג תוקף)
4. צפייה בסימון חזותי של רמת הדחיפות (רגיל/בינוני/דחוף)
5. צפייה בתצוגה מקדימה של התשובות של הלקוח לשאלות
6. לחיצה על "שלח הצעת מחיר" לבקשות ממתינות
7. מילוי טופס מענה:
   - הזנת מחיר מוצע (בש״ח)
   - הזנת זמינות (מתי יכול לבצע את העבודה)
   - הזנת תוקף ההצעה (תאריך אחרון לתוקף)
   - הוספת הערות נוספות (אופציונלי)
8. שליחת ההצעה
9. צפייה ברשימה מעודכנת עם שינוי סטטוס לבקשה שנענתה

**תכונות ייחודיות:**
- תצוגה מרוכזת של כל הבקשות הפעילות
- סימון חזותי של בקשות חדשות עם badge מונה
- סינון דינמי לפי סטטוס
- Modal מובנה לשליחת הצעות מחיר עם ולידציה
- עדכון אוטומטי של הרשימה לאחר שליחת מענה
- הצגת אינדיקטורים לשיטת מענה מועדפת של הלקוח (מערכת/טלפון)

---

## סיכום

שני התהליכים המתוארים מייצגים את הליבה העסקית של המערכת:

1. **Quote Request Process:** מדגים טיפול באותנטיקציה אופציונלית, ולידציה מורכבת, וטרנספורמציה של נתונים מ-frontend ל-backend. התהליך תומך בשני זרימות שונות (רשומים/אורחים) באותו flow, המהווה דוגמה לעיצוב גמיש וניתן להרחבה.

2. **Professional Response Process:** מדגים ניהול הרשאות מורכב (authorization), קריאות database עם joins מרובים, ולוגיקת עדכון state מורכבת. התהליך מבטיח data integrity דרך transactions ואילוצי database.

שני התהליכים עובדים יחד ליצירת מערכת מלאה של בקשות והצעות מחיר, המאפשרת חיבור יעיל בין לקוחות לאנשי מקצוע.
