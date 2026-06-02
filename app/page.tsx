import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Monti App</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Please log in to continue.</p>
      <Link href="/login" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '0.375rem' }}>
        Go to Login
      </Link>
    </main>
  );
}
