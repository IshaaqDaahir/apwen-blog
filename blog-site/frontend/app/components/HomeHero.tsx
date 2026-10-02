import Image from 'next/image'

export default function HomeHero() {
    return (
        <section className="bg-linear-to-br from-[#fdf4fb] via-[#fdf2fa] to-[#f8ebf5] py-3 md:py-4 lg:py-6 border-b border-brand-100 overflow-hidden relative">
            {/* Premium Decorative Patterns */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23701954' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-200/15 rounded-full blur-[60px] -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-rose-200/15 rounded-full blur-[60px] -ml-32 -mb-32"></div>

            <div className="container relative mx-auto px-6">
                <div className="flex flex-col items-center">
                    {/* Logos and Heading Row */}
                    <div className="flex flex-row items-center justify-center gap-3 md:gap-6 lg:gap-8 mb-2">
                        {/* Left Logo */}
                        <div className="shrink-0 animate-in fade-in slide-in-from-left duration-1000">
                            <div className="relative group">
                                <div className="absolute -inset-3 bg-[#701954]/10 rounded-2xl blur-xl group-hover:bg-[#701954]/20 transition-colors pointer-events-none"></div>
                                <div className="relative bg-white/60 backdrop-blur-md p-2.5 rounded-2xl shadow-xl shadow-brand-900/10 border border-white/40 transition-transform group-hover:scale-105">
                                    <Image
                                        src="/android-chrome-512x512.png"
                                        alt="APWEN Logo"
                                        width={200}
                                        height={200}
                                        className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="font-blackletter text-2xl md:text-5xl lg:text-5xl text-[#701954] leading-tight font-bold tracking-tight drop-shadow-sm text-center animate-in fade-in slide-in-from-bottom duration-1000">
                            The Association of Professional <br className="hidden lg:block" /> Women Engineers of Nigeria
                        </h1>

                        {/* Right Logo */}
                        <div className="shrink-0 animate-in fade-in slide-in-from-right duration-1000">
                            <div className="relative group">
                                <div className="absolute -inset-3 bg-[#0d5c35]/10 rounded-2xl blur-xl group-hover:bg-[#0d5c35]/20 transition-colors pointer-events-none"></div>
                                <div className="relative bg-white/60 backdrop-blur-md p-2.5 rounded-2xl shadow-xl shadow-brand-900/10 border border-white/40 transition-transform group-hover:scale-105">
                                    <Image
                                        src="/nse/android-chrome-512x512.png"
                                        alt="NSE Logo"
                                        width={200}
                                        height={200}
                                        className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain opacity-95 group-hover:opacity-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subtitle and Motto Section */}
                    <div className="flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom duration-1000">
                        <p className="font-bold text-[10px] md:text-xs lg:text-sm text-[#701954]/60 tracking-[0.3em] mb-4 md:mb-6 uppercase">
                            A Division of the Nigerian Society of Engineers
                        </p>

                        {/* Motto Cards */}
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                            {[
                                { label: 'Encourage', bg: 'bg-[#e11d48]', shadow: 'shadow-rose-900/10' },
                                { label: 'Enhance', bg: 'bg-gray-900', shadow: 'shadow-black/10' },
                                { label: 'Excel', bg: 'bg-[#701954]', shadow: 'shadow-brand-900/10' }
                            ].map((motto) => (
                                <div
                                    key={motto.label}
                                    className={`px-5 py-1.5 ${motto.bg} text-white font-bold rounded-b-lg text-[10px] md:text-xs tracking-[0.2em] shadow-md ${motto.shadow} uppercase transition-all hover:scale-105 hover:-translate-y-px cursor-default`}
                                >
                                    {motto.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
