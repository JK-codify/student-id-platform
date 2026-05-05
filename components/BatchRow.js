// components/BatchRow.js
export default function BatchRow({ batch }) {
  const pct = Math.round((batch.generated / batch.students) * 100)
  const badgeClass = {
    done: 'badge-done', pending: 'badge-pending', draft: 'badge-draft'
  }[batch.status]

  return (
    <tr>
      <td className="batch-id">{batch.id}</td>
      <td>{batch.name}</td>
      <td>{batch.year}</td>
      <td>{batch.students}</td>
      <td>
        <div className="progress-wrap">
          <span>{batch.generated}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </td>
      <td><span className={`badge ${badgeClass}`}>{batch.status}</span></td>
      <td>
        <button>View</button>
        <button>Generate</button>
      </td>
    </tr>
  )
}