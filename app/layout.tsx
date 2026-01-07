import { Footer } from '@/components/Footer';
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <div className='mx-auto min-h-screen max-w-125 bg-white py-4 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]'>
          <header className='h-15 text-xl font-bold leading-4'>
            <Link href={'/'}>📚 ONEBITE BOOKS</Link>
          </header>
          <main className='pt-5'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
