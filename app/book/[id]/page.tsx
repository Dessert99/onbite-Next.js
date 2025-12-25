import { BookData } from '@/types/types';
import { notFound } from 'next/navigation';

// 역할: 정적인 파라미터를 생성한다. -> Page의 정적 페이지 변환을 위해 사용 -> 함수 이름은 예약어이다.
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]; // 빌드 타임에 next서버가 이 파라미터를 읽어서 그에 해당하는 페이지를 정적으로 만든다.
  // 이때 파라미터의 값을 명시할 때 문자열로만 명시해야 한다.
}

// 현재 Page는 동적 페이지이다. 하지만 정적 페이지로써 빌드 타임에 생성되도록 하려면 빌드 타임에 params에 어떤 값들이 있는지 알려줘야 한다.
export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>; // 빌드 타임에 next서버가 이 파라미터를 읽어서 그에 해당하는 페이지를 정적으로 만든다.
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    {
      // cache: 'no-store', // 데이터 페칭의 결과를 저장하지 않는다. 캐싱을 하지 않는다.
      // cache: 'force-cache', //요청의 결과를 무조건 캐싱. 한 번 호출된 이후에 다시는 호출되지 않음. 캐싱된 데이터 위치 : next서버에 json형태로 보관
      // next: { revalidate: 3 }, // 특정 시간 주기로 업데이트
      // next:{tags:['a']} // 요청이 들어왔을 때 데이터를 최신화
    }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
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
