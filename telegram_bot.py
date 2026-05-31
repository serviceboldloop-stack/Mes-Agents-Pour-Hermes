"""
KAIROS — Bot Telegram local
Utilise Claude Code CLI (abonnement Pro) — zéro coût API
Lance depuis : C:\Users\chapo\Documents\Agent Marketing V1\
"""

import subprocess
import requests
import time
import json
import os
from datetime import datetime
from pathlib import Path

# ─── Config ──────────────────────────────────────────────────────────────────
BOT_TOKEN   = "8881380387:AAHPQEUuZSptb5UFNXq0ZsctM6lNKc6SrCE"
CHAT_ID     = 7579717556
BOT_DIR     = Path(r"C:\Users\chapo\Documents\Agent Marketing V1")
HISTORY_FILE = BOT_DIR / ".telegram_history.json"
MAX_HISTORY = 12   # nombre de tours à conserver

# ─── Telegram helpers ─────────────────────────────────────────────────────────
def send_message(text: str, parse_mode="Markdown"):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
    # Telegram max 4096 chars — découper si nécessaire
    chunks = [text[i:i+4000] for i in range(0, len(text), 4000)]
    for chunk in chunks:
        try:
            requests.post(url, json={
                "chat_id": CHAT_ID,
                "text": chunk,
                "parse_mode": parse_mode,
                "disable_web_page_preview": True
            }, timeout=10)
        except Exception as e:
            print(f"[send_message] Erreur: {e}")

def send_typing():
    try:
        requests.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendChatAction",
            json={"chat_id": CHAT_ID, "action": "typing"},
            timeout=5
        )
    except:
        pass

def get_updates(offset=None):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"
    params = {"timeout": 30, "allowed_updates": ["message"]}
    if offset:
        params["offset"] = offset
    r = requests.get(url, params=params, timeout=35)
    return r.json()

# ─── Historique conversation ──────────────────────────────────────────────────
def load_history() -> list:
    if HISTORY_FILE.exists():
        try:
            return json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
        except:
            return []
    return []

def save_history(history: list):
    HISTORY_FILE.write_text(json.dumps(history, ensure_ascii=False, indent=2), encoding="utf-8")

def reset_history():
    if HISTORY_FILE.exists():
        HISTORY_FILE.unlink()

# ─── Appel Claude CLI ─────────────────────────────────────────────────────────
def ask_claude(user_message: str) -> str:
    history = load_history()

    # Construire le contexte historique
    context = ""
    if history:
        context = "=== Historique de la conversation ===\n"
        for h in history[-MAX_HISTORY:]:
            context += f"Lucas : {h['user']}\nKairos : {h['assistant']}\n\n"
        context += "=== Fin historique ===\n\n"

    full_prompt = f"{context}Lucas dit : {user_message}"

    try:
        result = subprocess.run(
            ["claude", "-p", full_prompt],
            capture_output=True,
            text=True,
            cwd=str(BOT_DIR),
            timeout=180,
            encoding="utf-8"
        )
        response = (result.stdout or "").strip()
        if not response and result.stderr:
            response = result.stderr.strip()
        if not response:
            response = "Pas de réponse générée."
    except subprocess.TimeoutExpired:
        response = "Timeout — la réponse a pris trop de temps. Réessaie."
    except FileNotFoundError:
        response = "Erreur : commande `claude` introuvable. Vérifie que Claude Code est installé et dans le PATH."
    except Exception as e:
        response = f"Erreur : {e}"

    # Sauvegarder dans l'historique
    history.append({"user": user_message, "assistant": response})
    if len(history) > MAX_HISTORY:
        history = history[-MAX_HISTORY:]
    save_history(history)

    return response

# ─── Commandes spéciales ──────────────────────────────────────────────────────
def handle_command(cmd: str) -> str | None:
    cmd = cmd.strip().lower()

    if cmd in ["/start", "/aide", "/help"]:
        return (
            "*Kairos Agent IA* — Opérationnel ✅\n\n"
            "Je suis connecté à Claude Code. J'ai accès à toute la mémoire et aux règles du système.\n\n"
            "*Commandes production :*\n"
            "• `cycle complet` → tout produire pour la semaine\n"
            "• `veille` → sujets viraux IA de la semaine\n"
            "• `script youtube [sujet]` → script complet\n"
            "• `déclinaisons tiktok` → 4 scripts courts\n"
            "• `newsletter [sujet]` → email hebdo + onboarding\n"
            "• `stories` → séquences Instagram\n"
            "• `hooks youtube/tiktok` → hooks optimisés\n"
            "• `analyse [stats]` → leçons + mémoire\n\n"
            "*Après publication :*\n"
            "• `vidéo publiée [URL]` → mise à jour fichiers\n\n"
            "/reset → effacer l'historique de conversation"
        )

    if cmd == "/reset":
        reset_history()
        return "Historique effacé. Nouvelle conversation."

    if cmd == "/veille":
        return None  # Traiter comme message normal → ask_claude

    return None  # Pas une commande reconnue

# ─── Boucle principale ────────────────────────────────────────────────────────
def main():
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Bot Kairos démarré.")
    print(f"Répertoire : {BOT_DIR}")
    print("En attente de messages Telegram...")
    send_message("*Kairos Agent IA* — En ligne ✅\nTape /aide pour voir les commandes disponibles.")

    offset = None
    while True:
        try:
            updates = get_updates(offset)
            if not updates.get("ok"):
                time.sleep(5)
                continue

            for update in updates.get("result", []):
                offset = update["update_id"] + 1

                msg = update.get("message")
                if not msg:
                    continue

                chat_id = msg["chat"]["id"]
                if chat_id != CHAT_ID:
                    send_message_to(chat_id, "Accès non autorisé.")
                    continue

                text = msg.get("text", "").strip()
                if not text:
                    continue

                print(f"[{datetime.now().strftime('%H:%M:%S')}] Message reçu: {text[:60]}...")

                # Vérifier commandes spéciales
                special = handle_command(text)
                if special:
                    send_message(special)
                    continue

                # Appel Claude
                send_typing()
                response = ask_claude(text)
                print(f"[{datetime.now().strftime('%H:%M:%S')}] Réponse envoyée ({len(response)} chars)")
                send_message(response)

        except requests.exceptions.ConnectionError:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Connexion perdue. Reconnexion dans 10s...")
            time.sleep(10)
        except KeyboardInterrupt:
            print("\nBot arrêté.")
            send_message("Bot arrêté. À bientôt.")
            break
        except Exception as e:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Erreur: {e}")
            time.sleep(5)

def send_message_to(chat_id, text):
    requests.post(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        json={"chat_id": chat_id, "text": text},
        timeout=10
    )

if __name__ == "__main__":
    main()
