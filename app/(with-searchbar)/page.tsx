import BookItem from '@/components/book-item';
import { BookData } from '@/types/types';

async function AllBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    // { cache: 'no-store' } // no-store 설정 -> 캐시 사용 안함 -> 이 컴포넌트를 쓰는 컴포넌트는 모두 Dynamic 컴포넌트 -> 이 API는 바뀌지 않기 때문에 캐시 설정을 해야 한다.
    { cache: 'force-cache' } // 이제 static 컴포넌트로 된다. -> 렌더링 빠름
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
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } } // 페이지는 다이나믹하게 설정하는 옵션은 아니다. 이건 3초 주기로 데이터를 페칭하는 옵션
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
