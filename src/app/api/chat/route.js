import { NextResponse } from 'next/server';

export async function POST(req){
    try {
    const body = await req.json()
    const query = body.query;
        
    } catch (error) {
        NextResponse.json({error: "Server Issue"}, {status: 500})
    }
}