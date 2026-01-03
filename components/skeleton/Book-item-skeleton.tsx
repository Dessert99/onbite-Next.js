export default function BookItemSkeleton() {
  return (
    <div className='flex gap-4 border-b border-[rgb(220,220,220)] py-5 px-2.5 text-black no-underline'>
      <div className='w-20 h-30 bg-gray-200'></div>
      <div className='flex-1'>
        <div className='w-full h-10 bg-gray-200'></div>
        <div className='w-full h-5 bg-gray-200'></div>
        <br />
        <div className='w-full h-5 bg-gray-200'></div>
      </div>
    </div>
  );
}
