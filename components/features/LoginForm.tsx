"use client; // Indica que este componente deve ser um Client Component pois contém interatividade (useState, onClick).

import { useState } from 'react';
import { signInUser } from '@/services/auth';
import { type ServerAction } from 'react-dom';

// Define o tipo para o formulário
interface LoginFormProps {
  // Em um cenário real, você pode passar o 'action' como prop se não estiver usando um Server Action nativo.
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Usamos um handler que chama a função de serviço que é assíncrona.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Chama a função de serviço que executa a lógica de backend (Server Action).
      const result = await signInUser(email, password);

      if (result.success) {
        alert('Login bem-sucedido! Redirecionar para o dashboard...');
        // Aqui deve ir o redirecionamento real (e.g., router.push('/dashboard'))
      } else {
        setError(result.error || 'Ocorreu um erro desconhecido.');
      }
    } catch (err) {
      console.error(err);
      setError('Falha na conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 border rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Login Monti</h2>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isLoading} 
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 
          ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
      >
        {isLoading ? 'Apenas um momento...' : 'Entrar'}
      </button>
    </form>
  );
}
