import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { createProfileUpdateToken } from '@/utils/jwt';
import * as argon2 from 'argon2';

interface IParams {
   params: { id: string };
}

export const PATCH = async (req: Request, { params }: IParams) => {
   const userId = params.id;
   const { oldPassword, newPassword, email, phone, role } = await req.json();

   try {
      const isUserExist = await prisma.user.findFirst({ where: { email } });
      //cek apakah email sudah digunakan user lain
      const isEmailAlreadyUse = isUserExist && isUserExist.id !== userId;

      if (isEmailAlreadyUse) {
         return NextResponse.json(
            { message: 'Email sudah digunakan user lain' },
            { status: 409 }
         );
      }
      //kirim email konfirmasi berisi token email
      const emailToken = createProfileUpdateToken(email, userId);
      //kirim email konfirmasi ke akun email aktif

      //jika user mengupdate emailnya
      //dan email belum digunakan orang lain
      //buat pesan cek email
      const message =
         email !== isUserExist?.email && !isEmailAlreadyUse
            ? {
                 message: 'silahkan cek inbox akun email Anda',
              }
            : { message: 'akun berhasil di update' };

      //cek apakah oldpassword cocok dengna password di database
      const isPasswordMatch =
         oldPassword !== ''
            ? await argon2.verify(isUserExist?.password || '', oldPassword)
            : false;
      //cek apakah user mengupdate passwordnya
      const isPasswordUpdated = oldPassword !== newPassword;
      //jika password cocok dan user mengupdate passwordnya
      //update password lama di databse dengan password baru
      const hash = await argon2.hash(newPassword);
      const payload =
         isPasswordMatch && isPasswordUpdated
            ? { password: hash, phone, role }
            : { phone, role };

      await prisma.user.update({
         where: { id: userId },
         data: payload,
      });
      return NextResponse.json(message, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'Gagal mengupdate data' },
         { status: 500 }
      );
   }
};
