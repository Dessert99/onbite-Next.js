import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>임시</div>
      {children} {/*페이지 컴포넌트 렌더링 위치를 정해줘야 함  */}
    </div>
  );
}
