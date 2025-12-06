import { describe, it, expect } from 'vitest';
import { TrustScoreService } from '../trustscore.service';
import { Agent } from '../../agents/agent.types';

describe('TrustScoreService', () => {
    const service = new TrustScoreService();

    it('should calculate correct score for verified agent with GDPR', () => {
        const agent = {
            is_verified: true,
            compliance_tags: ['GDPR']
        } as Agent;

        expect(service.calculateScore(agent)).toBe(80); // 50 + 30
    });

    it('should calculate correct score for unverified agent with no tags', () => {
        const agent = {
            is_verified: false,
            compliance_tags: []
        } as Agent;

        expect(service.calculateScore(agent)).toBe(0);
    });

    it('should cap score at 100', () => {
        const agent = {
            is_verified: true,
            compliance_tags: ['GDPR', 'HIPAA', 'MDR'] // 50 + 30 + 20 + 10 = 110
        } as Agent;

        expect(service.calculateScore(agent)).toBe(100);
    });
});
