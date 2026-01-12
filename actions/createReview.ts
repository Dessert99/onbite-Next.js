'use server';
import { revalidatePath } from 'next/cache';

// 파일을 따로 분리한다면, 파일 최상단에 서버 액션 코드 넣기
// 지시어가 선언된 순간, 이 함수는 클라이언트가 아닌 "서버"에서 실행되는 API 엔드포인트가 됩니다.

export const createReviewAction = async (formData: FormData) => {
  // 왜 toString을 써야 하는지? -> formData.get('key')의 반환 값은 FormDataEntryValue | null 타입이라서
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();
  const bookId = formData.get('bookId')?.toString();

  if (!content || !author) {
    return;
  }

  try {
    // [서버 실행 증명] 이 fetch 요청은 브라우저(Network 탭)에서 발생하지 않고, Next.js 백엔드 서버에서 외부 API 서버로 직접 요청을 보냅니다.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }), // 직렬화
      }
    );

    console.log(response.status); // [서버 실행 증명] 이 로그는 브라우저 콘솔이 아닌, 터미널(서버)에 출력됩니다.

    revalidatePath(`/books/${bookId}`); //재검증. 이 페이지에 포함된 모든 캐시 무효화. 풀라우트 캐시를 삭제한다.
  } catch (error) {
    console.error(error);
  }
};
