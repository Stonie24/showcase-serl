import Image from 'next/image'
import Link from 'next/link';
import logo from '../../../public/image/booklogo.png'

export function Header() {
  return (
    <header className='relative z-50 flex-none pt-4 pb-4'>
      <div className='headernav'>
        <div className=' sm:flex flex-grow03'>
          <Image src={logo} alt='logo' width={115} height={115} unoptimized />
          <p className='font-mono text-2xl text-blue-600' id="titletext">ShowcaseSERL</p>
        </div>

        <div className='navbar'>
            <nav className={"nav"}>
        <ul>
          <li>
            <Link href="/" className='linav'>Home</Link>
            
          </li>
          <li>
            <Link href="/kiosk" className='linav'>Kiosk</Link>
          </li>
          <li>
            <Link href="/projects" className='linav'>Projects</Link>
          </li>
        </ul>
      </nav>
        </div>
      </div>
    </header>
  )
}
