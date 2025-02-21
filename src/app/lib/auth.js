import { cookies } from 'next/headers';
import prisma from './prisma';
import { createClient } from '@/utils/supabase/server';

export async function getUser() {
  const supabase = await createClient(); 
  const { data: { user }, error } = await supabase.auth.getUser();
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
