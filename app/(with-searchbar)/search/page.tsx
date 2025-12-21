import BookItem from '@/components/book-item';
import { BookData } from '@/types/types';

// searchParams는 페이지 컴포넌트에게 제공되는 현재 페이지의 쿼리 스트링이다.
export default async function Page({
  searchParams, // URL에서 전달된 쿼리 스트링(예: ?q=검색어) 데이터를 포함하는 객체
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams; // 비동기로 쿼리 스트링 출력

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`
  );

  if (!response.ok) {
    return <div>오류 발생</div>;
  }
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem
          key={book.id}
          {...book}
        />
      ))}
    </div>
  );
}
