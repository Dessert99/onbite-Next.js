import { createReviewAction } from '@/actions/createReview';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  // formData는 뭐지? next만의 문법인가? -> Next.js 문법이 아니라 브라우저 표준 Web API

  return (
    <section>
      <form action={createReviewAction}>
        <FieldSet>
          {/* 폼 제목 (선택사항) */}
          <FieldLegend className='text-lg font-semibold mb-4'>
            리뷰 작성하기
          </FieldLegend>

          <Input
            name='bookId'
            value={bookId}
            hidden
            readOnly // 히든 인풋에는 readOnly속성을 넣어야 경고가 사라진다.
          />

          {/* 1) 작성자 입력 필드 */}
          <Field>
            <FieldLabel htmlFor='author'>작성자</FieldLabel>
            <Input
              id='author'
              name='author'
              placeholder='이름을 입력하세요'
              required
            />
            <FieldDescription>실명을 입력해 주세요.</FieldDescription>
          </Field>

          {/* 2) 리뷰 내용 입력 필드 */}
          <Field>
            <FieldLabel htmlFor='content'>리뷰 내용</FieldLabel>
            <Input
              id='content'
              name='content'
              placeholder='솔직한 리뷰를 남겨주세요.'
              required
            />
          </Field>

          {/* 제출 버튼 */}
          <Button
            type='submit'
            className='mt-2'>
            작성하기
          </Button>
        </FieldSet>
      </form>
    </section>
  );
}
