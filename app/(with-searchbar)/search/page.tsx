import BookItem from '@/components/book-item';
import { BookData } from '@/types/types';

// 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정한다 (잘 쓰이지는 않는다)
// export const dynamic = 'auto';
//1. auto: 기본값. 아무것도 강제하지 않는다.
//2. force-dynamic : 페이지를 강제로 dynamic 페이지로 설정
//3. force-static: 페이지를 강제로 static 페이지로 설정 -> 페이지 내에서 사용한 동적 값은 undefined로 바뀐다. -> 제대로 동작 안 될 가능성이 있다.
//4. error: 페이지를 강제로 static 페이지로 변경 (설정하면 안되는 이유가 있다면 빌드 오류가 발생한다)

// searchParams는 페이지 컴포넌트에게 제공되는 현재 페이지의 쿼리 스트링이다. -> 동적 함수이다. -> Page는 다이나믹 페이지
export default async function Page({
  searchParams, // URL에서 전달된 쿼리 스트링(예: ?q=검색어) 데이터를 포함하는 객체
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams; // 비동기로 쿼리 스트링 출력

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: 'force-cache' } // 검색은 동적인 값이기 때문에 정적 페이지로 변환은 불가능하지만, 이렇게 데이터를 캐싱해두면 동일한 검색어 경우 빠르게 보여줄 수 있다.
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
