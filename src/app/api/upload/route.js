import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function POST(req){
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
          return NextResponse.json({ message: "No valid file provided" }, { status: 400 });
        }

        const uploadsDir = path.join(process.cwd(), "uploads");
        await mkdir(uploadsDir, { recursive: true });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadsDir, file.name);
        await writeFile(filePath, buffer);

        const loader = new PDFLoader(filePath);
        const docs = await loader.load();

        const combinedText = docs.map(doc => doc.pageContent).join("\n");

        const textSplitter = new RecursiveCharacterTextSplitter({
                chunkSize: 100,
                chunkOverlap: 0,
            });

        const texts = await textSplitter.splitText(combinedText);

        return NextResponse.json({message: texts})

    } catch (error) {
        NextResponse.json({error: "Server Issue"}, {status: 500})
    }
}