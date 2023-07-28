'use client';
/* eslint-disable @next/next/no-img-element */
import { ICarApiResponse } from '@/types';
import {
   convertISOdateToStandar,
   convertSimpleDateToISO,
   createSlug,
   generateCarModelYear,
} from '@/utils';
import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import CloudinaryMediaLiblaryWidget from './CloudinaryMediaLiblaryWidget';

import Toast from './Toast';

interface IAddOrEditCarProps {
   carData?: ICarApiResponse;
   mode: 'ADD_NEW' | 'UPDATE';
}

const AddOrEditCar = ({ carData, mode }: IAddOrEditCarProps) => {
   const [detailModifikasi, setDetailModifikasi] = useState<string | undefined>(
      carData?.detailModifikasi || ''
   );
   const [merek, setMerek] = useState(carData?.merek || '');
   const [model, setModel] = useState(carData?.model_ || '');
   const [tahun, setTahun] = useState<number>(carData?.tahun || 2000);
   const [harga, setHarga] = useState(carData?.harga || 0);
   const [jarakTempuh, setJarakTempuh] = useState(carData?.jarakTempuh || 0);
   const [tipeRegistrasi, setTipeRegistrasi] = useState(
      carData?.tipeRegistrasi || ''
   );
   const [transmisi, setTransmisi] = useState(carData?.transmisi || 'AT');
   const [garansi, setGaransi] = useState(carData?.garansi || false);
   const [bahanBakar, setBahanBakar] = useState(
      carData?.bahanBakar || 'bensin'
   );
   const [tanganKe, setTanganKe] = useState(carData?.tanganKe || 1);
   const [tempatDuduk, setTempatDuduk] = useState(carData?.tempatDuduk || 7);
   const [warna, setWarna] = useState(carData?.warna || '');
   const [tglReg, setTglReg] = useState(
      convertISOdateToStandar(carData?.tglReg || '')
   );
   const [masaBerlakuStnk, setMasaBerlakuStnk] = useState(
      convertISOdateToStandar(carData?.masaBerlakuStnk || '')
   );
   const [statusOdo, setStatusOdo] = useState(carData?.statusOdo || 'Asli');
   const [images, setImages] = useState<string[]>(carData?.images || []);
   const [slug, setSlug] = useState<string>(carData?.slug || '');
   const [sumbited, setSumbited] = useState(false);
   const [warning, setWarning] = useState(false);
   const [isLoading, setIsloading] = useState(false);
   const generateYear = generateCarModelYear();

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
      setDetailModifikasi('');
   };

   const validateForm = () => {
      if (
         !merek ||
         harga === 0 ||
         jarakTempuh === 0 ||
         !warna ||
         !tglReg ||
         !masaBerlakuStnk ||
         !detailModifikasi ||
         images.length === 0
      ) {
         setWarning(true);
         setTimeout(() => {
            setWarning(false);
         }, 5000);
         return false;
      }
      return true;
   };

   const publishHandler = async (isDraft: boolean) => {
      const slug = createSlug(merek);
      if (validateForm()) {
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
                  detailModifikasi,
               }),
            });

            if (response.ok) {
               setSumbited(true);
               setIsloading(false);
               setTimeout(() => {
                  setSumbited(false);
               }, 5000);
               resetForm();
            }
         } catch (error) {
            setIsloading(false);
            console.error('Error:', error);
         }
      }
   };

   const updateHandler = async (isDraft: boolean) => {
      if (validateForm()) {
         try {
            // Send data to the API endpoint using fetch or Axios
            setIsloading(true);
            const response = await fetch(`/api/cars/${carData?.id}`, {
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
                  detailModifikasi,
               }),
            });

            if (response.ok) {
               setSumbited(true);
               setIsloading(false);
               setTimeout(() => {
                  setSumbited(false);
               }, 5000);
            }
         } catch (error) {
            setIsloading(false);
            console.error('Error:', error);
         }
      }
   };

   console.log(tglReg);

   const handleRemoveImages = (imgUrl: string) => {
      // Filter out the elements that don't match the value to remove
      const updatedArray = images.filter((element) => element !== imgUrl);

      // Update the state with the new array
      setImages(updatedArray);
   };
   return (
      <div className='p-2 lg:p-7 rounded-lg h-full'>
         <Toast
            show={sumbited}
            mode='SUKSES'
            message={
               mode == 'ADD_NEW'
                  ? 'Sukses menambahkan data'
                  : 'Sukses mengupdate data'
            }
         />
         <Toast
            show={warning}
            mode='WARNING'
            message='Silahkan lengkapi data'
         />
         <Toast show={isLoading} mode='LOADING' message='Mohon tunggu' />

         <h1 className='text-xl font-medium mb-7'>
            {mode === 'ADD_NEW' ? 'Tambah mobil' : 'Update mobil'}
         </h1>

         <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 font-medium'>
            <form
               className='flex flex-col gap-3 border rounded-lg p-4 lg:p-7 bg-white'
               action=''
            >
               <p className='text-sm font-light'>Tanda bintang wajib di isi*</p>
               <div className='grid grid-cols-3 items-center mt-2'>
                  <label className='' htmlFor='title'>
                     Merek*
                  </label>
                  <input
                     className={`input input-bordered capitalize col-span-2 ${
                        merek === '' && warning ? 'input-error' : ''
                     }`}
                     type='text'
                     id='merek'
                     name='merek'
                     placeholder='Honda'
                     value={merek}
                     onChange={(e) => setMerek(e.target.value)}
                  />
               </div>

               <div className='grid grid-cols-3 items-center mt-2'>
                  <label className='' htmlFor='title'>
                     Model*
                  </label>
                  <input
                     className={`input input-bordered uppercase col-span-2 ${
                        model === '' && warning ? 'input-error' : ''
                     }`}
                     type='text'
                     id='model'
                     name='model'
                     placeholder='CRV'
                     value={model}
                     onChange={(e) => setModel(e.target.value)}
                  />
               </div>

               <div className='grid grid-cols-3 items-center mt-2'>
                  <label className='' htmlFor='tahun'>
                     Tahun*
                  </label>
                  <select
                     className={`select select-bordered ${
                        model === '' && warning ? 'select-error' : ''
                     }`}
                     id='tahun'
                     name='tahun'
                     value={tahun}
                     onChange={(e) => setTahun(Number(e.target.value))}
                  >
                     {generateYear.map((year) => (
                        <option key={year} value={year}>
                           {year}
                        </option>
                     ))}
                  </select>
               </div>

               <div className='grid grid-cols-3 items-center'>
                  <label className='' htmlFor='harga'>
                     Harga*
                  </label>
                  <input
                     className={`input input-bordered ${
                        harga === 0 && warning ? 'input-error' : ''
                     }`}
                     type='number'
                     id='harga'
                     name='harga'
                     placeholder='220.000.000'
                     value={harga}
                     onChange={(e) => setHarga(Number(e.target.value))}
                  />
               </div>
               <div>
                  <div className='flex flex-col gap-3'>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='jarakTempuh'>
                           Jarak Tempuh*
                        </label>
                        <input
                           className={`input input-bordered ${
                              jarakTempuh === 0 && warning ? 'input-error' : ''
                           }`}
                           type='number'
                           id='jarakTempuh'
                           name='jarakTempuh'
                           placeholder='10.000 km'
                           value={jarakTempuh}
                           onChange={(e) =>
                              setJarakTempuh(Number(e.target.value))
                           }
                        />
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='tipeRegistrasi'>
                           Tipe Registrasi
                        </label>
                        <input
                           className='input input-bordered'
                           type='text'
                           id='tipeRegistrasi'
                           name='tipeRegistrasi'
                           value={tipeRegistrasi}
                           onChange={(e) => setTipeRegistrasi(e.target.value)}
                        />
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='transmisi'>
                           Transmisi
                        </label>
                        <select
                           className='select select-bordered'
                           name='transmisi'
                           id='transmisi'
                           value={transmisi}
                           onChange={(e) => setTransmisi(e.target.value)}
                        >
                           <option value='MT'>MT</option>
                           <option value='AT'>AT</option>
                        </select>
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='garansi'>
                           Garansi
                        </label>
                        <select
                           className='select select-bordered'
                           name='garansi'
                           id='garansi'
                           value={garansi ? 'Ya' : 'Tidak'}
                           onChange={(e) =>
                              setGaransi(e.target.value === 'Ya' ? true : false)
                           }
                        >
                           <option value='Ya'>Ya</option>
                           <option value='Tidak'>Tidak</option>
                        </select>
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='bahanBakar'>
                           Bahan Bakar
                        </label>
                        <select
                           className='select select-bordered'
                           name='bahanBakar'
                           id='bahanBakar'
                           value={bahanBakar}
                           onChange={(e) => setBahanBakar(e.target.value)}
                        >
                           <option value='Bensin'>Bensin</option>
                           <option value='Solar'>Solar</option>
                        </select>
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='tanganKe'>
                           Tangan Ke*
                        </label>
                        <input
                           className='input input-bordered'
                           type='number'
                           id='tanganKe'
                           name='tanganKe'
                           placeholder='1'
                           value={tanganKe}
                           min={1}
                           onChange={(e) => setTanganKe(Number(e.target.value))}
                        />
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='tempatDuduk'>
                           Tempat Duduk
                        </label>
                        <select
                           className='select select-bordered'
                           name='tempatDuduk'
                           id='tempatDuduk'
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
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='warna'>
                           Warna*
                        </label>
                        <input
                           className={`input input-bordered ${
                              warna === '' && warning ? 'input-error' : ''
                           }`}
                           type='text'
                           id='warna'
                           name='warna'
                           placeholder='Hitam'
                           value={warna}
                           onChange={(e) => setWarna(e.target.value)}
                        />
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='tglReg'>
                           Tanggal Registrasi*
                        </label>
                        <input
                           className={`input input-bordered ${
                              tglReg === '' && warning ? 'input-error' : ''
                           }`}
                           type='date'
                           id='tglReg'
                           name='tglReg'
                           value={tglReg}
                           onChange={(e) => setTglReg(e.target.value)}
                        />
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='masaBerlakuStnk'>
                           Masa Berlaku STNK*
                        </label>
                        <input
                           className={`input input-bordered ${
                              masaBerlakuStnk === '' && warning
                                 ? 'input-error'
                                 : ''
                           }`}
                           type='date'
                           id='masaBerlakuStnk'
                           name='masaBerlakuStnk'
                           value={masaBerlakuStnk}
                           onChange={(e) => setMasaBerlakuStnk(e.target.value)}
                        />
                     </div>
                     <div className='grid grid-cols-3  items-center'>
                        <label className='' htmlFor='statusOdo'>
                           Status Odomoter*
                        </label>
                        <select
                           className='select select-bordered'
                           name='statusOdo'
                           id='statusOdo'
                           value={statusOdo}
                           onChange={(e) => setStatusOdo(e.target.value)}
                        >
                           <option value='Asli'>Asli</option>
                           <option value='Modifikasi'>Modifikasi</option>
                        </select>
                     </div>
                  </div>
               </div>
            </form>
            <div className='flex flex-col rounded-lg p-5 bg-white h-min'>
               <div
                  className={`h-[300px] border rounded-lg w-full flex flex-col justify-center items-center gap-4 ${
                     images.length === 0 && warning ? 'ring-2 ring-red-300' : ''
                  }`}
               >
                  <CloudinaryMediaLiblaryWidget
                     images={images}
                     setImages={setImages}
                  >
                     {(handleGalery) => (
                        <button
                           onClick={handleGalery}
                           className='btn btn-neutral'
                        >
                           Add Image
                        </button>
                     )}
                  </CloudinaryMediaLiblaryWidget>
                  <p className='text-sm'>Car galery slider</p>
                  <div className='flex justify-center items-center gap-2'>
                     {images.length === 0 ? null : (
                        <div className='flex gap-3 justify-center items-center p-[20px] overflow-x-hidden'>
                           {images.map((item, index) => (
                              <div className='relative' key={index}>
                                 <img
                                    className='w-[90px] h-[60px] object-cover object-center rounded-[5px] border-gray-200'
                                    src={item}
                                    alt=''
                                 ></img>
                                 {index === 0 && (
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  rounded-[5px] bg-success text-base-100 text-xs p-1'>
                                       Featured
                                    </div>
                                 )}
                                 <div
                                    className='absolute -top-2 -right-2 bg-warning text-base-100 rounded-full p-1 cursor-pointer'
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
                  <label htmlFor='data_modifikasi'>Data Modifikasi*</label>
                  <div
                     data-color-mode='light'
                     className={`font-normal p-3 rounded-md border focus:outline-none ${
                        detailModifikasi === '' && warning
                           ? 'ring-2 ring-red-300'
                           : ''
                     }`}
                  >
                     <MDEditor
                        height={400}
                        preview='edit'
                        value={detailModifikasi}
                        onChange={setDetailModifikasi}
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
                     {mode === 'ADD_NEW' ? 'Publish' : 'Update'}
                  </button>
                  <button
                     disabled={isLoading}
                     type='button'
                     onClick={() =>
                        mode == 'ADD_NEW'
                           ? publishHandler(true)
                           : updateHandler(false)
                     }
                     className='btn'
                  >
                     Draft
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AddOrEditCar;
