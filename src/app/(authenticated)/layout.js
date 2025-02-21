import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }) {
  const user = await getUser();
  if (!user) {
    // If user is not logged in, redirect to login
    redirect('/login');
  }

  return <>{children}</>;
}
