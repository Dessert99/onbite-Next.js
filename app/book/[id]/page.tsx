import { BookData } from '@/types/types';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if (!response.ok) {
    return <div>문제</div>;
  }

  const book: BookData = await response.json();

  const { author, coverImgUrl, description, publisher, subTitle, title } = book;

  return (
    <div className='flex flex-col gap-2.5'>
      <div
        className='relative flex justify-center p-5 bg-center bg-no-repeat bg-cover before:absolute before:inset-0 before:bg-black/70'
        style={{ backgroundImage: `url('${coverImgUrl}')` }}>
        <img
          src={coverImgUrl}
          className='z-10 h-full max-h-90'
        />
      </div>
      <div className='text-lg font-bold'>{title}</div>
      <div className='text-gray-500'>{subTitle}</div>
      <div className='text-gray-500'>
        {author} | {publisher}
      </div>
      <div className='whitespace-pre-line rounded-[5px] bg-[rgb(245,245,245)] p-4 leading-[1.3]'>
        {description}
      </div>
    </div>
  );
}
