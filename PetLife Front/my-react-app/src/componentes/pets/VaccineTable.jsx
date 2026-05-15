import Badge  from '../ui/Badge'
import styles from './VaccineTable.module.css'

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('pt-BR')
}

const STATUS_MAP = {
  ok:      { variant: 'ok',      label: '✓ Em dia' },
  warning: { variant: 'warning', label: 'Vence em breve' },
  expired: { variant: 'expired', label: '⚠ Vencida' },
}

export default function VaccineTable({ vaccines = [], onAdd }) {
  if (vaccines.length === 0) {
    return (
      <div className={styles.empty}>
        <span>💉</span>
        <p>Nenhuma vacina registrada ainda.</p>
        {onAdd && (
          <button className={styles.emptyBtn} onClick={onAdd}>
            + Registrar primeira vacina
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Vacina</th>
            <th>Lote</th>
            <th>Aplicação</th>
            <th>Próxima Dose</th>
            <th>Veterinário</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vac) => {
            const s = STATUS_MAP[vac.status] ?? STATUS_MAP.ok
            return (
              <tr key={vac.id}>
                <td className={styles.vacName}>{vac.nome}</td>
                <td><code className={styles.batch}>{vac.lote || '—'}</code></td>
                <td>{formatDate(vac.dataAplicacao)}</td>
                <td className={vac.status === 'warning' ? styles.dateWarn : ''}>
                  {formatDate(vac.proximaDose)}
                </td>
                <td>{vac.veterinario || '—'}</td>
                <td><Badge variant={s.variant}>{s.label}</Badge></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
