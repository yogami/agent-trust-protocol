'use client';

import React, { useEffect, useState } from 'react';
import { Agent } from '@/lib/agents/agent.types';

interface AgentCardProps {
    agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => {
        fetch(`/api/trustscore/${agent.id}`)
            .then(res => res.json())
            .then(data => setScore(data.score))
            .catch(err => console.error('Failed to fetch score', err));
    }, [agent.id]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 dark:text-green-400';
        if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="glass-card rounded-xl p-6 flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                    {agent.name}
                </h3>
                {agent.is_verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                    </span>
                )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-sm leading-relaxed">
                {agent.description}
            </p>

            <div className="space-y-3">
                {agent.compliance_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {agent.compliance_tags.map((tag) => (
                            <span key={tag} className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="pt-4 mt-auto border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm">
                    <span className="text-gray-500 dark:text-gray-400">TrustScore</span>
                    <span className={`font-bold text-lg ${score !== null ? getScoreColor(score) : 'text-gray-400'}`}>
                        {score !== null ? score : 'Loading...'}
                    </span>
                </div>
            </div>
        </div>
    );
}
