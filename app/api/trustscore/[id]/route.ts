import { NextResponse } from 'next/server';
import { TrustScoreService } from '@/lib/trustscore/trustscore.service';
import { MockAgentRepository } from '@/lib/agents/agent.repository.mock';

const trustScoreService = new TrustScoreService();
const agentRepository = new MockAgentRepository();

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    const agent = await agentRepository.getAgentById(id);

    if (!agent) {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    const score = trustScoreService.calculateScore(agent);

    return NextResponse.json({
        id,
        score,
        breakdown: {
            verified: agent.is_verified,
            compliance: agent.compliance_tags
        }
    });
}
