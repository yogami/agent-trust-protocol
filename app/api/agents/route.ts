import { NextResponse } from 'next/server';

export async function GET() {
    // Placeholder for fetching agents from Supabase
    return NextResponse.json({ agents: [] });
}

export async function POST(request: Request) {
    // Placeholder for adding agents
    return NextResponse.json({ success: true }, { status: 201 });
}
