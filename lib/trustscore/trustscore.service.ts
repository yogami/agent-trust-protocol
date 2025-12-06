import { Agent } from '../agents/agent.types';

export class TrustScoreService {
    calculateScore(agent: Agent): number {
        let score = 0;

        // Base score
        // score += 10; 

        // Verified Creator
        if (agent.is_verified) {
            score += 50;
        }

        // Compliance Tags
        if (agent.compliance_tags) {
            agent.compliance_tags.forEach(tag => {
                if (tag.toUpperCase() === 'GDPR') {
                    score += 30;
                } else if (tag.toUpperCase() === 'HIPAA') {
                    score += 20; // Bonus for HIPAA
                } else {
                    score += 10;
                }
            });
        }

        // Cap at 100
        return Math.min(score, 100);
    }
}
