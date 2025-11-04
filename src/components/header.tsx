import Image from "next/image";
import varosLogo from '../../public/logo.svg'

export function Header() {
  return (
    <header className="px-8 py-6 border-b border-gray-800">
      <Image 
        src={varosLogo}
        alt="Varos Logo"
        width={100}
        height={18}
      />
    </header>
  )
}