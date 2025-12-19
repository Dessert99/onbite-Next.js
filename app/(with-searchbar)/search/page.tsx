// 리액트의 서버 컴포넌트이기 때문에 async를 붙일 수 있다. 사전 렌더링 개념 떄문에 비동기로 실행해도 됨.
export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams; // 쿼리 스트링
  return <div>SEARCH 페이지 {q}</div>;
}
