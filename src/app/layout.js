import { getUser } from '@/lib/auth';
import { UserProvider } from '@/context/UserContext';

export const metadata = {
  title: 'HealthByte',
  description: 'Monitor your patients\' cardiovascular recovery progress.',
};

export default async function RootLayout({ children }) {
  const initialUser = await getUser();

  return (
    <html lang="en">
      <body>
        <UserProvider initialUser={initialUser}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
