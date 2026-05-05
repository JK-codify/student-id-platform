// components/BatchTable.js
'use client'
import { useState } from 'react'
import BatchRow from './BatchRow'
import { BATCHES } from '../data/mockData'

const PER_PAGE = 5
const YEARS = ['All Years', '2026', '2025', '2024', '2023']

export default function BatchTable() {
  const [year, setYear]     = useState('All Years')
  const [search, setSearch] = useState('')
  const [page, setPage]     = useState(1)

  const filtered = BATCHES.filter(b => {
    const matchYear   = year === 'All Years' || b.year === year
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase())
    return matchYear && matchSearch
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const visible    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="filter-bar">
        <select value={year} onChange={e => { setYear(e.target.value); setPage(1) }}>
          {YEARS.map(y => <option key={y}>{y}</option>)}
        </select>
        <input placeholder="Search batch..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <button>+ New Batch</button>
      </div>

      <table>
        <thead><tr>
          {['ID','Name','Year','Students','Generated','Status','Actions'].map(h =>
            <th key={h}>{h}</th>)}
        </tr></thead>
        <tbody>
          {visible.map(b => <BatchRow key={b.id} batch={b} />)}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button key={p} onClick={() => setPage(p)}
            className={p === page ? 'active' : ''}>{p}</button>
        ))}
      </div>
    </div>
  )
}