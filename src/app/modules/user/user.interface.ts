export type FullName = {
    firstName: string;
    lastName: string;
}

export type FullAddress = {
    street: string;
    city: string;
    country: string;
}

export type Orders = {
    productName: string;
    price: number;
    quantity: number;
}

export type User = {
    userId: number;
    username: string;
    fullname: FullName;
    password: string;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: FullAddress;
    orders: Orders[];
}

export type UserInstanceMethod = {
    isUserExists(id: String) : Promise<User | null>;
}