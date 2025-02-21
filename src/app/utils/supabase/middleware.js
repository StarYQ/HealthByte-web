import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

// This is called on each request in the middleware
export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });

  // Create a server client with the new SSR approach
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Sync the new/updated cookies
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value, options)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: For SSR token refresh
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Optionally enforce auth for all matched routes:
  // if (!user && !request.nextUrl.pathname.startsWith('/login')) { ...redirect... }

  return supabaseResponse;
}
