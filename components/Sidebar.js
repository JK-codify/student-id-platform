// components/Sidebar.js
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/dashboard',  label: 'Dashboard'   },
  { href: '/students',   label: 'Student Form' },
  { href: '/import',     label: 'Excel Import' },
  { href: '/preview',    label: 'ID Card'      },
  { href: '/batches',    label: 'Batches'      },
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside>
      {NAV.map(n => (
        <Link key={n.href} href={n.href}
          style={{ fontWeight: path === n.href ? 'bold' : 'normal' }}>
          {n.label}
        </Link>
      ))}
    </aside>
  )
}