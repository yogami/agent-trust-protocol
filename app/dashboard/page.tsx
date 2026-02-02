'use client';

import { Navbar } from '@/components/ui/Navbar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { useAuth } from '@/lib/auth/auth.context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            // Redirect or show login prompt
            // For now, just show empty state or "Please login"
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <main className="min-h-screen pt-24 px-4">
                <Navbar />
                <div className="text-center mt-20">
                    <h1 className="text-2xl font-bold">Please Login to view Dashboard</h1>
                    <p className="text-gray-500 mt-2">Use the &quot;Login Demo&quot; button in the navbar.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-16 px-4 md:px-8">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, {user.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage your agents and monitor their performance.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider">Solana Live</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">zkSync L2</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">Starknet</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatsCard
                        title="Operational Agents"
                        value="3"
                        description="2 verified"
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
                    />
                    <StatsCard
                        title="Avg. TrustScore"
                        value="92"
                        description="+4% from last month"
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
                    />
                    <StatsCard
                        title="Chain Anchors"
                        value="128"
                        description="Immutable SLA proofs"
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                    />
                    <StatsCard
                        title="Network Health"
                        value="99.9%"
                        description="RPC Node: Synchronized"
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>}
                    />
                </div>

                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Your Agents</h2>
                        <div className="flex gap-4">
                            <Link href="/admin/agents/new" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                + Register New Agent
                            </Link>
                        </div>
                    </div>

                    <div className="glass-panel rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 dark:bg-gray-700/50 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Agent Name</th>
                                    <th scope="col" className="px-6 py-3">TrustScore</th>
                                    <th scope="col" className="px-6 py-3">On-Chain Proof</th>
                                    <th scope="col" className="px-6 py-3">Last Active</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-transparent border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        MediChat AI
                                    </th>
                                    <td className="px-6 py-4 font-bold text-green-600">
                                        95
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-green-900/50 dark:text-green-300 border border-green-500/20 uppercase">
                                                    Solana
                                                </span>
                                                <span className="flex items-center gap-1 bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-purple-900/50 dark:text-purple-300 border border-purple-500/20 uppercase">
                                                    Privacy Shield V2
                                                </span>
                                            </div>
                                            <a href="https://explorer.solana.com/test-sig?cluster=devnet" target="_blank" className="text-[11px] text-blue-500 hover:underline">Verify Salted Commitment</a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        2 mins ago
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold text-green-500 uppercase">
                                        Active
                                    </td>
                                </tr>
                                <tr className="bg-transparent border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        ESCACS Risk Guard
                                    </th>
                                    <td className="px-6 py-4 font-bold text-blue-600">
                                        98
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-blue-900/50 dark:text-blue-300 border border-blue-500/20 uppercase">
                                                    zkSync L2
                                                </span>
                                            </div>
                                            <a href="https://sepolia.explorer.zksync.io/tx/0x..." target="_blank" className="text-[11px] text-blue-500 hover:underline">Verify ZK-Audit Trail</a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        15 mins ago
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold text-green-500 uppercase">
                                        Active
                                    </td>
                                </tr>
                                <tr className="bg-transparent border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Logic Auditor Beta
                                    </th>
                                    <td className="px-6 py-4 font-bold text-purple-600">
                                        91
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="flex items-center gap-1 bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-purple-900/50 dark:text-purple-300 border border-purple-500/20 uppercase">
                                                    Starknet
                                                </span>
                                            </div>
                                            <a href="https://sepolia.starkscan.co/tx/0x..." target="_blank" className="text-[11px] text-blue-500 hover:underline">Verify Cairo Logic</a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        1 hour ago
                                    </td>
                                    <td className="px-6 py-4 text-xs font-semibold text-green-500 uppercase">
                                        Active
                                    </td>
                                </tr>
                                <tr className="bg-transparent">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        PharmaCompliance Bot
                                    </th>
                                    <td className="px-6 py-4 font-bold text-yellow-600">
                                        60
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-0.5 rounded dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-500/20 uppercase">
                                                <svg className="w-3 h-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                Pending Anchor
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        1 day ago
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="mt-16">
                    <div className="glass-panel p-8 rounded-2xl border border-blue-500/10 bg-gradient-to-br from-blue-600/5 to-purple-600/5">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    Strategic Governance vs. Generic Execution
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    While basic platforms focus on the plumbing of where AI runs, our platform operates as a dedicated
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold"> Professional Governance Layer</span>.
                                    We don't just host bots; we audit their integrity and issue independent merit scores (Trust Scores)
                                    on a global immutable ledger.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Infrastructure Agnostic</h3>
                                        <p className="text-xs text-gray-500">Your AI lives anywhere; our governance proves it works everywhere.</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">Professional Merit</h3>
                                        <p className="text-xs text-gray-500">Publicly verifiable reputation scores without exposing private business logic.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-64 p-6 rounded-xl bg-blue-600/10 border border-blue-500/20 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Verified Governance</span>
                                <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Enterprise Standard</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
