import { Agent, CreateAgentDTO } from './agent.types';
import { AgentRepository } from './agent.repository';
import { supabase } from '@/lib/supabase';

export class SupabaseAgentRepository implements AgentRepository {
    async createAgent(data: CreateAgentDTO): Promise<Agent> {
        // Since we don't have real valid UUIDs for creator_id from mock auth, we will set it to null 
        // or a specific test UUID if we were fully authenticated. 
        // For MVP demo, we'll try to insert. If creator_id (foreign key) fails, we might need to handle it.
        // Assuming database allows nullable creator_id as defined in schema.

        const { data: result, error } = await supabase
            .from('agents')
            .insert({
                name: data.name,
                description: data.description,
                website_url: data.website_url,
                compliance_tags: data.compliance_tags,
                is_verified: false
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating agent:', error);
            throw new Error(error.message);
        }

        return result as Agent;
    }

    async getAgents(): Promise<Agent[]> {
        const { data, error } = await supabase
            .from('agents')
            .select('*');

        if (error) {
            console.error('Error fetching agents:', error);
            throw new Error(error.message);
        }

        return data as Agent[];
    }

    async getAgentById(id: string): Promise<Agent | null> {
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data as Agent;
    }
}
