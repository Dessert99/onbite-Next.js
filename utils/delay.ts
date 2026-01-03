// 딜레이를 발생시키는 함수
// async -> 실행 결과로 항상 Promise를 반환한다고 선언
export async function delay(ms: number) {
  // Promise -> 이 객체가 생성되는 순간, 내부에 있는 코드(executor)가 바로 실행
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(''); // 약속 이행(성공) 신호 -> 비동기 작업 종료
    }, ms);
  });
}
