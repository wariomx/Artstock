import Link from "next/link";

export default function Header() {
    return(
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">Artstock</Link>
                <nav className="hidden md:flex space-x-4">
                    <Link href="/marketplace" className="hover:text-gray-300">Marketplace</Link>
                    <Link href="/tokenize" className="hover:text-gray-300">Tokenize</Link>
                    <Link href="/about" className="hover:text-gray-300">About</Link>
                    <Link href="/contact" className="hover:text-gray-300">Contact</Link>
                </nav>
                <div className="md:hidden">
                    <button className="text-white focus:outline-none">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}