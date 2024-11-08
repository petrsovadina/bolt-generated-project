import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-600 p-4 text-white shadow-md">
      <nav>
        <ul className="flex space-x-4 justify-center">
          <li><Link href="/">Domů</Link></li>
          <li><Link href="/about">O nás</Link></li>
          <li><Link href="/services">Služby</Link></li>
          <li><Link href="/contact">Kontakt</Link></li>
          <li><Link href="/profile">Profil</Link></li>
          <li><Link href="/blog">Blog</Link></li>
        </ul>
      </nav>
    </header>
  )
}
