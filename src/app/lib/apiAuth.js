import { createClient } from '@/utils/supabase/server';
import prisma from './prisma';


// To use in any server-based API route to retrieve the current user.
export async function getUserFromApiRoute() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  if (user) {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (userData) {
      return { ...user, ...userData };
    }
  }

  return null;
}
