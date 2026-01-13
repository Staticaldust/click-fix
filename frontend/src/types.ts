export enum FatherCategory {
    ELECTRONICS = 'חשמל ואלקטרוניקה',
    GENERAL = 'שירותים כלליים',
    COSMETICS = 'קוסמטיקה וטיפוח',
    STRUCTURE_AND_INSTALLATION = 'מבנה ואינסטלציה',
    DESIGN = 'עיצוב ואדריכלות',
}

export enum Area {
    NORTH = 'צפון',
    SOUTH = 'דרום',
    CENTER = 'מרכז',
    JERUSALEM = 'ירושלים',
    JUDEA_AND_SAMARIA = 'יהודה ושומרון',
}

export type Category = {
    id: number;
    name: string;
    description: string;
    image: string;
    fatherCategory: FatherCategory;
};

export type User = {
    id: number;
    username: string;
    email: string;
    image: string | null;
    address: string;
    reviews: Review[];
};

export type Employee = {
    id: number;
    name: string;
    image: string;
    area: Area;
    category: Category[];
    gender: 'M' | 'F';
    avgRate: number;
    avgPriceRate: number;
    avgPerformanceRate: number;
    avgServiceRate: number;
    reviews: Review[];
    email: string;
    phone: string;
};

export type Review = {
    id: number;
    reviewer: User;
    employee: Employee;
    priceRate: number;
    performanceRate: number;
    serviceRate: number;
    comment: string;
    date: string;
};