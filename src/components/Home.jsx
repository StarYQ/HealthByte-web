'use client';

import React from 'react';
import Navbar from './Navbar';

export default function Home({ user }) {
  return (
    <div>
      <Navbar user={user} />
      <main style={{ padding: '1rem' }}>
        <h1>Welcome to HealthByte!</h1>
        <p>WIP</p>
      </main>
      <footer style={{ marginTop: '2rem', textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} HealthByte</p>
      </footer>
    </div>
  );
}
