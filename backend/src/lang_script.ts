import { OpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RetrievalQAChain } from 'langchain/chains';

import dotenv from 'dotenv';
dotenv.config();

export const process_doc = async (filename: string | undefined, question: string) => {
    const model = new OpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        //openAIApiKey: "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",
    });

    /*const loader = new PDFLoader(`process.env.UPLOADS_DIRECTORY/${filename}`, {
        splitPages: false
    })*/
    
    const loader = new PDFLoader(`D:/ExamenDispositivosMoviles/Examen/backend/uploads/${filename}`, {
        splitPages: false
    })
    const doc = await loader.load()
    const vectorStore = await MemoryVectorStore.fromDocuments(doc, new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        //openAIApiKey: "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",
    }))
    const vectorStoreRetriever = vectorStore.asRetriever()
    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);
    return await chain.call({
        query: question,
    })
}