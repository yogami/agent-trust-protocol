import { NextResponse } from 'next/server';
import { SupabaseAgentRepository } from '@/lib/agents/agent.repository.supabase';
import { CreateAgentDTO } from '@/lib/agents/agent.types';

const agentRepository = new SupabaseAgentRepository();

export async function GET() {
    const agents = await agentRepository.getAgents();
    return NextResponse.json(agents);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 });
        }

        const dto: CreateAgentDTO = {
            name: body.name,
            description: body.description,
            website_url: body.website_url,
            compliance_tags: body.compliance_tags || [],
            creator_id: null // Mock auth for now
        };

        const newAgent = await agentRepository.createAgent(dto);
        return NextResponse.json(newAgent, { status: 201 });
    } catch (error: any) {
        console.error('Failed to create agent:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
