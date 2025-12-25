import { BookData } from '@/types/types';

export async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'force-cache' } // 캐시 옵션을 추가하면 Footer컴포넌트는 Dynamic 컴포넌트가 아니다. -> Footer를 사용하는 layout컴포넌트도 static 페이지가 된다. -> 렌더링이 빠름
  );
  if (!response.ok) {
    return <footer className='pt-25 text-gray-500'>제작 @winterlood</footer>;
  }

  const books: BookData[] = await response.json();

  const bookCount = books.length;

  return (
    <footer>
      <div className='pt-25 text-gray-500'>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}
