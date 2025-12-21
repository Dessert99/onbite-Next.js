import type { BookData } from '@/types/types';
import Link from 'next/link';
// import style from './book-item.module.css'; // CSS 모듈 제거

export default function BookItem({
  id,
  title,
  subTitle,
  description,
  author,
  publisher,
  coverImgUrl,
}: BookData) {
  return (
    <Link
      href={`/book/${id}`}
      className='flex gap-4 border-b border-[rgb(220,220,220)] py-5 px-2.5 text-black no-underline'>
      <img
        src={coverImgUrl}
        className='w-20'
      />
      <div>
        <div className='font-bold'>{title}</div>

        <div className='break-keep'>{subTitle}</div>
        <br />

        <div className='text-gray-500'>
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
}
