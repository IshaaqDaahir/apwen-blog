'use client'

import { useState } from 'react'

type Category = 'who-we-are' | 'our-work'

export default function AboutContent() {
    const [activeCategory, setActiveCategory] = useState<Category>('who-we-are')

    const categories = [
        { id: 'who-we-are', label: 'Who We Are?' },
        { id: 'our-work', label: 'Our Work' }
    ]

    const content = {
        'who-we-are': (
            <div className="space-y-10">
                <section>
                    <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-[#701954] bg-brand-50 rounded-full">
                        Introduction
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are?</h2>
                    <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                        <p>
                            <strong>Our History:</strong> The Association of Professional Women Engineers of Nigeria APWEN was formed by a handful of women engineers led by <strong>Engr. (Mrs.) J. O. Maduka</strong> in 1982 and was formally inaugurated in 1983. It was originally meant to be a pressure group since most men hiring engineers then would rather have women in the kitchen and not on construction sites or behind the desk carrying out engineering designs.
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-[#701954] mb-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To be the catalyst for the advancement of women in the engineering profession towards national and global technological development.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-[#701954] mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To continuously increase awareness that engineering is a career for girls also, thereby improving the numerical strength of female engineers.
                        </p>
                    </div>
                </div>

                <section className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Objectives</h3>
                    <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-brand-100 text-[#701954] flex items-center justify-center shrink-0 mt-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <p className="text-gray-600 text-lg">To provide a forum for promoting sorority amongst female engineers.</p>
                    </div>
                </section>
            </div>
        ),
        'our-work': (
            <div className="space-y-10">
                <section>
                    <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-[#701954] bg-brand-50 rounded-full">
                        Impact
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Do?</h2>
                    <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                        <p>
                            Since 1982, APWEN has recorded a level of achievement of her objectives by advancing professional knowledge of members through:
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        {
                            title: 'Continuing Development',
                            desc: 'Facilitation of continuing professional development workshops and organizing industrial visits to engineering facilities.'
                        },
                        {
                            title: 'Career Counselling',
                            desc: 'Awareness sessions for female students in Primary, Secondary and Tertiary institutions to encourage science and engineering study.'
                        },
                        {
                            title: 'Mentorship',
                            desc: 'Participating as role models and mentors at programmes organized by engineering students of tertiary institutions.'
                        },
                        {
                            title: 'Scholarships & Awards',
                            desc: 'Giving scholarships and awards to outstanding female engineering students to support their education.'
                        }
                    ].map((item, i) => (
                        <div key={i} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:border-brand-200 hover:shadow-lg transition-all">
                            <h4 className="font-bold text-[#701954] text-xl mb-3">{item.title}</h4>
                            <p className="text-gray-500 text-base">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-72 shrink-0">
                <div className="sticky top-32 space-y-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id as Category)}
                            className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between group ${activeCategory === cat.id
                                ? 'bg-[#701954] text-white shadow-xl shadow-brand-900/20 translate-x-1'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <span className="font-bold">{cat.label}</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-300 ${activeCategory === cat.id ? 'translate-x-1' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-h-[600px] bg-white">
                <div className="transition-all duration-500 ease-in-out">
                    {content[activeCategory]}
                </div>
            </main>
        </div>
    )
}
