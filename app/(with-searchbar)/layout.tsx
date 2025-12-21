import Searchbar from '@/components/searchbar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      {children} {/** 페이지 컴포넌트 역할 */}
    </div>
  );
}
