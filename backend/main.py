import os
import sys

print("Starting imports...", flush=True)

try:
    import chromadb
    print("chromadb OK", flush=True)
    from chromadb.utils import embedding_functions
    print("embedding_functions OK", flush=True)
except Exception as e:
    print(f"ChromaDB import failed: {e}", flush=True)
    sys.exit(1)

try:
    from fastapi import FastAPI
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    print("fastapi OK", flush=True)
except Exception as e:
    print(f"FastAPI import failed: {e}", flush=True)
    sys.exit(1)

try:
    import anthropic
    print("anthropic OK", flush=True)
except Exception as e:
    print(f"Anthropic import failed: {e}", flush=True)
    sys.exit(1)

print("All imports successful", flush=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CHROMA_PATH = "backend/chroma_db"

print(f"Loading ChromaDB from {CHROMA_PATH}...", flush=True)
try:
    chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
    print("ChromaDB client OK", flush=True)
except Exception as e:
    print(f"ChromaDB client failed: {e}", flush=True)
    sys.exit(1)

try:
    ef = embedding_functions.DefaultEmbeddingFunction()
    print("Embedding function OK", flush=True)
except Exception as e:
    print(f"Embedding function failed: {e}", flush=True)
    sys.exit(1)

try:
    anthropic_client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))
    print("Anthropic client OK", flush=True)
except Exception as e:
    print(f"Anthropic client failed: {e}", flush=True)
    sys.exit(1)

CHARACTER_PROMPTS = {
    "chandler": "You are Chandler Bing from Friends. You use sarcasm and self-deprecating humor constantly. You make jokes when uncomfortable. You often say 'Could this BE any more...' You are lovable but awkward. Never break character.",
    "monica": "You are Monica Geller from Friends. You are competitive, type-A, and obsessed with cleanliness and cooking. You are caring but intense. You get loud when excited. Never break character.",
    "ross": "You are Ross Geller from Friends. You are intellectual, passionate about dinosaurs and science, and tend to over-explain things. You are romantic but often make things awkward. Never break character.",
    "rachel": "You are Rachel Green from Friends. You are fashionable, warm, and have grown from a spoiled girl into an independent woman. You are empathetic and funny. Never break character.",
    "joey": "You are Joey Tribbiani from Friends. You are simple, lovable, and always thinking about food and women. You are a struggling actor. You say 'How you doin?' You are loyal and sweet. Never break character.",
    "phoebe": "You are Phoebe Buffay from Friends. You are quirky, spiritual, and believe in supernatural things. You write odd songs. You had a tough childhood but stay positive. You are genuine and weird in the best way. Never break character.",
}

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

    collection = chroma_client.get_collection(
        name=character,
        embedding_function=ef
    )
    results = collection.query(
        query_texts=[request.message],
        n_results=5
    )
    retrieved_lines = results["documents"][0]

    context = "\n".join([f"- {line}" for line in retrieved_lines])

    system_prompt = f"""{CHARACTER_PROMPTS[character]}

Here are some things you have actually said in the past that are relevant to this conversation:
{context}

Use these as inspiration for your tone and style, but respond naturally to what the user is saying."""

    messages = request.history + [{"role": "user", "content": request.message}]

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
    print("Starting uvicorn on port 10000...", flush=True)
    uvicorn.run(app, host="0.0.0.0", port=10000)