import prisma from '@/utils/prisma';

import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
   try {
      const dataPost = await prisma.post.findMany({
         select: {
            id: true,
            slug: true,
            title: true,
            categories: {
               select: {
                  name: true,
               },
            },
            image: true,
            createAt: true,
            updateAt: true,
         },
      });

      return NextResponse.json(dataPost);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'gagal mendapatkan data post' },
         { status: 500 }
      );
   }
};

export const POST = async (req: Request) => {
   const { slug, status, title, content, category, image, username } =
      await req.json();

   try {
      const newPost = await prisma.post.create({
         data: {
            slug,
            status,
            title,
            content,
            image,
            username,
         },
      });

      return NextResponse.json(newPost);
   } catch (error) {
      console.log(error);
      return NextResponse.json(
         { message: 'gagal menambah post baru' },
         { status: 500 }
      );
   }
};
