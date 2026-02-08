import { NextResponse } from 'next/server';
import { MaturityService } from '@/lib/atf/maturity.service';
import { SegmentationService } from '@/lib/atf/segmentation.service';
import { IncidentResponseService } from '@/lib/atf/incident.service';
import { AgentMaturity } from '@/lib/atf/maturity.types';

/**
 * ATF API — Agent Maturity & Promotion Gates
 *
 * POST /api/atf/evaluate — Evaluate agent promotion readiness
 * POST /api/atf/promote  — Execute promotion (via query param ?action=promote)
 * POST /api/atf/access    — Evaluate segmentation access request (via query param ?action=access)
 * POST /api/atf/incident  — Record an incident (via query param ?action=incident)
 * GET  /api/atf            — ATF capability manifest
 */

const maturityService = new MaturityService();
const segmentationService = new SegmentationService();
const incidentService = new IncidentResponseService();

export async function GET() {
    return NextResponse.json({
        framework: 'Agentic Trust Framework (ATF)',
        spec: 'https://github.com/massivescale-ai/agentic-trust-framework',
        implementedBy: 'Berlin AI Labs — agent-trust-protocol',
        version: '1.0.0',
        elements: {
            identity: { status: 'implemented', service: 'agent-trust-verifier' },
            behavior: { status: 'implemented', service: 'veracity-core (PoE-A2A)' },
            dataGovernance: { status: 'implemented', service: 'convoguard-ai' },
            segmentation: { status: 'implemented', service: 'agent-trust-protocol/atf' },
            incidentResponse: { status: 'implemented', service: 'agent-pentest + agent-trust-protocol/atf' },
        },
        maturityModel: {
            levels: ['intern', 'junior', 'senior', 'principal'],
            promotionGates: ['performance', 'security', 'businessValue', 'incidentRecord', 'governanceSignoff'],
        },
    });
}

export async function POST(request: Request) {
    const url = new URL(request.url);
    const action = url.searchParams.get('action') ?? 'evaluate';

    try {
        const body = await request.json();

        switch (action) {
            case 'evaluate': {
                const maturity: AgentMaturity = body.maturity;
                const gates = maturityService.evaluatePromotion(
                    maturity,
                    body.pentestGrade,
                    body.adversarialPassed,
                    body.roiCalculated,
                    body.securityApproval,
                    body.riskCommitteeApproval,
                    body.businessOwnerApproval,
                );
                return NextResponse.json({
                    agentId: maturity.agentId,
                    currentLevel: maturity.currentLevel,
                    nextLevel: maturityService.getNextLevel(maturity.currentLevel),
                    eligible: maturityService.isPromotionEligible(gates),
                    gates,
                });
            }

            case 'promote': {
                const maturity: AgentMaturity = body.maturity;
                const gates = maturityService.evaluatePromotion(
                    maturity,
                    body.pentestGrade,
                    body.adversarialPassed,
                    body.roiCalculated,
                    body.securityApproval,
                    body.riskCommitteeApproval,
                    body.businessOwnerApproval,
                );
                if (!maturityService.isPromotionEligible(gates)) {
                    return NextResponse.json({ error: 'Promotion gates not met', gates }, { status: 403 });
                }
                const promoted = maturityService.promote(maturity, gates, body.approvedBy ?? 'system');
                return NextResponse.json({ promoted, gates });
            }

            case 'access': {
                const decision = segmentationService.evaluateAccess(body);
                return NextResponse.json(decision, { status: decision.allowed ? 200 : 403 });
            }

            case 'incident': {
                incidentService.initBreaker(body.agentId, body.agentLevel ?? 'junior');
                const incident = incidentService.recordIncident(
                    body.agentId,
                    body.severity,
                    body.type,
                    body.description,
                );
                const canExecute = incidentService.canExecute(body.agentId);
                return NextResponse.json({ incident, canExecute });
            }

            default:
                return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
        }
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
