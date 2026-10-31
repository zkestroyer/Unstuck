import os

CARDS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'cards')
os.makedirs(CARDS_DIR, exist_ok=True)

SVGS = {
    "card_deleting.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <circle cx="40" cy="40" r="38" fill="#FFF3E0" stroke="#FFB74D" stroke-width="2"/>
  <!-- Trash can -->
  <path d="M28 32 L32 58 C32.5 60 34 61 36 61 L44 61 C46 61 47.5 60 48 58 L52 32 Z" fill="#EF6C00"/>
  <rect x="25" y="27" width="30" height="5" rx="2" fill="#E65100"/>
  <rect x="35" y="23" width="10" height="4" rx="2" fill="#E65100"/>
  <!-- Undo circular arrow -->
  <path d="M46 38 C52 40 55 46 52 52 C50 56 44 58 38 56" fill="none" stroke="#2E7D32" stroke-width="3.5" stroke-linecap="round"/>
  <polygon points="43,34 49,38 43,42" fill="#2E7D32"/>
</svg>""",

    "card_navigation.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <circle cx="40" cy="40" r="38" fill="#E1F5FE" stroke="#4FC3F7" stroke-width="2"/>
  <!-- Folded Map -->
  <polygon points="20,28 33,23 47,28 60,23 60,54 47,59 33,54 20,59" fill="#B3E5FC" stroke="#0288D1" stroke-width="2"/>
  <line x1="33" y1="23" x2="33" y2="54" stroke="#0288D1" stroke-width="2"/>
  <line x1="47" y1="28" x2="47" y2="59" stroke="#0288D1" stroke-width="2"/>
  <!-- Map Pin -->
  <path d="M40 26 C36 26 33 29 33 33 C33 39 40 48 40 48 C40 48 47 39 47 33 C47 29 44 26 40 26 Z" fill="#E53935"/>
  <circle cx="40" cy="33" r="3.5" fill="#FFFFFF"/>
</svg>""",

    "card_sending_picture.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <circle cx="40" cy="40" r="38" fill="#F3E5F5" stroke="#BA68C8" stroke-width="2"/>
  <!-- Photo frame -->
  <rect x="22" y="24" width="34" height="28" rx="4" fill="#FFFFFF" stroke="#7B1FA2" stroke-width="2"/>
  <circle cx="30" cy="32" r="3.5" fill="#FFB300"/>
  <polygon points="24,48 34,36 42,44 48,38 54,48" fill="#4CAF50"/>
  <!-- Paperclip attachment badge -->
  <circle cx="56" cy="48" r="13" fill="#6A1B9A"/>
  <path d="M53 52 L59 46 C60.5 44.5 60.5 42 59 40.5 C57.5 39 55 39 53.5 40.5 L47 47 C45 49 45 52 47 54 C49 56 52 56 54 54 L60 48" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
</svg>""",

    "card_message_safety.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <circle cx="40" cy="40" r="38" fill="#E8F5E9" stroke="#66BB6A" stroke-width="2"/>
  <!-- Shield -->
  <path d="M40 20 L56 26 C56 42 46 54 40 59 C34 54 24 42 24 26 Z" fill="#2E7D32"/>
  <path d="M40 23 L53 28 C53 40 45 51 40 55 C35 51 27 40 27 28 Z" fill="#388E3C"/>
  <!-- Lock inside shield -->
  <rect x="34" y="36" width="12" height="10" rx="2" fill="#FFFFFF"/>
  <path d="M36 36 L36 32 C36 30 38 28 40 28 C42 28 44 30 44 32 L44 36" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
</svg>""",

    "card_prefers_audio.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <circle cx="40" cy="40" r="38" fill="#FFF8E1" stroke="#FFD54F" stroke-width="2"/>
  <!-- Speaker -->
  <polygon points="24,34 32,34 40,26 40,54 32,46 24,46" fill="#F57F17"/>
  <!-- Sound waves -->
  <path d="M46 32 C49 35 49 45 46 48" fill="none" stroke="#F57F17" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M52 26 C58 32 58 48 52 54" fill="none" stroke="#FFA000" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Musical note -->
  <circle cx="58" cy="30" r="3" fill="#F57F17"/>
</svg>""",

    "card_language_difficulty.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <circle cx="40" cy="40" r="38" fill="#E0F2FE" stroke="#38BDF8" stroke-width="2"/>
  <!-- English speech bubble -->
  <rect x="20" y="24" width="26" height="20" rx="6" fill="#0284C7"/>
  <text x="33" y="38" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">A</text>
  <!-- Urdu speech bubble -->
  <rect x="36" y="36" width="26" height="20" rx="6" fill="#059669"/>
  <text x="49" y="50" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ا</text>
  <!-- Connection heart -->
  <circle cx="38" cy="34" r="5" fill="#EF4444"/>
</svg>""",

    "module_maps.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
  <rect width="320" height="120" rx="12" fill="#E0F2FE"/>
  <path d="M0 45 Q80 20 160 50 T320 40 L320 80 Q240 70 160 90 T0 80 Z" fill="#BAE6FD" opacity="0.7"/>
  <rect x="180" y="60" width="90" height="40" rx="8" fill="#BBF7D0"/>
  <line x1="40" y1="120" x2="140" y2="0" stroke="#FFFFFF" stroke-width="12"/>
  <line x1="100" y1="0" x2="260" y2="120" stroke="#FFFFFF" stroke-width="10"/>
  <!-- Destination pin -->
  <g transform="translate(140, 25)">
    <path d="M16 0 C8 0 0 8 0 16 C0 28 16 44 16 44 C16 44 32 28 32 16 C32 8 24 0 16 0 Z" fill="#EF4444"/>
    <circle cx="16" cy="16" r="6" fill="#FFFFFF"/>
  </g>
  <rect x="16" y="16" width="100" height="28" rx="6" fill="#FFFFFF" opacity="0.95"/>
  <text x="66" y="35" font-family="system-ui" font-size="11" font-weight="700" fill="#0369A1" text-anchor="middle">📍 Live GPS</text>
</svg>""",

    "module_messaging.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
  <rect width="320" height="120" rx="12" fill="#F3E8FF"/>
  <!-- Phone outline -->
  <rect x="100" y="12" width="120" height="96" rx="10" fill="#FFFFFF" stroke="#9333EA" stroke-width="2"/>
  <!-- Chat bubbles -->
  <rect x="114" y="24" width="70" height="18" rx="6" fill="#E9D5FF"/>
  <rect x="136" y="48" width="72" height="46" rx="8" fill="#7E22CE"/>
  <!-- Attached image -->
  <rect x="142" y="54" width="36" height="34" rx="4" fill="#F3E8FF"/>
  <circle cx="152" cy="64" r="3" fill="#F59E0B"/>
  <polygon points="144,84 154,74 162,82 170,76 176,84" fill="#10B981"/>
  <!-- Paperclip -->
  <circle cx="60" cy="60" r="22" fill="#9333EA"/>
  <path d="M54 66 L64 56 C66 54 66 50 64 48 C62 46 58 46 56 48 L46 58 C43 61 43 66 46 69 C49 72 54 72 57 69 L67 59" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
</svg>""",

    "module_safe_delete.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
  <rect width="320" height="120" rx="12" fill="#FEF3C7"/>
  <!-- Gallery folder -->
  <rect x="50" y="25" width="80" height="70" rx="8" fill="#FFFFFF" stroke="#D97706" stroke-width="2"/>
  <rect x="60" y="40" width="60" height="45" rx="6" fill="#FDE68A"/>
  <!-- Arrow to trash -->
  <path d="M145 60 L185 60" stroke="#D97706" stroke-width="3" stroke-dasharray="4 4"/>
  <polygon points="183,55 195,60 183,65" fill="#D97706"/>
  <!-- Trash bin with safe badge -->
  <rect x="205" y="30" width="65" height="65" rx="10" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
  <text x="237" y="58" font-size="24" text-anchor="middle">🗑️</text>
  <rect x="210" y="70" width="55" height="18" rx="6" fill="#DCFCE7"/>
  <text x="237" y="83" font-family="system-ui" font-size="10" font-weight="700" fill="#15803D" text-anchor="middle">Safe 30 Days</text>
</svg>""",

    "module_safety_scam.svg": """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
  <rect width="320" height="120" rx="12" fill="#ECFDF5"/>
  <!-- Warning message bubble -->
  <rect x="30" y="30" width="140" height="60" rx="10" fill="#FFFFFF" stroke="#DC2626" stroke-width="1.5"/>
  <text x="44" y="50" font-family="system-ui" font-size="11" font-weight="bold" fill="#DC2626">⚠️ Urgent: Share OTP</text>
  <rect x="44" y="60" width="80" height="6" rx="3" fill="#FCA5A5"/>
  <rect x="44" y="72" width="110" height="6" rx="3" fill="#E2E8F0"/>
  <!-- Shield blocking -->
  <g transform="translate(195, 20)">
    <path d="M45 0 L80 12 C80 45 60 70 45 80 C30 70 10 45 10 12 Z" fill="#059669"/>
    <path d="M45 5 L75 16 C75 42 58 64 45 74 C32 64 15 42 15 16 Z" fill="#10B981"/>
    <path d="M35 38 L42 45 L58 28" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>"""
}

for fname, content in SVGS.items():
    p = os.path.join(CARDS_DIR, fname)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(content.strip())
    print(f"Generated card illustration: {fname}")
