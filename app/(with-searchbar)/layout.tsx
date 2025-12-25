import Searchbar from '@/components/searchbar';
import { ReactNode, Suspense } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Searchbar에서는 useSearchParams를 쓰고 있기 때문에 Suspense로 클라이언트 컴포넌트를 감싸줘야 한다. */}
      {/* Suspense역할: 사전 렌더링 진행할 때 Suspense에 감싸진 컴포넌트는 미완성 상태로 남는다. (비동기 작업이 완료될 때까지 - useSearchParams) */}
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children} {/** 페이지 컴포넌트 역할 */}
    </div>
  );
}
