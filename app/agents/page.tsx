import { AgentService } from '@/lib/agents/agent.service';
import { SupabaseAgentRepository } from '@/lib/agents/agent.repository.supabase';
import { AgentCard } from '@/components/ui/AgentCard';
import { Navbar } from '@/components/ui/Navbar';

// Initialize service with real Supabase repo
const agentService = new AgentService(new SupabaseAgentRepository());

export default async function AgentsPage() {
    const agents = await agentService.getAgents();

    return (
        <main className="min-h-screen pt-20 pb-16 px-4 md:px-8">
            <Navbar />

            <div className="max-w-7xl mx-auto mt-12">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400">
                        Agent Directory
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Discover verified and compliant AI agents for the Berlin digital health ecosystem.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent) => (
                        <AgentCard key={agent.id} agent={agent} />
                    ))}
                </div>
            </div>
        </main>
    );
}
