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
import { useGeneralSetting, useUser } from '@/hooks/useStore';
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
   const [carBrandName, setCarBrandName] = useState('');
   const [carModel, setCarModel] = useState('');
   const [year, setYear] = useState<number>(2000);
   const [price, setPrice] = useState(0);
   const [mileage, setMileage] = useState(0);
   const [registrationType, setRegistrationType] = useState('');
   const [transmision, setTransmision] = useState('AT');
   const [warranty, setWarranty] = useState(false);
   const [fuel, setFuel] = useState('bensin');
   const [previousOwners, setPreviousOwners] = useState(1);
   const [maximumPassengers, setMaximumPassengers] = useState(7);
   const [color, setColor] = useState('');
   const [registrationDate, setRegistrationDate] = useState(
      convertISOdateToStandar('')
   );
   const [STNKExpiration, setSTNKExpiration] = useState(
      convertISOdateToStandar('')
   );
   const [odoStatus, setOdoStatus] = useState('Asli');
   const [images, setImages] = useState<string[]>([]);
   const [description, setDescription] = useState<string | undefined>('');
   const [slug, setSlug] = useState<string>('');
   const [warningMessage, setWarningMessage] = useState<string>('');
   const [isLoading, setIsloading] = useState(false);
   const generateYear = generateCarModelYear();
   const [carModels, setCarModels] = useState<string[]>([]);
   const { data: carBrands } = useSWR('/api/cars/brands', fetcher);
   const router = useRouter();
   const { username } = useUser();

   const { title } = useGeneralSetting();

   useEffect(() => {
      if (mode === 'ADD_NEW') {
         document.title = 'Tambah Mobil - ' + title;
      } else {
         document.title = 'Perbarui Mobil - ' + title;
      }
   }, [title]);

   useEffect(() => {
      const getCarBrandById = async () => {
         const response = await fetch(`/api/cars/${carId}`);

         const data: ICarData = await response.json();

         if (response.ok) {
            setIsDataLoaded(true);
            setCarBrandName(data?.carBrandName);
            setCarModel(data?.carModel);
            setYear(data?.year);
            setPrice(data?.price);
            setMileage(data?.mileage);
            setRegistrationType(data?.registrationType);
            setTransmision(data?.transmision);
            setWarranty(data?.warranty);
            setFuel(data?.fuel);
            setPreviousOwners(data?.previousOwners);
            setMaximumPassengers(data?.maximumPassengers);
            setColor(data?.color);
            setRegistrationDate(
               convertISOdateToStandar(data?.registrationDate)
            );
            setSTNKExpiration(convertISOdateToStandar(data?.STNKExpiration));
            setOdoStatus(data?.odoStatus);
            setImages(data?.images);
            setDescription(data?.description);
         } else {
            setIsDataLoaded(false);
            router.push('/cars/manage-cars');
         }
      };
      if (mode === 'UPDATE') getCarBrandById();
   }, []);

   useEffect(() => {
      const getCarModelByCarBrand = async () => {
         const response = await fetch(
            `/api/cars/brands/model?brand=${carBrandName}`
         );
         const data = await response.json();
         setCarModels(data);
      };
      if (carBrandName !== '') getCarModelByCarBrand();
   }, [carBrandName]);

   const resetForm = () => {
      setCarBrandName('');
      setPrice(0);
      setMileage(0);
      setRegistrationType('');
      setPreviousOwners(1);
      setMaximumPassengers(7);
      setColor('');
      setRegistrationDate('');
      setSTNKExpiration('');
      setOdoStatus('Asli');
      setImages([]);
      setDescription('');
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
      if (carBrandName === '') {
         setWarningMessage('Silahkan pilih merek mobil');
         return false;
      } else if (carModel === '') {
         setWarningMessage('Silahkan pilih model mobil');
         return false;
      } else if (price === 0) {
         setWarningMessage('Harga tidak boleh kosong');
         return false;
      } else if (mileage === 0) {
         setWarningMessage('Jarak tempuh tidak boleh kosong');
         return false;
      } else if (color === '') {
         setWarningMessage('Silahkan isi kolom warna');
         return false;
      } else if (registrationDate === '') {
         setWarningMessage('Silahkan isi kolom tanggal registrasi');
         return false;
      } else if (STNKExpiration === '') {
         setWarningMessage('Silahkan isi kolom masa berlaku STNK');
         return false;
      } else if (images.length === 0) {
         setWarningMessage('Gambar galeri tidak boleh kosong');
         return false;
      } else if (description === '') {
         setWarningMessage('Silahkan isi kolom deskripsi');
         return false;
      } else {
         setWarningMessage('');
         return true;
      }
   };

   const publishHandler = async (isDraft: boolean) => {
      const slug = createSlug(carBrandName);
      const isInputValidated = validateInput();
      if (isInputValidated) {
         setIsloading(true);
         const response = await fetch('/api/cars', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               carBrandName,
               carModel,
               username,
               year,
               slug,
               published: isDraft ? false : true,
               price,
               mileage,
               registrationType,
               transmision,
               warranty,
               fuel,
               previousOwners,
               maximumPassengers,
               color,
               registrationDate,
               STNKExpiration,
               odoStatus,
               images,
               description,
            }),
         });

         if (response.ok) {
            Swal.fire('Sukses!', `Mobil berhasil di publish!`, 'success');
            setIsloading(false);
            resetForm();
         } else {
            setIsloading(false);
         }
      }
   };

   const updateHandler = async (isDraft: boolean) => {
      if (validateInput()) {
         setIsloading(true);
         const response = await fetch(`/api/cars/${carId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               carBrandName,
               carModel,
               slug,
               year,
               published: isDraft ? false : true,
               price,
               mileage,
               registrationType,
               transmision,
               warranty,
               fuel,
               previousOwners,
               maximumPassengers,
               color,
               registrationDate,
               STNKExpiration,
               odoStatus,
               images,
               description,
            }),
         });

         if (response.ok) {
            Swal.fire('Sukses!', `Artikel berhasil di perbarui!`, 'success');
            setIsloading(false);
         } else {
            setIsloading(false);
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
                     value={carBrandName}
                     disabled={!isDataLoaded}
                     onChange={(e) => setCarBrandName(e.target.value)}
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
                     value={carModel}
                     disabled={!isDataLoaded}
                     onChange={(e) => setCarModel(e.target.value)}
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
                     value={year}
                     disabled={!isDataLoaded}
                     onChange={(e) => setYear(Number(e.target.value))}
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
                     value={price}
                     disabled={!isDataLoaded}
                     onChange={(e) => setPrice(Number(e.target.value))}
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
                           value={mileage}
                           disabled={!isDataLoaded}
                           onChange={(e) => setMileage(Number(e.target.value))}
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
                           value={registrationType}
                           disabled={!isDataLoaded}
                           onChange={(e) => setRegistrationType(e.target.value)}
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
                           value={transmision}
                           disabled={!isDataLoaded}
                           onChange={(e) => setTransmision(e.target.value)}
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
                           value={warranty ? 'Ya' : 'Tidak'}
                           disabled={!isDataLoaded}
                           onChange={(e) =>
                              setWarranty(
                                 e.target.value === 'Ya' ? true : false
                              )
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
                           value={fuel}
                           disabled={!isDataLoaded}
                           onChange={(e) => setFuel(e.target.value)}
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
                           value={previousOwners}
                           disabled={!isDataLoaded}
                           min={1}
                           onChange={(e) =>
                              setPreviousOwners(Number(e.target.value))
                           }
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
                           value={maximumPassengers}
                           onChange={(e) =>
                              setMaximumPassengers(Number(e.target.value))
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
                           value={color}
                           disabled={!isDataLoaded}
                           onChange={(e) => setColor(e.target.value)}
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
                           value={registrationDate}
                           disabled={!isDataLoaded}
                           onChange={(e) => setRegistrationDate(e.target.value)}
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
                           value={STNKExpiration}
                           disabled={!isDataLoaded}
                           onChange={(e) => setSTNKExpiration(e.target.value)}
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
                           value={odoStatus}
                           disabled={!isDataLoaded}
                           onChange={(e) => setOdoStatus(e.target.value)}
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
                        value={description}
                        onChange={setDescription}
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
