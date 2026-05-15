import api from './api'

/** POST /Usuarios/Login → retorna dados do usuário e salva token */
export async function login({ email, password }) {
  const { data } = await api.post('/Usuarios/Login', { email, senha: password })
  localStorage.setItem('petlife_token', data.token)
  return {} // O usuário será decodificado do JWT no AuthContext
}

/** POST /Usuarios/CadastrarUsuario → cria conta e faz login automático */
export async function register({ name, email, password }) {
  await api.post('/Usuarios/CadastrarUsuario', { nome: name, email, senha: password, tipo: 1 })
  // Faz o login automaticamente após cadastrar
  return login({ email, password })
}

/** Limpa token local e redireciona */
export function logout() {
  localStorage.removeItem('petlife_token')
  window.location.href = '/login'
}
