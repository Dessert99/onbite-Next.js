'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { startTransition, useEffect } from 'react';

// Next는 에러가 발생했을 때, 에러 컴포넌트에게 자바스크립트 에러 타입의 에러 객체를 props로 전달한다.
// reset이라는 함수도 props로 제공한다. (에러가 발생한 페이지를 복구하기 위해 다시 한 번 컴포넌트들을 렌더링 시킨다.)
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter(); // next/navigation패키지에서 불러와야 한다.

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <Button
        onClick={() => {
          // 무슨 역할?
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러오는 역할 (에러 상태가 초기화되지는 않음)
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링하는 역할
          });
        }}>
        다시 시도하기
      </Button>
    </div>
  );
}

/**
이 에러  파일과 동일한 경로, 하위 경로에서 에러가 발생하면, 이 페이지를 렌더링한다. 함꼐 렌더링 시켜주는건 동일한 위치내 컴포넌트만.(하위 컴포넌트는 없앤다.)
-> 그래서 각 경로마다 에러 파일을 만들어주면 좋다.


클라이언트 컴포넌트로 설정해야하는 이유
- 오류라는 것은 서버-클라이언트 어떤 환경에서든 발생할 수 있기 때문이다. 클라이언트 컴포넌트는 서버, 클라이언트에서 모두 실행되는 특징이 있다.
 

reset() 함수의 실체
- reset은 처음에 받은 데이터를 바탕으로 다시 시도하기 때문


 */
