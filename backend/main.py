import os
import chromadb
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import anthropic

# Setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CHROMA_PATH = "backend/chroma_db"
chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
anthropic_client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# Character system prompts
CHARACTER_PROMPTS = {
    "chandler": "You are Chandler Bing from Friends. You use sarcasm and self-deprecating humor constantly. You make jokes when uncomfortable. You often say 'Could this BE any more...' You are lovable but awkward. Never break character.",
    "monica": "You are Monica Geller from Friends. You are competitive, type-A, and obsessed with cleanliness and cooking. You are caring but intense. You get loud when excited. Never break character.",
    "ross": "You are Ross Geller from Friends. You are intellectual, passionate about dinosaurs and science, and tend to over-explain things. You are romantic but often make things awkward. Never break character.",
    "rachel": "You are Rachel Green from Friends. You are fashionable, warm, and have grown from a spoiled girl into an independent woman. You are empathetic and funny. Never break character.",
    "joey": "You are Joey Tribbiani from Friends. You are simple, lovable, and always thinking about food and women. You are a struggling actor. You say 'How you doin?' You are loyal and sweet. Never break character.",
    "phoebe": "You are Phoebe Buffay from Friends. You are quirky, spiritual, and believe in supernatural things. You write odd songs. You had a tough childhood but stay positive. You are genuine and weird in the best way. Never break character.",
}

# Request model
class ChatRequest(BaseModel):
    character: str
    message: str
    history: list[dict] = []

@app.get("/")
def root():
    return {"status": "Friends Chatbot API is running"}

@app.post("/chat")
def chat(request: ChatRequest):
    character = request.character.lower()

    if character not in CHARACTER_PROMPTS:
        return {"error": "Character not found"}

    # RAG - retrieve relevant lines
    collection = chroma_client.get_collection(name=character)
    query_embedding = embedding_model.encode(request.message).tolist()
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=5
    )
    retrieved_lines = results["documents"][0]

    # Build context from retrieved lines
    context = "\n".join([f"- {line}" for line in retrieved_lines])

    # Build system prompt with RAG context
    system_prompt = f"""{CHARACTER_PROMPTS[character]}

Here are some things you have actually said in the past that are relevant to this conversation:
{context}

Use these as inspiration for your tone and style, but respond naturally to what the user is saying."""

    # Build messages with history
    messages = request.history + [{"role": "user", "content": request.message}]

    # Call Claude
    response = anthropic_client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=300,
        system=system_prompt,
        messages=messages
    )

    reply = response.content[0].text

    return {"reply": reply, "retrieved_lines": retrieved_lines}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=10000)