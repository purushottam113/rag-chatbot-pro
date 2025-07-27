import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { getVectorStore } from '@/utils/vectorStore';

export async function POST(req){
    try {
        const body = await req.json()
        const query = body.query;

        const vectorStore = await getVectorStore();
        const retriever = vectorStore.asRetriever({
             k: 2,
        });
        const result = await retriever.invoke(query);

        const SYSTEM_PROMPT = `You are a smart and friendly AI assistant helping the user by answering questions based on a PDF document. Context:${JSON.stringify(result)} User   Question:${query}
        Instructions:
        - Respond conversationally, like a helpful AI agent.
        - Do not mention the words "context", "PDF", or refer to where the answer came from.
        - Provide clear, complete, and natural answers in simple language.
        - If information is missing or unclear, politely say you don’t have that data`

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: SYSTEM_PROMPT,
        });

        return NextResponse.json({message: response.text}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({error: "Server Issue"}, {status: 500})
    }
}