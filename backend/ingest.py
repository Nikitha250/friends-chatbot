import os
import re
import chromadb
from sentence_transformers import SentenceTransformer

# Config
TRANSCRIPT_PATH = "data/Friends_Transcript.txt"
CHROMA_PATH = "backend/chroma_db"
CHARACTERS = ["Chandler", "Monica", "Ross", "Rachel", "Joey", "Phoebe"]

# Load transcript
with open(TRANSCRIPT_PATH, "r", encoding="utf-8") as f:
    lines = f.readlines()

# Parse lines into (character, dialogue) pairs
dialogue_by_character = {c: [] for c in CHARACTERS}

for line in lines:
    line = line.strip()
    if not line:
        continue
    # Match lines like "Chandler: some dialogue"
    match = re.match(r"^([A-Za-z]+):\s+(.+)$", line)
    if match:
        character = match.group(1).capitalize()
        dialogue = match.group(2).strip()
        if character in dialogue_by_character:
            dialogue_by_character[character].append(dialogue)

# Print stats
for char, lines in dialogue_by_character.items():
    print(f"{char}: {len(lines)} lines")

# Load embedding model
print("\nLoading embedding model...")
model = SentenceTransformer("all-MiniLM-L6-v2")

# Set up ChromaDB
client = chromadb.PersistentClient(path=CHROMA_PATH)

# Create one collection per character
for character, dialogues in dialogue_by_character.items():
    if not dialogues:
        continue

    print(f"Embedding {character}...")

    # Delete existing collection if re-running
    try:
        client.delete_collection(name=character.lower())
    except:
        pass

    collection = client.create_collection(name=character.lower())

    # Embed in batches of 100
    batch_size = 100
    for i in range(0, len(dialogues), batch_size):
        batch = dialogues[i:i+batch_size]
        embeddings = model.encode(batch).tolist()
        ids = [f"{character.lower()}_{i+j}" for j in range(len(batch))]
        collection.add(
            documents=batch,
            embeddings=embeddings,
            ids=ids
        )

    print(f"  Stored {len(dialogues)} lines for {character}")

print("\nDone! All characters embedded and stored in ChromaDB.")