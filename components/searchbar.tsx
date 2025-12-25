'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

function SearchbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // 빌드 타임에는 값을 알 수 없다. -> 빌드 에러 -> 이 컴포넌트를 오직 클라이언트에서만 실행(사전 렌더링 배제)하면 된다.
  const q = searchParams.get('q');

  const [search, setSearch] = useState(q || '');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className='flex gap-2.5 mb-5'>
      <Input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className='flex-1 p-4 rounded-[5px] border border-[rgb(220,220,220)]'
      />
      <Button onClick={onSubmit}>검색</Button>
    </div>
  );
}

export default function Searchbar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchbarContent />
    </Suspense>
  );
}
