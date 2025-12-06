import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-24 pb-16 px-4">
            <Navbar />

            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-16 text-lg">Choose the plan that fits your growth stage.</p>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free Tier */}
                    <div className="p-8 rounded-2xl glass-card text-left relative overflow-hidden">
                        <h3 className="text-xl font-bold mb-2">Explorer</h3>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-bold">$0</span>
                            <span className="text-gray-500 ml-2">/mo</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">Perfect for browsing the directory.</p>
                        <ul className="space-y-4 mb-8 text-sm">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Access Directory</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> View TrustScores</li>
                            <li className="flex items-center text-gray-400"><span className="mr-2">×</span> API Access</li>
                        </ul>
                        <Button variant="outline" className="w-full">Get Started</Button>
                    </div>

                    {/* Pro Tier */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl scale-105 relative z-10 text-left">
                        <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                        <h3 className="text-xl font-bold mb-2">Startup</h3>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-bold">$99</span>
                            <span className="text-blue-100 ml-2">/mo</span>
                        </div>
                        <p className="text-blue-100 mb-8">For integrating TrustScore into your app.</p>
                        <ul className="space-y-4 mb-8 text-sm">
                            <li className="flex items-center"><span className="text-blue-200 mr-2">✓</span> Unlimited Directory Access</li>
                            <li className="flex items-center"><span className="text-blue-200 mr-2">✓</span> API Access (10k req/mo)</li>
                            <li className="flex items-center"><span className="text-blue-200 mr-2">✓</span> Verified Badge for 1 Agent</li>
                        </ul>
                        <Button className="w-full bg-white text-blue-700 hover:bg-blue-50">Start Free Trial</Button>
                    </div>

                    {/* Enterprise Tier */}
                    <div className="p-8 rounded-2xl glass-card text-left">
                        <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-bold">Custom</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">For large scale deployments and hospitals.</p>
                        <ul className="space-y-4 mb-8 text-sm">
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Full API Access</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Custom Audit Logs</li>
                            <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> SLA & Support</li>
                        </ul>
                        <Button variant="outline" className="w-full">Contact Sales</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
