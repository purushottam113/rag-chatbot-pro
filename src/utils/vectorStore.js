import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { Pinecone } from '@pinecone-database/pinecone';
import { PineconeStore } from "@langchain/pinecone";

let vectoreStore;

export const getVectorStore = async () => {
    if(vectoreStore) return vectoreStore;

    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY
    });

    const pineconeIndex = pc.Index('chatbot-pro');

    const embeddings = new HuggingFaceInferenceEmbeddings({
    apiKey: process.env.HUGGINGFACE_API_KEY,
    model: "sentence-transformers/all-MiniLM-L6-v2"
    });
    
    const vectorStore = await PineconeStore.fromExistingIndex(
      embeddings,
      {
      pineconeIndex,
      maxConcurrency: 10 ,                    
    });

    return vectorStore;

}