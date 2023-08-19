export interface ICarData {
   id: string;
   published: boolean;
   slug: string;
   merek: string;
   model_: string;
   tahun: number;
   harga: number;
   jarakTempuh: number;
   tipeRegistrasi: string;
   transmisi: string;
   garansi: boolean;
   bahanBakar: string;
   tanganKe: number;
   tempatDuduk: number;
   warna: string;
   tglReg: string;
   masaBerlakuStnk: string;
   statusOdo: string;
   images: string[];
   deskripsi: string;
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
