import { useState, useEffect } from 'react'
import { askAi, coletarContextoPets } from '../../servicos/aiService'
import dashboardStyles from '../Dashboard/Dashboard.module.css'
import styles from './AiPage.module.css'

export default function AiPage() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [petContext, setPetContext] = useState('')
  const [contextLoading, setContextLoading] = useState(true)

  useEffect(() => {
    coletarContextoPets()
      .then(ctx => setPetContext(ctx))
      .finally(() => setContextLoading(false))
  }, [])

  const handleAsk = async () => {
    if (!prompt) return
    setLoading(true)
    try {
      const res = await askAi(prompt, petContext)
      setResponse(res)
    } catch (err) {
      setResponse('Erro ao consultar a IA.')
    } finally {
      setLoading(false)
    }
  }

  const sugestoes = [
    'Meu pet precisa de alguma vacina?',
    'A dieta do meu pet está adequada?',
    'Quando devo agendar a próxima consulta?',
    'Dê um resumo da saúde dos meus pets'
  ]

  return (
    <div className={dashboardStyles.page}>
      <div className={dashboardStyles.sectionHeader}>
        <h2 className={dashboardStyles.sectionTitle}>Assistente Virtual PetLife (IA)</h2>
      </div>

      {contextLoading ? (
        <div className={styles.card}>
          <p className={styles.loadingCtx}>🔄 Carregando dados dos seus pets...</p>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.suggestRow}>
            {sugestoes.map((s, i) => (
              <button key={i} className={styles.suggestBtn} onClick={() => setPrompt(s)}>
                {s}
              </button>
            ))}
          </div>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Ex: Meu pet precisa de alguma vacina? A dieta está adequada?"
            className={styles.textarea}
          />
          <button onClick={handleAsk} disabled={loading} className={styles.askBtn}>
            {loading ? 'Pensando...' : '✨ Perguntar para a IA'}
          </button>
          {response && (
            <div className={styles.responseBox}>
              <strong className={styles.responseTitle}>🤖 Resposta da IA:</strong>
              <p className={styles.responseText}>{response}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
