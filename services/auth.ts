// services/auth.ts
"import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from '@/lib/supabase';
import { type ServerAction } from 'react-dom';

/**
 * @description Realiza o login de um utilizador usando as credenciais fornecidas.
 * @param email O email do utilizador.
 * @param password A password do utilizador.
 * @returns Um objeto contendo o utilizador logado ou um erro.
 */
export async function signInUser(email: string, password: string): Promise<{ success: boolean; user: any; error?: string }> {
  // Nota de Segurança: Esta função deve ser executada em um Server Component ou Server Action.
  // Usamos supabaseServer porque requer acesso de nível de serviço.
  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, user: null, error: error.message };
  }

  // O 'data' conterá a sessão e o utilizador.
  return { success: true, user: data.user, error: undefined };
}

// Adicionar outras funções de autenticação aqui (e.g., signUpUser, signOutUser)