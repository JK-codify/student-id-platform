// src/app/batches/page.js
import BatchTable from '../../../components/BatchTable'
import '../../../styles/dashboard.css'

export default function BatchesPage() {
  return (
    <div className="page-wrap">
      <div className="page-header">
        <h2>Batch Management</h2>
        <p>Filter, view and manage all ID card batches.</p>
      </div>
      <div className="card">
        <BatchTable />
      </div>
    </div>
  )
}