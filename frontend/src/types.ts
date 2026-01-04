export enum FatherCategory {
    ELECTRONICS = 'Electronics',
    GENERAL = 'General',
    COSMETICS = 'Cosmetics',
    STRUCTURE_AND_INSTALLATION = 'Structure and Installation',
    DESIGN_AND_RENOVATION = 'Design and Renovation',
};
export enum Area {
    NORTH = 'North',
    SOUTH = 'South',
    CENTER = 'Center',
    JERUSALEM = 'Jerusalem',
    JUDEA_AND_SAMARIA = 'Judea and Samaria',
};
export type Category = {
    id: number;
    name: string;
    description: string;
    fatherCategory: FatherCategory;
};

export type employee = {
    id: number;
    name: string;
    area: Area;
    category: Category;
    sex:'M' | 'F';
    avgRate: number;
    avgPriceRate: number;
    avgPerformanceRate: number;
    avgServiceRate: number;
    reviews: Review[];
    email: string;
    phone: string;
};
export type User = {
  id: number;
  username: string;
  email: string;
  address: string;
  reviews: Review[];
}
export type Review = {
    id: number;
    reviewer: User;
    employee: employee;
    rate: number;
    priceRate: number;
    performanceRate: number;
    serviceRate: number;
    comment: string;
    date: string;
};