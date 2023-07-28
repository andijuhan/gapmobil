export interface ICarApiResponse {
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
   detailModifikasi: string;
   createAt: string;
   updateAt: string;
}
