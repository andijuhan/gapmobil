import prisma from '@/utils/prisma';

import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
   const { searchParams } = new URL(req.url);
   const sort = searchParams.get('sortby');
   const order = searchParams.get('order');
   const search = searchParams.get('search')?.toLowerCase() || '';
   let page = Number(searchParams.get('page')) || 1;
   const take = Number(searchParams.get('take')) || 10;

   page = (page - 1) * take;
   try {
      let orderBy: any;
      if (sort === 'title') {
         orderBy = { title: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'status') {
         orderBy = { published: order === 'desc' ? 'desc' : 'asc' };
      } else if (sort === 'updateAt') {
         orderBy = { updateAt: order === 'desc' ? 'desc' : 'asc' };
      } else {
         orderBy = { updateAt: 'desc' };
      }
      const dataPost = await prisma.post.findMany({
         orderBy,
         skip: page,
         take,
         where: {
            OR: [{ title: { contains: search, mode: 'insensitive' } }],
         },
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
            username: true,
            published: true,
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
   const { slug, published, title, content, category, image, username } =
      await req.json();

   try {
      const newPost = await prisma.post.create({
         data: {
            slug,
            published,
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

export const DELETE = async (req: Request, res: Response) => {
   const { postId }: { postId: string[] } = await req.json();

   try {
      const deletePost = await prisma.post.deleteMany({
         where: {
            id: {
               in: postId,
            },
         },
      });
      return NextResponse.json(deletePost);
   } catch (error) {
      return NextResponse.json(
         { message: 'Gagal menghapus data' },
         { status: 500 }
      );
   }
};
