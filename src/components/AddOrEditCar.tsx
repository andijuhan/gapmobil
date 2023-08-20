'use client';
/* eslint-disable @next/next/no-img-element */
import { ICarData } from '@/types';
import {
   convertISOdateToStandar,
   createSlug,
   generateCarModelYear,
} from '@/utils';
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import CloudinaryMediaLiblaryWidget from './CloudinaryMediaLiblaryWidget';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/utils';
import { useUser } from '@/hooks/useStore';
import Swal from 'sweetalert2';
import { BiImageAdd } from 'react-icons/bi';

interface IAddOrEditCarProps {
   mode: 'ADD_NEW' | 'UPDATE';
   carId?: string;
}

const AddOrEditCar = ({ mode, carId }: IAddOrEditCarProps) => {
   const [isDataLoaded, setIsDataLoaded] = useState<boolean>(
      mode === 'UPDATE' ? false : true
   );
   const [merek, setMerek] = useState('');
   const [model, setModel] = useState('');
   const [tahun, setTahun] = useState<number>(2000);
   const [harga, setHarga] = useState(0);
   const [jarakTempuh, setJarakTempuh] = useState(0);
   const [tipeRegistrasi, setTipeRegistrasi] = useState('');
   const [transmisi, setTransmisi] = useState('AT');
   const [garansi, setGaransi] = useState(false);
   const [bahanBakar, setBahanBakar] = useState('bensin');
   const [tanganKe, setTanganKe] = useState(1);
   const [tempatDuduk, setTempatDuduk] = useState(7);
   const [warna, setWarna] = useState('');
   const [tglReg, setTglReg] = useState(convertISOdateToStandar(''));
   const [masaBerlakuStnk, setMasaBerlakuStnk] = useState(
      convertISOdateToStandar('')
   );
   const [statusOdo, setStatusOdo] = useState('Asli');
   const [images, setImages] = useState<string[]>([]);
   const [deskripsi, setDeskripsi] = useState<string | undefined>('');
   const [slug, setSlug] = useState<string>('');
   const [warningMessage, setWarningMessage] = useState<string>('');
   const [isLoading, setIsloading] = useState(false);
   const generateYear = generateCarModelYear();
   const [carModels, setCarModels] = useState<string[]>([]);
   const { data: carBrands } = useSWR('/api/cars/brands', fetcher);
   const router = useRouter();
   const { username } = useUser();

   useEffect(() => {
      const getCarBrandById = async () => {
         try {
            const response = await fetch(`/api/cars/${carId}`);
            if (response.ok) {
               setIsDataLoaded(true);
            } else {
               router.push('/cars/manage-cars');
            }

            const data: ICarData = await response.json();
            setMerek(data?.merek);
            setModel(data?.model_);
            setTahun(data?.tahun);
            setHarga(data?.harga);
            setJarakTempuh(data?.jarakTempuh);
            setTipeRegistrasi(data?.tipeRegistrasi);
            setTransmisi(data?.transmisi);
            setGaransi(data?.garansi);
            setBahanBakar(data?.bahanBakar);
            setTanganKe(data?.tanganKe);
            setTempatDuduk(data?.tempatDuduk);
            setWarna(data?.warna);
            setTglReg(convertISOdateToStandar(data?.tglReg));
            setMasaBerlakuStnk(convertISOdateToStandar(data?.masaBerlakuStnk));
            setStatusOdo(data?.statusOdo);
            setImages(data?.images);
            setDeskripsi(data?.deskripsi);
         } catch (error) {
            console.log(error);
            setIsDataLoaded(false);
         }
      };
      if (mode === 'UPDATE') getCarBrandById();
   }, []);

   useEffect(() => {
      const getCarModelByCarBrand = async () => {
         try {
            const response = await fetch(
               `/api/cars/brands/model?brand=${merek}`
            );
            const data = await response.json();
            setCarModels(data);
         } catch (error) {
            console.log(error);
         }
      };
      if (merek !== '') getCarModelByCarBrand();
   }, [merek]);

   const resetForm = () => {
      setMerek('');
      setHarga(0);
      setJarakTempuh(0);
      setTipeRegistrasi('');
      setTanganKe(1);
      setTempatDuduk(7);
      setWarna('');
      setTglReg('');
      setMasaBerlakuStnk('');
      setStatusOdo('Asli');
      setImages([]);
      setDeskripsi('');
   };

   useEffect(() => {
      if (warningMessage !== '') {
         Swal.fire({
            icon: 'error',
            title: 'Peringatan!',
            text: warningMessage,
         });
         setWarningMessage('');
      }
   }, [warningMessage, setWarningMessage]);

   const validateInput = () => {
      if (merek === '') {
         setWarningMessage('Silahkan pilih merek mobil');
         return false;
      } else if (model === '') {
         setWarningMessage('Silahkan pilih model mobil');
         return false;
      } else if (harga === 0) {
         setWarningMessage('Harga tidak boleh kosong');
         return false;
      } else if (jarakTempuh === 0) {
         setWarningMessage('Jarak tempuh tidak boleh kosong');
         return false;
      } else if (warna === '') {
         setWarningMessage('Silahkan isi kolom warna');
         return false;
      } else if (tglReg === '') {
         setWarningMessage('Silahkan isi kolom tanggal registrasi');
         return false;
      } else if (masaBerlakuStnk === '') {
         setWarningMessage('Silahkan isi kolom masa berlaku STNK');
         return false;
      } else if (images.length === 0) {
         setWarningMessage('Gambar galeri tidak boleh kosong');
         return false;
      } else if (deskripsi === '') {
         setWarningMessage('Silahkan isi kolom deskripsi');
         return false;
      } else {
         setWarningMessage('');
         return true;
      }
   };

   const publishHandler = async (isDraft: boolean) => {
      const slug = createSlug(merek);
      const isInputValidated = validateInput();
      if (isInputValidated) {
         try {
            // Send data to the API endpoint using fetch or Axios
            setIsloading(true);
            const response = await fetch('/api/cars', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  merek,
                  model,
                  username,
                  tahun,
                  slug,
                  published: isDraft ? false : true,
                  harga,
                  jarakTempuh,
                  tipeRegistrasi,
                  transmisi,
                  garansi,
                  bahanBakar,
                  tanganKe,
                  tempatDuduk,
                  warna,
                  tglReg,
                  masaBerlakuStnk,
                  statusOdo,
                  images,
                  deskripsi,
               }),
            });

            if (response.ok) {
               Swal.fire(
                  'Sukses!',
                  `${merek} ${model} ${tahun} berhasil di publish!`,
                  'success'
               );
               setIsloading(false);
               resetForm();
            }
         } catch (error) {
            setIsloading(false);
            console.error('Error:', error);
         }
      }
   };

   const updateHandler = async (isDraft: boolean) => {
      if (validateInput()) {
         try {
            // Send data to the API endpoint using fetch or Axios
            setIsloading(true);
            const response = await fetch(`/api/cars/${carId}`, {
               method: 'PATCH',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  merek,
                  model,
                  slug,
                  tahun,
                  published: isDraft ? false : true,
                  harga,
                  jarakTempuh,
                  tipeRegistrasi,
                  transmisi,
                  garansi,
                  bahanBakar,
                  tanganKe,
                  tempatDuduk,
                  warna,
                  tglReg,
                  masaBerlakuStnk,
                  statusOdo,
                  images,
                  deskripsi,
               }),
            });

            if (response.ok) {
               Swal.fire('Sukses!', `Artikel berhasil di perbarui!`, 'success');
               setIsloading(false);
            }
         } catch (error) {
            setIsloading(false);
            console.error('Error:', error);
         }
      }
   };

   const handleRemoveImages = (imgUrl: string) => {
      // Filter out the elements that don't match the value to remove
      const updatedArray = images.filter((element) => element !== imgUrl);

      // Update the state with the new array
      setImages(updatedArray);
   };
   return (
      <div className='p-2 lg:p-7 rounded-lg mt-5 text-sm'>
         <h1 className='text-xl font-medium mb-7'>
            {mode === 'ADD_NEW' ? 'Tambah mobil' : 'Perbarui mobil'}
         </h1>

         <div className='flex gap-5 font-medium'>
            <form
               className='w-[40%] flex flex-col gap-3 border rounded-lg p-4 lg:p-7 bg-white'
               action=''
            >
               <p className='text-sm font-light'>Tanda bintang wajib di isi*</p>
               <div className='flex flex-col gap-3 mt-2'>
                  <label className='' htmlFor='title'>
                     Merek*
                  </label>
                  <select
                     className='select select-bordered uppercase w-full max-w-xs'
                     id='merek'
                     name='merek'
                     value={merek}
                     disabled={!isDataLoaded}
                     onChange={(e) => setMerek(e.target.value)}
                  >
                     <option value=''>Pilih merek</option>
                     {(carBrands as any[])?.map((item) => (
                        <option key={item?.id} value={item?.brandName}>
                           {item?.brandName}
                        </option>
                     ))}
                  </select>
               </div>

               <div className='flex flex-col gap-3 mt-2'>
                  <label className='' htmlFor='title'>
                     Model*
                  </label>
                  <select
                     className='select select-bordered uppercase w-full max-w-xs'
                     id='model'
                     name='model'
                     value={model}
                     disabled={!isDataLoaded}
                     onChange={(e) => setModel(e.target.value)}
                  >
                     <option value=''>Pilih model</option>
                     {(carModels as any[])?.map((item) => (
                        <option key={item?.id} value={item?.modelName}>
                           {item?.modelName}
                        </option>
                     ))}
                  </select>
               </div>

               <div className='flex flex-col gap-3 mt-2'>
                  <label className='' htmlFor='tahun'>
                     Tahun*
                  </label>
                  <select
                     className='select select-bordered w-full max-w-xs'
                     id='tahun'
                     name='tahun'
                     value={tahun}
                     disabled={!isDataLoaded}
                     onChange={(e) => setTahun(Number(e.target.value))}
                  >
                     {generateYear.map((year) => (
                        <option key={year} value={year}>
                           {year}
                        </option>
                     ))}
                  </select>
               </div>

               <div className='flex flex-col gap-3'>
                  <label className='' htmlFor='harga'>
                     Harga*
                  </label>
                  <input
                     className='input input-bordered w-full max-w-xs'
                     type='number'
                     id='harga'
                     name='harga'
                     placeholder='220.000.000'
                     value={harga}
                     disabled={!isDataLoaded}
                     onChange={(e) => setHarga(Number(e.target.value))}
                  />
               </div>
               <div>
                  <div className='flex flex-col gap-3'>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='jarakTempuh'>
                           Jarak Tempuh*
                        </label>
                        <input
                           className='input input-bordered w-full max-w-xs'
                           type='number'
                           id='jarakTempuh'
                           name='jarakTempuh'
                           placeholder='10.000 km'
                           value={jarakTempuh}
                           disabled={!isDataLoaded}
                           onChange={(e) =>
                              setJarakTempuh(Number(e.target.value))
                           }
                        />
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='tipeRegistrasi'>
                           Tipe Registrasi
                        </label>
                        <input
                           className='input input-bordered w-full max-w-xs'
                           type='text'
                           id='tipeRegistrasi'
                           name='tipeRegistrasi'
                           value={tipeRegistrasi}
                           disabled={!isDataLoaded}
                           onChange={(e) => setTipeRegistrasi(e.target.value)}
                        />
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='transmisi'>
                           Transmisi
                        </label>
                        <select
                           className='select select-bordered w-full max-w-xs'
                           name='transmisi'
                           id='transmisi'
                           value={transmisi}
                           disabled={!isDataLoaded}
                           onChange={(e) => setTransmisi(e.target.value)}
                        >
                           <option value='MT'>MT</option>
                           <option value='AT'>AT</option>
                        </select>
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='garansi'>
                           Garansi
                        </label>
                        <select
                           className='select select-bordered w-full max-w-xs'
                           name='garansi'
                           id='garansi'
                           value={garansi ? 'Ya' : 'Tidak'}
                           disabled={!isDataLoaded}
                           onChange={(e) =>
                              setGaransi(e.target.value === 'Ya' ? true : false)
                           }
                        >
                           <option value='Ya'>Ya</option>
                           <option value='Tidak'>Tidak</option>
                        </select>
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='bahanBakar'>
                           Bahan Bakar
                        </label>
                        <select
                           className='select select-bordered w-full max-w-xs'
                           name='bahanBakar'
                           id='bahanBakar'
                           value={bahanBakar}
                           disabled={!isDataLoaded}
                           onChange={(e) => setBahanBakar(e.target.value)}
                        >
                           <option value='Bensin'>Bensin</option>
                           <option value='Solar'>Solar</option>
                        </select>
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='tanganKe'>
                           Tangan Ke*
                        </label>
                        <input
                           className='input input-bordered w-full max-w-xs'
                           type='number'
                           id='tanganKe'
                           name='tanganKe'
                           placeholder='1'
                           value={tanganKe}
                           disabled={!isDataLoaded}
                           min={1}
                           onChange={(e) => setTanganKe(Number(e.target.value))}
                        />
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='tempatDuduk'>
                           Tempat Duduk
                        </label>
                        <select
                           className='select select-bordered w-full max-w-xs'
                           name='tempatDuduk'
                           id='tempatDuduk'
                           disabled={!isDataLoaded}
                           value={tempatDuduk}
                           onChange={(e) =>
                              setTempatDuduk(Number(e.target.value))
                           }
                        >
                           <option value='5'>5</option>
                           <option value='7'>7</option>
                           <option value='8'>8</option>
                        </select>
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='warna'>
                           Warna*
                        </label>
                        <input
                           className='input input-bordered w-full max-w-xs'
                           type='text'
                           id='warna'
                           name='warna'
                           placeholder='Hitam'
                           value={warna}
                           disabled={!isDataLoaded}
                           onChange={(e) => setWarna(e.target.value)}
                        />
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='tglReg'>
                           Tanggal Registrasi*
                        </label>
                        <input
                           className='input input-bordered w-full max-w-xs'
                           type='date'
                           id='tglReg'
                           name='tglReg'
                           value={tglReg}
                           disabled={!isDataLoaded}
                           onChange={(e) => setTglReg(e.target.value)}
                        />
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='masaBerlakuStnk'>
                           Masa Berlaku STNK*
                        </label>
                        <input
                           className='input input-bordered w-full max-w-xs'
                           type='date'
                           id='masaBerlakuStnk'
                           name='masaBerlakuStnk'
                           value={masaBerlakuStnk}
                           disabled={!isDataLoaded}
                           onChange={(e) => setMasaBerlakuStnk(e.target.value)}
                        />
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='' htmlFor='statusOdo'>
                           Status Odomoter*
                        </label>
                        <select
                           className='select select-bordered w-full max-w-xs'
                           name='statusOdo'
                           id='statusOdo'
                           value={statusOdo}
                           disabled={!isDataLoaded}
                           onChange={(e) => setStatusOdo(e.target.value)}
                        >
                           <option value='Asli'>Asli</option>
                           <option value='Modifikasi'>Modifikasi</option>
                        </select>
                     </div>
                  </div>
               </div>
            </form>
            <div className='w-[60%] flex flex-col rounded-lg p-5 bg-white h-min'>
               <div className='h-[300px] border rounded-lg w-full flex flex-col justify-center items-center gap-4'>
                  <CloudinaryMediaLiblaryWidget
                     images={images}
                     setImages={setImages}
                  >
                     {(handleGalery) => (
                        <button onClick={handleGalery} className='btn'>
                           <BiImageAdd size={30} />
                        </button>
                     )}
                  </CloudinaryMediaLiblaryWidget>
                  <p className='text-sm'>Tambah gambar</p>
                  <div className='flex justify-center items-center gap-2'>
                     {images.length === 0 ? null : (
                        <div className='flex gap-3 justify-center items-center p-[20px] overflow-x-hidden group'>
                           {images.map((item, index) => (
                              <div className='relative' key={index}>
                                 <img
                                    className='w-[150px] h-[100px] object-cover object-center rounded-sm border-gray-200'
                                    src={item}
                                    alt=''
                                 />
                                 {index === 0 && (
                                    <button className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 btn btn-xs normal-case'>
                                       Featured
                                    </button>
                                 )}
                                 <div
                                    className='hidden group-hover:block absolute -top-1 -right-1 bg-red-500 text-base-100 rounded-sm p-1 cursor-pointer'
                                    onClick={() => handleRemoveImages(item)}
                                 >
                                    <AiOutlineClose />
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </div>
               <div className='flex flex-col mt-5 gap-5'>
                  <label htmlFor='deskripsi'>Deskripsi*</label>
                  <div
                     data-color-mode='light'
                     className='font-normal p-3 rounded-md border focus:outline-none'
                  >
                     <MDEditor
                        height={400}
                        preview='edit'
                        value={deskripsi}
                        onChange={setDeskripsi}
                     />
                  </div>
               </div>

               <div className='flex gap-2 mt-[10px] lg:mt-[30px]'>
                  <button
                     disabled={isLoading}
                     type='button'
                     onClick={() =>
                        mode == 'ADD_NEW'
                           ? publishHandler(false)
                           : updateHandler(false)
                     }
                     className='btn btn-primary'
                  >
                     {mode === 'ADD_NEW' ? 'Publis' : 'Perbarui'}
                  </button>
                  <button
                     disabled={isLoading}
                     type='button'
                     onClick={() =>
                        mode == 'ADD_NEW'
                           ? publishHandler(true)
                           : updateHandler(true)
                     }
                     className='btn'
                  >
                     Draf
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddOrEditCar;
