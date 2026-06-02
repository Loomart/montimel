"use client;

import LoginForm from '@/components/features/LoginForm';

// Esta página é um Server Component que renderiza um Client Component.
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* O LoginForm agora contém toda a lógica de UI e chamada de serviço */}
      <LoginForm />
    </div>
  );
}
