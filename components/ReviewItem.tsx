import { ReviewData } from '@/types/types';

export default function ReviewItem({
  id,
  author,
  bookId,
  content,
  createdAt,
}: ReviewData) {
  return (
    <div className='py-2 mb-5'>
      <div>{author}</div>
      <div className='p-4 bg-gray-100'>{content}</div>
      <div className='flex gap-5 '>
        <div>{new Date(createdAt).toLocaleString()}</div>
        <div>삭제하기</div>
      </div>
      <div></div>
    </div>
  );
}
