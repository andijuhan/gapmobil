/* eslint-disable @next/next/no-img-element */
'use client';
import SuccessToast from '@/components/SuccessToast';
import WarningToast from '@/components/WarningToast';
import CloudinaryMediaLiblaryWidget from '@/components/CloudinaryMediaLiblaryWidget';
import MDEditor from '@uiw/react-md-editor';
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import AdminNavbar from '@/components/AdminNavbar';
import LoadingToast from '@/components/LoadingToast';
import { useParams } from 'next/navigation';
import { IApiResponse } from '@/components/ListCars';
import { generateCarModelYear } from '@/utils';

const page = () => {
   const router = useParams();

   const [detailModifikasi, setDetailModifikasi] = useState<string | undefined>(
      ''
   );
   const [merek, setMerek] = useState('');
   const [model, setModel] = useState('');
   const [tahun, setTahun] = useState(2000);
   const [harga, setHarga] = useState(0);
   const [jarakTempuh, setJarakTempuh] = useState(0);
   const [tipeRegistrasi, setTipeRegistrasi] = useState('');
   const [transmisi, setTransmisi] = useState('AT');
   const [garansi, setGaransi] = useState(false);
   const [bahanBakar, setBahanBakar] = useState('bensin');
   const [tanganKe, setTanganKe] = useState(1);
   const [tempatDuduk, setTempatDuduk] = useState(7);
   const [warna, setWarna] = useState('');
   const [tglReg, setTglReg] = useState('');
   const [masaBerlakuStnk, setMasaBerlakuStnk] = useState('');
   const [statusOdo, setStatusOdo] = useState('Asli');
   const [images, setImages] = useState<string[]>([]);
   const [slug, setSlug] = useState<String>('');
   const [sumbited, setSumbited] = useState(false);
   const [warning, setWarning] = useState(false);
   const [isLoading, setIsloading] = useState(false);
   const [initialDataLoad, setInitialDataLoad] = useState(false);
   const generateYear = generateCarModelYear();

   useEffect(() => {
      setInitialDataLoad(true);
      const fetchData = async () => {
         const response = await fetch(`/api/cars/${router.id}`, {
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (response.ok) setInitialDataLoad(false);

         const data: IApiResponse = await response.json();
         setMerek(data.merek);
         setModel(data.model_);
         setTahun(data.tahun);
         setHarga(data.harga);
         setJarakTempuh(data.jarakTempuh);
         setTipeRegistrasi(data.tipeRegistrasi);
         setTransmisi(data.transmisi);
         setGaransi(data.garansi);
         setBahanBakar(data.bahanBakar);
         setTanganKe(data.tanganKe);
         setTempatDuduk(data.tempatDuduk);
         setWarna(data.warna);
         setTglReg(data.tglReg);
         setMasaBerlakuStnk(data.masaBerlakuStnk);
         setStatusOdo(data.statusOdo);
         setImages(data.images);
         setSlug(data.slug);
         setDetailModifikasi(data.detailModifikasi);
      };
      fetchData();
   }, []);

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

   const updateHandler = async (isDraft: boolean) => {
      if (validateForm()) {
         try {
            // Send data to the API endpoint using fetch or Axios
            setIsloading(true);
            const response = await fetch(`/api/cars/${router.id}`, {
               method: 'PATCH',
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
      <div className='p-2 lg:p-7 rounded-lg h-full'>
         <SuccessToast show={sumbited} message='Data berhasil diupdate' />
         <WarningToast show={warning} />
         <LoadingToast show={isLoading} message='Mengaupdate data' />

         <div className='pt-4 lg:pt-0 lg:px-0 px-2'>
            <AdminNavbar title='Add New Car' />
         </div>

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
                     className={`p-3 rounded-md border focus:outline-none text-gray-600 ${
                        merek === '' && warning
                           ? 'ring-2 ring-red-300'
                           : 'focus:ring-4 focus:ring-violet-300'
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
                     className={`p-3 rounded-md border focus:outline-none text-gray-600 ${
                        model === '' && warning
                           ? 'ring-2 ring-red-300'
                           : 'focus:ring-4 focus:ring-violet-300'
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
                     className={`p-3 rounded-md border focus:outline-none text-gray-600 ${
                        model === '' && warning
                           ? 'ring-2 ring-red-300'
                           : 'focus:ring-4 focus:ring-violet-300'
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
                     className={`p-3 rounded-md border focus:outline-none text-gray-600 ${
                        harga === 0 && warning
                           ? 'ring-2 ring-red-300'
                           : 'focus:ring-4 focus:ring-violet-300'
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
                           className={`p-3 rounded-md border focus:outline-none text-gray-600 ${
                              jarakTempuh === 0 && warning
                                 ? 'ring-2 ring-red-300'
                                 : 'focus:ring-4 focus:ring-violet-300'
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
                           className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
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
                           className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
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
                           className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
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
                           className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
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
                           className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
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
                           className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
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
                           className={`p-3 rounded-md border focus:outline-none text-gray-600 ${
                              warna === '' && warning
                                 ? 'ring-2 ring-red-300'
                                 : 'focus:ring-4 focus:ring-violet-300'
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
                           className={`p-3 rounded-md border focus:outline-none text-gray-600 ${
                              tglReg === '' && warning
                                 ? 'ring-2 ring-red-300'
                                 : 'focus:ring-4 focus:ring-violet-300'
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
                           className={`p-3 rounded-md border focus:outline-none text-gray-600 ${
                              masaBerlakuStnk === '' && warning
                                 ? 'ring-2 ring-red-300'
                                 : 'focus:ring-4 focus:ring-violet-300'
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
                           className='p-3 rounded-md border focus:outline-none focus:ring-4 focus:ring-violet-300 text-gray-600'
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
            <div className='flex flex-col rounded-lg p-5 bg-white'>
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
                           className=' bg-gray-800 text-white rounded-lg p-3'
                        >
                           Add Image
                        </button>
                     )}
                  </CloudinaryMediaLiblaryWidget>
                  <p className='text-sm'>Car galery slider</p>
                  <div className='flex justify-center items-center gap-2'>
                     {images.length === 0 ? (
                        <img
                           className='w-[100px]'
                           src='/images/no-image.png'
                           alt=''
                        />
                     ) : (
                        <div className='flex gap-3 justify-center items-center p-[20px] overflow-x-hidden'>
                           {images.map((item, index) => (
                              <div className='relative' key={index}>
                                 <img
                                    className='w-[90px] h-[60px] object-cover object-center rounded-[5px] border-gray-200'
                                    src={item}
                                    alt=''
                                 ></img>
                                 {index === 0 && (
                                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-[5px] text-black  text-xs p-1'>
                                       Featured
                                    </div>
                                 )}
                                 <div
                                    className='absolute -top-2 -right-2 bg-red-400 rounded-full p-1 text-white cursor-pointer'
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
                     disabled={initialDataLoad || isLoading}
                     type='button'
                     onClick={() => updateHandler(false)}
                     className='btn btn-primary'
                  >
                     Update
                  </button>
                  <button
                     disabled={initialDataLoad || isLoading}
                     type='button'
                     onClick={() => updateHandler(true)}
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

export default page;
