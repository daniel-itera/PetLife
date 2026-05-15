import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { register as registerService } from '../../servicos/authService'
import Button from '../../componentes/ui/Button'
import styles from './Auth.module.css'

export default function AuthPage({ mode = 'login' }) {
  const { login } = useAuth()
  const navigate  = useNavigate()

  const [tab, setTab]       = useState(mode)          // 'login' | 'register'
  const [form, setForm]     = useState({ name: '', email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (tab === 'login') {
        await login({ email: form.email, password: form.password })
      } else {
        await registerService({ name: form.name, email: form.email, password: form.password })
      }
      navigate('/dashboard')
    } catch {
      setError(tab === 'login'
        ? 'Credenciais inválidas. Verifique e tente novamente.'
        : 'Erro ao criar conta. Verifique os dados e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      {/* Painel ilustração */}
      <div className={styles.illustration}>
        {/* A imagem de fundo agora contém todo o visual. Você pode recolocar o texto aqui se desejar. */}
      </div>

      {/* Painel formulário */}
      <div className={styles.formPanel}>
        <div className={styles.logo}>🐾 PetLife</div>
        <h2 className={styles.welcome}>
          {tab === 'login' ? 'Bem-vindo de volta!' : 'Crie sua conta!'}
        </h2>
        <p className={styles.sub}>
          {tab === 'login'
            ? 'Faça login para cuidar dos seus pets.'
            : 'Junte-se à família PetLife.'}
        </p>

        {/* Tabs login / cadastro */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${tab === 'login' ? styles.tabActive : ''}`}
            onClick={() => setTab('login')}
          >
            Entrar
          </button>
          <button
            className={`${styles.tabBtn} ${tab === 'register' ? styles.tabActive : ''}`}
            onClick={() => setTab('register')}
          >
            Cadastrar
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Nome completo</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Seu nome"
                value={form.name}
                onChange={update('name')}
                required
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input
              className={styles.input}
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={update('email')}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Senha</label>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={update('password')}
              required
            />
          </div>

          {tab === 'login' && (
            <div className={styles.forgotRow}>
              <a href="#" className={styles.forgotLink}>Esqueci minha senha</a>
            </div>
          )}

          {error && <p className={styles.errorMsg}>{error}</p>}

          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading
              ? 'Aguarde...'
              : tab === 'login' ? 'Entrar na minha conta' : 'Criar conta'}
          </Button>
        </form>

        {/* <div className={styles.divider}><span>ou continue com</span></div>
        <Button variant="ghost" fullWidth>
          🔵 Continuar com Google
        </Button> */}
      </div>
    </div>
  )
}
