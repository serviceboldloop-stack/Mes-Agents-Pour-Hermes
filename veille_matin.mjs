/**
 * KAIROS — Veille IA du matin
 * Déclenché par Windows Task Scheduler à 8h
 * node veille_matin.mjs
 */

import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

const BOT_TOKEN = "8881380387:AAHPQEUuZSptb5UFNXq0ZsctM6lNKc6SrCE";
const CHAT_ID   = 7579717556;
const BOT_DIR   = "C:\\Users\\chapo\\Documents\\Agent Marketing V1";

const today = new Date().toLocaleDateString("fr-FR", {
  weekday: "long", day: "numeric", month: "long", year: "numeric"
});
const todayShort = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });

const PROMPT = `veille

Génère le rapport de veille IA du matin. Date : ${today}.

Format Telegram Markdown (*gras*, bullets •). Structure exacte :

*Veille IA — ${todayShort}*

*Claude / Anthropic*
[2-3 points sur Claude, Anthropic, nouvelles capacités ou actus]

*Tendances contenu IA*
[2-3 sujets viraux ou tendances TikTok/YouTube liés à l'IA]

*Idées de scripts cette semaine*
• [Titre accrocheur] — [pourquoi viral en 1 ligne]
• [Titre accrocheur] — [pourquoi viral en 1 ligne]
• [Titre accrocheur] — [pourquoi viral en 1 ligne]

*Meilleur sujet du jour : X/10*
[Justification en 1 ligne]

Concis. Actionnable. Sujets que je peux tourner aujourd'hui.`;

async function main() {
  console.log("Génération veille matin...");
  let text;

  try {
    const { stdout, stderr } = await execFileAsync(
      "claude", ["-p", PROMPT],
      { cwd: BOT_DIR, timeout: 120_000, maxBuffer: 1024 * 1024 * 5 }
    );
    text = (stdout || stderr || "").trim() || "Erreur — génère manuellement avec `veille`.";
  } catch (err) {
    text = `Erreur veille : ${err.message}`;
  }

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    }),
  });

  const data = await res.json();
  console.log(data.ok ? "Veille envoyée ✅" : `Erreur Telegram: ${data.description}`);
}

main().catch(console.error);
