'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/ui/Navbar';
import { useAuth } from '@/lib/auth/auth.context';

export default function BillingPage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error(data.error || 'Failed to create checkout session');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to start checkout. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-16 px-4">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">API Access Pricing</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Get programmatic access to TrustScores for your applications
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Free Tier */}
                    <div className="glass-panel rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-2">Free</h2>
                        <div className="text-4xl font-bold mb-6">
                            $0<span className="text-lg font-normal text-gray-500">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Browse agent directory
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                View TrustScores
                            </li>
                            <li className="flex items-center gap-2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                No API access
                            </li>
                        </ul>
                        <button
                            disabled
                            className="w-full py-3 px-4 bg-gray-200 text-gray-600 font-medium rounded-lg cursor-not-allowed"
                        >
                            Current Plan
                        </button>
                    </div>

                    {/* Pro Tier */}
                    <div className="glass-panel rounded-2xl p-8 border-2 border-blue-500 relative">
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                                Recommended
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Pro API</h2>
                        <div className="text-4xl font-bold mb-6">
                            $9<span className="text-lg font-normal text-gray-500">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Everything in Free
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <strong>API Key</strong> for TrustScore API
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                10,000 requests/month
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                Webhook notifications
                            </li>
                        </ul>
                        <button
                            onClick={handleSubscribe}
                            disabled={isLoading || authLoading}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Loading...' : 'Subscribe Now'}
                        </button>
                    </div>
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                    <p>Secure payment powered by Stripe. Cancel anytime.</p>
                </div>
            </div>
        </main>
    );
}
