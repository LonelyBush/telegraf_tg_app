import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';
import { AppLayout } from '@/layouts/appLayout';

export const metadata: Metadata = {
  title: 'Bot App',
  description: 'Telegram Bot Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
