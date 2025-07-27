# RAG Chatbot Assignment

This is a simple chatbot project I built using the **RAG (Retrieval-Augmented Generation)** approach. The goal of this project is to answer user queries based on the content of a PDF file they upload.

Once the PDF is uploaded, the app extracts the text, stores its embeddings in **Pinecone**, and then uses an LLM (**Gemini** ) to give smart and relevant answers based on the content of that PDF.

---

## 🔧 Tech Used

- **Next.js App Router** (frontend + backend)
- **Tailwind CSS** for styling
- **LangChain** (for loading PDF and splitting it into chunks)
- **Hugging Face embeddings**
- **Pinecone** (for storing and retrieving vector embeddings)
- **Gemini** for generating responses

---

## 💻 How It Works

1. User uploads a PDF.
2. The PDF is parsed using LangChain's `PDFLoader`.
3. Text is split into chunks and converted into embeddings using Hugging Face.
4. These embeddings are stored in Pinecone.
5. When a user types a question, relevant chunks are fetched from Pinecone.
6. These chunks + the user's question are sent to the LLM (Gemini).
7. The LLM replies with an answer based only on the context of the uploaded PDF.

---

## 🗂️ Folder Structure

/app
/api
└── upload (PDF upload + processing)
└── chat (Handles questions to LLM)
/components
└── Chatbot.js
└── fileupload.js
└── Navbar.js
/utils
└── vectorStore.js (PDF text extraction)

---

## 📦 How to Run

npm install


Add a .env.local file in the root folder:

PINECONE_API_KEY=your_key
PINECONE_ENVIRONMENT=your_env
PINECONE_INDEX=your_index_name

HUGGINGFACE_API_KEY=your_token
GOOGLE_API_KEY=your_gemini_key

Start the dev server:
npm run dev