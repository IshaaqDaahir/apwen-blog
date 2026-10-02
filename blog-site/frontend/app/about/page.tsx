import Link from 'next/link'
import AboutContent from './AboutContent'

export default async function AboutPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="bg-[#701954] text-white pt-24 pb-12 md:pt-32 md:pb-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl">
                        <nav className="flex items-center gap-2 text-sm text-brand-100 mb-6 animate-in slide-in-from-left duration-500">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span className="opacity-50">/</span>
                            <span className="text-white font-medium">About</span>
                        </nav>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-in slide-in-from-bottom duration-700">
                            About Us
                        </h1>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 md:py-16 bg-white relative z-10">
                <div className="container mx-auto px-6">
                    <AboutContent />
                </div>
            </section>
        </div>
    )
}
