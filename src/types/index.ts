export interface ICarData {
   id: string;
   published: boolean;
   slug: string;
   carBrandName: string;
   carModel: string;
   year: number;
   price: number;
   mileage: number;
   registrationType: string;
   transmision: string;
   warranty: boolean;
   fuel: string;
   previousOwners: number;
   maximumPassengers: number;
   color: string;
   registrationDate: string;
   STNKExpiration: string;
   odoStatus: string;
   images: string[];
   description: string;
   createAt: string;
   updateAt: string;
   username: string;
}

export interface IUserData {
   id: string;
   username: string;
   email: string;
   phone: string;
   role: string;
}

export interface IPostData {
   id: string;
   slug: string;
   published: boolean;
   title: string;
   content: string;
   image: string;
   createAt: string;
   updateAt: string;
   categoryIds: string[];
   categories: ICategoryData[];
   username: string;
}

export interface ICategoryData {
   id: string;
   categoryName: string;
}
