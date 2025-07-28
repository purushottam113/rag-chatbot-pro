import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { getVectorStore } from "@/utils/vectorStore";
import { Document } from "@langchain/core/documents";

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

        const DocumentedTexts = [
            new Document({
            pageContent: texts,
            metadata: { source: "file.pdf" } // Optional
            }),
        ];

        const vectorStore = await getVectorStore();
        await vectorStore.addDocuments(DocumentedTexts);

        return NextResponse.json({message: "File Upload Successfully"})

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({error: "Server Issue"}, {status: 500})
    }
}