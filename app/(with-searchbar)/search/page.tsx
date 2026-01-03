import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/BookListSkeleton';
import { BookData } from '@/types/types';
import { delay } from '@/utils/delay';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
  await delay(1500); // 1.5초 딜레이
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

export default async function Page({
  searchParams, // URL에서 전달된 쿼리 스트링(예: ?q=검색어) 데이터를 포함하는 객체
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams; // Promise 풀고

  return (
    <Suspense
      key={q} // q값이 변할 때마다(검색어가 바뀔 떄마다) 로딩 상태를 다시 표시한다.
      fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ''} />
    </Suspense>
  );
}
