"""
KAIROS — Veille IA du matin (8h)
Script one-shot déclenché par Windows Task Scheduler
"""

import subprocess
import requests
from datetime import datetime
from pathlib import Path

BOT_TOKEN = "8881380387:AAHPQEUuZSptb5UFNXq0ZsctM6lNKc6SrCE"
CHAT_ID   = 7579717556
BOT_DIR   = Path(r"C:\Users\chapo\Documents\Agent Marketing V1")

today = datetime.now().strftime("%A %d %B %Y")

PROMPT = f"""veille

Génère le rapport de veille IA du matin pour aujourd'hui ({today}).

Format Telegram (Markdown avec *gras* et bullets). Structure exacte :

*Veille IA — {datetime.now().strftime("%d/%m")}*

*Claude / Anthropic*
[2-3 points sur Claude, Anthropic, nouvelles capacités ou actus récentes]

*Tendances contenu IA*
[2-3 sujets viraux ou tendances sur TikTok/YouTube liés à l'IA]

*Idées de scripts cette semaine*
• [Titre accrocheur #1] — [pourquoi c'est viral en 1 ligne]
• [Titre accrocheur #2] — [pourquoi c'est viral en 1 ligne]
• [Titre accrocheur #3] — [pourquoi c'est viral en 1 ligne]

*Meilleur sujet du jour : [X]/10*
[Une ligne de justification]

Sois concis. Actionnable. Sujets que je peux tourner aujourd'hui."""

def main():
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Génération veille matin...")

    try:
        result = subprocess.run(
            ["claude", "-p", PROMPT],
            capture_output=True,
            text=True,
            cwd=str(BOT_DIR),
            timeout=120,
            encoding="utf-8"
        )
        text = (result.stdout or "").strip()
        if not text:
            text = "Erreur génération veille — relance manuellement avec `veille`."
    except Exception as e:
        text = f"Erreur veille : {e}"

    # Envoyer sur Telegram
    requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={
            "chat_id": CHAT_ID,
            "text": text,
            "parse_mode": "Markdown",
            "disable_web_page_preview": True
        },
        timeout=15
    )
    print("Veille envoyée.")

if __name__ == "__main__":
    main()
