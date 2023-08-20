import { NextResponse } from 'next/server';
import prisma from '@/utils/prisma';
import { createProfileUpdateToken } from '@/utils/jwt';
import * as argon2 from 'argon2';
import emailSender, { IMailConfig, IMailOption } from '@/utils/emailSender';

interface IParams {
   params: { id: string };
}

export const PATCH = async (req: Request, { params }: IParams) => {
   const userId = params.id;
   const { oldPassword, newPassword, email, phone, role } = await req.json();

   try {
      const isUserExist = await prisma.user.findFirst({ where: { email } });
      const currentUser = await prisma.user.findUnique({
         where: { id: userId },
      });
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
      const mailConfig: IMailConfig = {
         service: 'Gmail',
         user: process.env.EMAIL_ADMIN || '',
         pass: process.env.EMAIL_ADMIN_PASS || '',
      };

      const text = `Silahkan klik tautan untuk mengkonfirmasi perubahan email Anda ${process.env.BASE_URL}/confirm?token=${emailToken}`;

      const mailOption: IMailOption = {
         from: process.env.EMAIL_ADMIN || '',
         to: currentUser?.email || '',
         subject: 'Konfirmasi perubahan email',
         text,
      };

      const isSend = await emailSender(mailConfig, mailOption);

      //jika user mengupdate emailnya
      //dan email belum digunakan orang lain
      //dan jika email terkirim
      //buat costum message cek email
      const message =
         email !== isUserExist?.email && !isEmailAlreadyUse && isSend
            ? {
                 message: 'Silahkan cek inbox akun email lama Anda',
              }
            : { message: 'Akun berhasil di perbarui' };

      //cek apakah oldpassword cocok dgn password di database
      const isPasswordMatch =
         oldPassword !== ''
            ? await argon2.verify(isUserExist?.password || '', oldPassword)
            : false;

      if (oldPassword !== '' && newPassword !== '' && !isPasswordMatch) {
         return NextResponse.json(
            {
               message: 'Password yang Anda masukan tidak cocok',
            },
            { status: 500 }
         );
      }
      //cek apakah user mengupdate passwordnya
      const isPasswordUpdated = oldPassword !== newPassword;
      if (oldPassword !== '' && newPassword !== '' && !isPasswordUpdated) {
         return NextResponse.json(
            {
               message: 'Gunakan password yang berbeda',
            },
            { status: 500 }
         );
      }
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
