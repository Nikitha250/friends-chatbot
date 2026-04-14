# Friends Chatbot 🛋️☕

An AI-powered chatbot that lets you have real conversations with characters from the TV show *Friends* — Chandler, Monica, Ross, Rachel, Joey, and Phoebe.

Built with a full RAG (Retrieval-Augmented Generation) pipeline: every response is grounded in actual dialogue from the show, not just a generic persona prompt.

**🌐 Live demo:** [friends-chatbot-ecru.vercel.app](https://friends-chatbot-ecru.vercel.app)

---

## What It Does

Pick a character → they greet you → chat in their voice, grounded in 47,000+ real lines of Friends dialogue. Each character has their own color-themed world. Chat histories persist across character switches within a session.

---

## How It Works

### RAG Pipeline

1. **Ingest** — 47,876 lines of Friends transcripts are parsed by character and embedded using ChromaDB's default embedding function (`all-MiniLM-L6-v2` via ONNX)
2. **Store** — Embeddings are stored in ChromaDB with one collection per character
3. **Retrieve** — When a user sends a message, the top 5 most semantically similar lines from that character's collection are retrieved
4. **Generate** — Retrieved lines + a character system prompt are passed to Claude (`claude-sonnet-4-20250514`), which generates a response grounded in how that character actually talks

### Why RAG over plain prompting?

A plain system prompt like "you are Chandler, be sarcastic" gives a generic impression. RAG retrieves *actual Chandler lines* relevant to what the user said, so the model responds with authentic speech patterns, references, and humor from the show.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React |
| Backend | FastAPI (Python) |
| Vector DB | ChromaDB |
| Embeddings | `all-MiniLM-L6-v2` via ONNX (ChromaDB default) |
| Generation | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| Data | Friends TV show transcripts (47,876 lines) |
| Backend Deploy | Render |
| Frontend Deploy | Vercel |

---

## Project Structure

```
friends-chatbot/
├── backend/
│   ├── main.py          # FastAPI server, RAG retrieval, Claude API
│   ├── ingest.py        # Transcript parsing, embedding, ChromaDB ingestion
│   └── chroma_db/       # Persisted vector collections
├── frontend/
│   └── src/
│       ├── App.js       # React app — landing + chat UI
│       └── App.css      # Character-themed styling
├── data/
│   └── Friends_Transcript.txt
└── requirements.txt
```

---

## Running Locally

### 1. Clone and set up backend

```bash
git clone https://github.com/Nikitha250/friends-chatbot.git
cd friends-chatbot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Set your Anthropic API key

```bash
export ANTHROPIC_API_KEY="your-key-here"
```

### 3. Start the backend

ChromaDB collections are already committed to the repo — no need to re-run ingestion.

```bash
python backend/main.py
```

### 4. Start the frontend

```bash
cd frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Architecture

```
User message
     │
     ▼
Embed with all-MiniLM-L6-v2 (ONNX)
     │
     ▼
ChromaDB semantic search (character-specific collection)
     │
     ▼
Top 5 retrieved dialogue lines
     │
     ▼
Claude API (system prompt + retrieved context + conversation history)
     │
     ▼
Character-grounded response
```

---

## Characters

| Character | Color | Vibe |
|---|---|---|
| Chandler Bing | Steel Blue | Sarcasm as a love language |
| Monica Geller | Soft Purple | Will fix everything (and feed you) |
| Ross Geller | Burgundy | Fun facts, genuinely trying |
| Rachel Green | Sage Green | Hypes you up unconditionally |
| Joey Tribbiani | Terracotta | Zero judgment, always |
| Phoebe Buffay | Sunflower Yellow | Pure good energy |

---

## What's Next

- [ ] Emotion/intent detection to shift character tone
- [ ] Multi-turn memory across sessions (persistent)
- [ ] Mobile responsive layout
- [ ] Add more characters (Janice, Gunther?)