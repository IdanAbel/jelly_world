interface Review {
    rating: number;
    comment: string;
    user: string; //TODO: User ID
    createdAt: Date;
    updatedAt: Date;
}

export interface Candy {
    _id: string;
    colorGroup: string;
    backgroundColor: string;
    image: File;
    glutenFree: boolean;
    sugarFree: boolean;
    seasonal: boolean;
    kosher: boolean;
    rating: number;
    reviewsAmount: number;
    reviews: Review[];
    createdBy: string; //TODO: User ID
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
    groupName: string[];
    ingredients: string[];
    flavorName: string;
    description: string;
}
export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface UserInfo {
    _id: string;
    name: string;
    email: string;
    token: string;
}