import BookItem from '@/components/book-item';
import { BookData } from '@/types/types';

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: 'no-store' }
  );

  //간단한 예외 처리
  if (!response.ok) {
    return <div>문제가 발생했습니다. </div>;
  }

  const allBooks: BookData[] = await response.json(); // 서버에서 불러오는 데이터에 타입을 명시해줘야 컴파일러가 추론할 수 있다.

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem
          key={book.id}
          {...book}
        />
      ))}
    </div>
  );
}

async function RecoBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`
  );

  if (!response.ok) {
    return <div>문제가 발생했습니다. </div>;
  }
  const recoBooks: BookData[] = await response.json(); // 서버에서 불러오는 데이터에 타입을 명시해줘야 컴파일러가 추론할 수 있다.

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem
          key={book.id}
          {...book}
        />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className='flex flex-col gap-5'>
      <section>
        <h3 className='mb-0'>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3 className='mb-0'>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
