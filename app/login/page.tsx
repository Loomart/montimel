import LoginForm from '@/components/features/LoginForm';

export default function LoginPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ marginBottom: '2rem' }}>Welcome Back</h1>
      <LoginForm />
    </main>
  );
}
