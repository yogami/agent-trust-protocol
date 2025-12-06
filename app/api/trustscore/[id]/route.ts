import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    // Placeholder calculation
    const score = {
        agentId: id,
        score: 80,
        breakdown: {
            verified: true,
            uptime: '99.9%',
            compliance: ['GDPR'],
            security: 'High'
        }
    };
    return NextResponse.json(score);
}
