import { useState, useEffect, useRef } from "react";
import "./App.css";

import chandlerImg from "./chandler.jpg";
import monicaImg from "./monica.jpg";
import rossImg from "./ross.jpg";
import rachelImg from "./rachel.jpg";
import joeyImg from "./joey.jpg";
import phoebeImg from "./phoebe.jpg";

const CHARACTERS = [
  {
    id: "chandler",
    name: "Chandler Bing",
    first: "Chandler",
    tagline: "Here for the sarcasm",
    photo: chandlerImg,
    dark: "#2E5A7A",
    mid: "#4A7FA5",
    light: "#D8EAF5",
    light2: "#EAF3FA",
    border: "#A8CCE8",
    greeting: "Oh good, you're here. I was starting to think I'd have to talk to myself. Again. Which, honestly, is my best relationship.",
    traits: ["Sarcasm is his love language", "Awkward but deeply caring", "Will make you laugh when you cry"],
  },
  {
    id: "monica",
    name: "Monica Geller",
    first: "Monica",
    tagline: "Here to fix everything",
    photo: monicaImg,
    dark: "#6A3A8A",
    mid: "#9B6BB5",
    light: "#EEE0F8",
    light2: "#F5EEFA",
    border: "#C8A8E0",
    greeting: "Sit down, I'll make you something. And you're going to tell me everything — don't leave anything out.",
    traits: ["Will feed you through anything", "Fiercely loyal", "Competitive but always on your side"],
  },
  {
    id: "ross",
    name: "Ross Geller",
    first: "Ross",
    tagline: "Here with fun facts",
    photo: rossImg,
    dark: "#6A1A28",
    mid: "#8B3A4A",
    light: "#F5DDE0",
    light2: "#FAE8EA",
    border: "#D8A0A8",
    greeting: "Hey! You know, studies show that just talking about your problems reduces cortisol by up to 23%. So… hi. I'm here.",
    traits: ["Overthinks everything (relatable)", "Genuinely wants to help", "Will cite a study for everything"],
  },
  {
    id: "rachel",
    name: "Rachel Green",
    first: "Rachel",
    tagline: "Here with good energy",
    photo: rachelImg,
    dark: "#2A6A3A",
    mid: "#5A9A6A",
    light: "#D8F0DF",
    light2: "#EAF5EC",
    border: "#98CCA8",
    greeting: "Oh my god, I'm so glad you're here. Okay, tell me everything. What's going on with you? Start from the beginning.",
    traits: ["Hypes you up unconditionally", "Fashion advice always available", "Grew through everything — so can you"],
  },
  {
    id: "joey",
    name: "Joey Tribbiani",
    first: "Joey",
    tagline: "Here with zero judgment",
    photo: joeyImg,
    dark: "#8A2A10",
    mid: "#C05A35",
    light: "#F8E4DC",
    light2: "#FAEDE8",
    border: "#E0A888",
    greeting: "Hey! How YOU doin'? No seriously — how are you actually doing? You can tell me. I've got nowhere to be.",
    traits: ["Zero judgment, always", "Will always offer food", "Simple wisdom that hits different"],
  },
  {
    id: "phoebe",
    name: "Phoebe Buffay",
    first: "Phoebe",
    tagline: "Here with good vibes",
    photo: phoebeImg,
    dark: "#8A6000",
    mid: "#D4A820",
    light: "#FDF0C0",
    light2: "#FDF5D8",
    border: "#E8CC70",
    greeting: "Oh! You came at the perfect time — I was just sending good energy into the universe for whoever needed it. That was for you!",
    traits: ["Pure good energy always", "Sees the best in everyone", "Her weird wisdom actually works"],
  },
];

// ── LANDING ──────────────────────────────────────────────
function Landing({ onSelect, histories }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="landing">
      <div className="landing-bg" />

      <svg className="nyc-skyline" viewBox="0 0 900 180" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="bldg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B7040" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#6A5030" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="skyFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDF6E3" stopOpacity="0" />
            <stop offset="88%" stopColor="#F5ECC8" stopOpacity="1" />
          </linearGradient>
        </defs>
        <ellipse cx="520" cy="180" rx="180" ry="55" fill="#E8A030" opacity="0.1" />
        <rect x="38" y="100" width="16" height="80" rx="2" fill="#8B7040" opacity="0.5" />
        <rect x="40" y="93" width="12" height="16" rx="2" fill="#8B7040" opacity="0.5" />
        <rect x="96" y="100" width="16" height="80" rx="2" fill="#8B7040" opacity="0.5" />
        <rect x="98" y="93" width="12" height="16" rx="2" fill="#8B7040" opacity="0.5" />
        <line x1="46" y1="98" x2="14" y2="162" stroke="#8B7040" strokeWidth="1" opacity="0.4" />
        <line x1="46" y1="98" x2="76" y2="162" stroke="#8B7040" strokeWidth="1" opacity="0.4" />
        <line x1="104" y1="98" x2="76" y2="162" stroke="#8B7040" strokeWidth="1" opacity="0.4" />
        <line x1="104" y1="98" x2="134" y2="162" stroke="#8B7040" strokeWidth="1" opacity="0.4" />
        <line x1="46" y1="98" x2="104" y2="98" stroke="#8B7040" strokeWidth="1.2" opacity="0.4" />
        <rect x="10" y="161" width="148" height="3" rx="1" fill="#8B7040" opacity="0.4" />
        <rect x="148" y="138" width="20" height="24" fill="url(#bldg)" />
        <rect x="170" y="130" width="16" height="32" fill="url(#bldg)" />
        <rect x="188" y="122" width="22" height="40" fill="url(#bldg)" />
        <rect x="212" y="132" width="14" height="30" fill="url(#bldg)" />
        <rect x="228" y="118" width="24" height="44" fill="url(#bldg)" />
        <rect x="254" y="76" width="34" height="88" fill="#8B7040" opacity="0.5" />
        <rect x="250" y="106" width="42" height="4" fill="#8B7040" opacity="0.5" />
        <rect x="246" y="120" width="50" height="4" fill="#8B7040" opacity="0.5" />
        <rect x="242" y="134" width="58" height="4" fill="#8B7040" opacity="0.5" />
        <rect x="267" y="52" width="8" height="26" fill="#8B7040" opacity="0.52" />
        <rect x="269" y="38" width="4" height="16" fill="#8B7040" opacity="0.5" />
        <line x1="271" y1="38" x2="271" y2="22" stroke="#8B7040" strokeWidth="2.5" opacity="0.48" />
        <rect x="258" y="86" width="4" height="4" fill="#D4A820" opacity="0.55" className="twinkle" />
        <rect x="272" y="86" width="4" height="4" fill="#D4A820" opacity="0.45" className="twinkle-d" />
        <rect x="258" y="98" width="4" height="4" fill="#D4A820" opacity="0.4" className="twinkle-s" />
        <rect x="298" y="128" width="18" height="36" fill="url(#bldg)" />
        <rect x="318" y="118" width="22" height="46" fill="url(#bldg)" />
        <rect x="342" y="108" width="20" height="56" fill="url(#bldg)" />
        <rect x="366" y="88" width="28" height="76" fill="#8B7040" opacity="0.48" />
        <rect x="362" y="108" width="36" height="4" fill="#8B7040" opacity="0.48" />
        <rect x="358" y="122" width="44" height="4" fill="#8B7040" opacity="0.48" />
        <path d="M366 88 Q380 64 394 88Z" fill="#8B7040" opacity="0.52" />
        <path d="M369 88 Q375 72 380 64 Q385 72 391 88" fill="none" stroke="#8B7040" strokeWidth="1.5" opacity="0.45" />
        <line x1="380" y1="64" x2="380" y2="46" stroke="#8B7040" strokeWidth="2.5" opacity="0.5" />
        <rect x="370" y="98" width="3" height="3" fill="#D4A820" opacity="0.45" className="twinkle" />
        <rect x="386" y="98" width="3" height="3" fill="#D4A820" opacity="0.45" className="twinkle-s" />
        <rect x="398" y="120" width="18" height="44" fill="url(#bldg)" />
        <rect x="418" y="108" width="24" height="56" fill="url(#bldg)" />
        <rect x="444" y="116" width="20" height="48" fill="url(#bldg)" />
        <rect x="466" y="100" width="22" height="64" fill="url(#bldg)" />
        <rect x="490" y="110" width="18" height="54" fill="url(#bldg)" />
        <rect x="510" y="96" width="22" height="68" fill="url(#bldg)" />
        <rect x="534" y="104" width="16" height="60" fill="url(#bldg)" />
        <polygon points="552,164 560,32 584,32 592,164" fill="#8B7040" opacity="0.55" />
        <line x1="572" y1="32" x2="572" y2="6" stroke="#8B7040" strokeWidth="3" opacity="0.55" />
        <rect x="556" y="52" width="3" height="3" fill="#D4A820" opacity="0.5" className="twinkle-d" />
        <rect x="572" y="48" width="3" height="3" fill="#D4A820" opacity="0.5" className="twinkle" />
        <rect x="580" y="52" width="3" height="3" fill="#D4A820" opacity="0.45" className="twinkle-s" />
        <rect x="596" y="112" width="20" height="52" fill="url(#bldg)" />
        <rect x="618" y="102" width="18" height="62" fill="url(#bldg)" />
        <rect x="638" y="118" width="22" height="46" fill="url(#bldg)" />
        <rect x="662" y="108" width="16" height="56" fill="url(#bldg)" />
        <rect x="680" y="120" width="20" height="44" fill="url(#bldg)" />
        <rect x="702" y="128" width="24" height="36" fill="url(#bldg)" />
        <rect x="728" y="116" width="16" height="48" fill="url(#bldg)" />
        <rect x="746" y="124" width="22" height="40" fill="url(#bldg)" />
        <rect x="770" y="132" width="18" height="32" fill="url(#bldg)" />
        <rect x="790" y="126" width="20" height="38" fill="url(#bldg)" />
        <rect x="812" y="134" width="16" height="30" fill="url(#bldg)" />
        <rect x="830" y="128" width="22" height="36" fill="url(#bldg)" />
        <rect x="854" y="138" width="18" height="26" fill="url(#bldg)" />
        <rect x="874" y="132" width="24" height="32" fill="url(#bldg)" />
        <rect x="0" y="162" width="900" height="3" fill="#8B7040" opacity="0.25" />
        <rect x="0" y="80" width="900" height="100" fill="url(#skyFade)" />
      </svg>

      <header className="landing-header">
        <div className="cp-badge"><span>New York City · Est. 1994</span></div>
        <h1 className="landing-title">friends</h1>
        <p className="landing-sub">Your friends are already here. Who do you want to talk to?</p>
      </header>

      <div className="character-grid">
        {CHARACTERS.map((char, i) => {
          const hasHistory = histories[char.id]?.length > 0;
          return (
            <div
              key={char.id}
              className={`char-card ${hovered === char.id ? "char-card--hovered" : ""}`}
              style={{ "--light": char.light, "--mid": char.mid, "--dark": char.dark, "--border": char.border, animationDelay: `${i * 0.07}s` }}
              onMouseEnter={() => setHovered(char.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(char)}
            >
              <div className="char-photo-wrap">
                <img src={char.photo} alt={char.name} className="char-photo" />
                <div className="char-photo-overlay" />
                {hasHistory && <div className="char-history-badge">Continue chat</div>}
              </div>
              <div className="char-card-body">
                <h3 className="char-card-name">{char.name}</h3>
                <p className="char-card-tagline">{char.tagline}</p>
                <button className="char-card-btn">
                  {hasHistory ? `Continue with ${char.first} →` : `Chat with ${char.first} →`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="landing-footer">ten seasons · six friends · one couch</footer>
    </div>
  );
}

// ── CHAT ─────────────────────────────────────────────────
function ChatWindow({ character, messages, onMessages, onBack }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setReady(true), 100);
    // Only add greeting if this is a fresh conversation
    if (messages.length === 0) {
      setTimeout(() => {
        onMessages([{ role: "assistant", content: character.greeting }]);
      }, 500);
    }
  }, [character.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    onMessages(newMessages);
    setInput("");
    setLoading(true);
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    try {
      const res = await fetch("https://friends-chatbot.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character: character.id, message: input, history: messages }),
      });
      const data = await res.json();
      onMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      onMessages([...newMessages, { role: "assistant", content: "Something went wrong. Try again!" }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  return (
    <div
      className={`chat-page ${ready ? "chat-page--ready" : ""}`}
      style={{ "--mid": character.mid, "--light": character.light, "--light2": character.light2, "--dark": character.dark, "--border": character.border }}
    >
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="chat-sidebar-photo">
          <img src={character.photo} alt={character.name} className="chat-sidebar-img" />
          <div className="chat-sidebar-vignette" />
          <div className="chat-sidebar-meta">
            <div className="chat-online">
              <span className="online-pulse" />
              Online · Central Perk
            </div>
            <h2 className="chat-char-name">{character.name}</h2>
            <p className="chat-char-tagline">{character.tagline}</p>
          </div>
        </div>
        <div className="chat-sidebar-info">
          <div className="chat-sidebar-divider" />
          <p className="chat-sidebar-quote">"{character.greeting}"</p>
          <div className="chat-sidebar-divider" />
          <div className="chat-traits">
            {character.traits.map((t, i) => (
              <div key={i} className="chat-trait">
                <span className="chat-trait-dot" />
                <span>{t}</span>
              </div>
            ))}
          </div>
          <button className="chat-back-btn" onClick={onBack}>← All friends</button>
        </div>
      </div>

      {/* Main chat */}
      <div className="chat-main">
        {/* Central Perk watermark */}
        <svg className="cp-watermark" viewBox="0 0 340 200" preserveAspectRatio="xMidYMid meet">
          <path d="M22 92 Q20 118 50 126 Q80 118 78 92Z" fill="#8B6A3A" />
          <ellipse cx="50" cy="92" rx="28" ry="9" fill="#A07840" />
          <ellipse cx="50" cy="92" rx="22" ry="6" fill="#5A3A18" />
          <path d="M78 102 Q95 100 95 112 Q95 124 78 122" stroke="#8B6A3A" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="128" rx="36" ry="8" fill="#8B6A3A" />
          <path d="M34 86 Q27 68 34 50 Q41 34 32 18" stroke="#8B6A3A" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-1" />
          <path d="M50 84 Q43 66 50 48 Q57 32 48 16" stroke="#8B6A3A" strokeWidth="2.5" fill="none" strokeLinecap="round" className="steam-2" />
          <path d="M66 86 Q59 68 66 50 Q73 34 64 18" stroke="#8B6A3A" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-3" />
          <path d="M262 92 Q260 118 290 126 Q320 118 318 92Z" fill="#8B6A3A" />
          <ellipse cx="290" cy="92" rx="28" ry="9" fill="#A07840" />
          <ellipse cx="290" cy="92" rx="22" ry="6" fill="#5A3A18" />
          <path d="M262 102 Q245 100 245 112 Q245 124 262 122" stroke="#8B6A3A" strokeWidth="7" fill="none" strokeLinecap="round" />
          <ellipse cx="290" cy="128" rx="36" ry="8" fill="#8B6A3A" />
          <path d="M274 86 Q267 68 274 50 Q281 34 272 18" stroke="#8B6A3A" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-2" />
          <path d="M290 84 Q283 66 290 48 Q297 32 288 16" stroke="#8B6A3A" strokeWidth="2.5" fill="none" strokeLinecap="round" className="steam-1" />
          <path d="M306 86 Q299 68 306 50 Q313 34 304 18" stroke="#8B6A3A" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-3" />
          <path d="M72 108 Q170 44 268 108 L268 132 Q170 72 72 132Z" fill="#C8392A" />
          <text x="170" y="104" textAnchor="middle" fontFamily="Georgia,serif" fontSize="28" fontWeight="900" stroke="#5A0808" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke" fill="#FFFFFF" letterSpacing="2">CENTRAL</text>
          <rect x="82" y="124" width="176" height="52" rx="26" fill="#1A5438" />
          <rect x="85" y="127" width="170" height="46" rx="23" fill="none" stroke="#2E7A58" strokeWidth="2" />
          <circle cx="100" cy="150" r="6" fill="#2E7A58" />
          <circle cx="240" cy="150" r="6" fill="#2E7A58" />
          <text x="170" y="157" textAnchor="middle" fontFamily="Georgia,serif" fontSize="26" fontWeight="900" stroke="#041E10" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke" fill="#FFFFFF" letterSpacing="6">PERK</text>
        </svg>

        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-avatar">
            <img src={character.photo} alt={character.name} className="chat-header-img" />
            <span className="online-dot" />
          </div>
          <div>
            <div className="chat-header-name">{character.name}</div>
            <div className="chat-header-status">typing from Central Perk…</div>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          <div className="chat-session-tag">☕ You pulled up a chair at Central Perk</div>
          {messages.map((msg, i) => (
            <div key={i} className={`msg-row msg-row--${msg.role}`}>
              {msg.role === "assistant" && (
                <div className="msg-avatar">
                  <img src={character.photo} alt={character.name} className="msg-avatar-img" />
                </div>
              )}
              <div className="msg-col">
                {msg.role === "assistant" && <span className="msg-sender">{character.first}</span>}
                <div className={`msg-bubble msg-bubble--${msg.role}`}>{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="msg-row msg-row--assistant">
              <div className="msg-avatar">
                <img src={character.photo} alt={character.name} className="msg-avatar-img" />
              </div>
              <div className="msg-col">
                <span className="msg-sender">{character.first}</span>
                <div className="msg-bubble msg-bubble--assistant msg-typing">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <div className="chat-input-box">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKey}
              placeholder={`Say something to ${character.first}…`}
              rows={1}
              className="chat-textarea"
            />
            <button
              className={`chat-send-btn ${input.trim() ? "chat-send-btn--active" : ""}`}
              onClick={sendMessage}
              disabled={!input.trim() || loading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="chat-hint">Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT — history stored here, keyed by character id ─
export default function App() {
  const [selected, setSelected] = useState(null);
  // histories: { chandler: [...], monica: [...], ... }
  const [histories, setHistories] = useState(
    Object.fromEntries(CHARACTERS.map(c => [c.id, []]))
  );

  const updateHistory = (charId, msgs) => {
    setHistories(prev => ({ ...prev, [charId]: msgs }));
  };

  return selected ? (
    <ChatWindow
      character={selected}
      messages={histories[selected.id]}
      onMessages={(msgs) => updateHistory(selected.id, msgs)}
      onBack={() => setSelected(null)}
    />
  ) : (
    <Landing onSelect={setSelected} histories={histories} />
  );
}