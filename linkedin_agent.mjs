/**
 * KAIROS — Agent LinkedIn
 * Génère 1 post par jour (7j/7) et le publie automatiquement sur LinkedIn.
 * Déclenché par Windows Task Scheduler à 9h.
 * node linkedin_agent.mjs
 */

import { execFile } from "child_process";
import { promisify } from "util";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const execFileAsync = promisify(execFile);

const BOT_TOKEN  = "8881380387:AAHPQEUuZSptb5UFNXq0ZsctM6lNKc6SrCE";
const CHAT_ID    = 7579717556;
const BOT_DIR    = "C:\\Users\\chapo\\Documents\\Agent Marketing V1";
const STATE_FILE = join(BOT_DIR, ".linkedin_state.json");

// ─── Rotation 7 jours/semaine ──────────────────────────────────────────────
// 0=Lundi, 1=Mardi, 2=Mercredi, 3=Jeudi, 4=Vendredi, 5=Samedi, 6=Dimanche
const ROTATION = {
  0: { type: "A", pilier: "Actus Claude/Anthropic + ton avis personnel" },
  1: { type: "B", pilier: "Building in public — ce que tu as fait cette semaine" },
  2: { type: "A", pilier: "Démo agent en action + résultat chiffré" },
  3: { type: "A", pilier: "Astuce Claude peu connue ou technique concrète" },
  4: { type: "C", pilier: "Post lead magnet — Commente AGENT pour l'agent TikTok IA gratuit" },
  5: { type: "B", pilier: "Weekend — vie de solo entrepreneur, moment de la semaine, leçon perso" },
  6: { type: "A", pilier: "Teaser semaine à venir — ce que tu construis, ce qui arrive" },
};

// ─── State ────────────────────────────────────────────────────────────────────
function loadState() {
  if (existsSync(STATE_FILE)) {
    try { return JSON.parse(readFileSync(STATE_FILE, "utf8")); } catch {}
  }
  return { lastPilier: null, history: [] };
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf8");
}

// ─── Telegram ─────────────────────────────────────────────────────────────────
async function sendTelegram(text) {
  const chunks = text.match(/[\s\S]{1,4000}/g) || [text];
  for (const chunk of chunks) {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: chunk,
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    }).catch(() => {});
  }
}

// ─── Génération du post via Claude CLI ───────────────────────────────────────
async function generatePost(type, pilier, lastPilier, recentPiliers) {
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  const typeDesc = {
    A: "EXPERTISE IA — contenu technique, astuce, démo, résultat chiffré. Donne de la valeur pure. Ton direct, expérience réelle.",
    B: "BUILDING IN PUBLIC / VIE — coulisses du business, leçon personnelle, 19 ans solo entrepreneur. Authentique, concret, pas corporate.",
    C: "LEAD MAGNET — post conçu pour générer des commentaires. Offre l'Agent TikTok IA gratuit via 'Commente AGENT'. Clair, simple, irrésistible.",
  };

  const avoidStr = recentPiliers?.length
    ? `\nPiliers récents utilisés (ne pas répéter) :\n${recentPiliers.map(p => `- ${p}`).join("\n")}`
    : "";

  const prompt = `agent_linkedin

Génère un post LinkedIn pour aujourd'hui (${today}).

Type : ${type} — ${typeDesc[type]}
Pilier du jour : ${pilier}${avoidStr}

Règles ABSOLUES :
- Hook : 8-12 mots MAX, pas d'emoji, pas de hashtag, doit arrêter le scroll
- JAMAIS de lien externe (remplacer par "Commente [MOT-CLÉ]" si besoin de partager une ressource)
- ZÉRO hashtag
- Retours à la ligne fréquents (1-2 phrases max par bloc)
- 150-200 mots
- Ton personnel (Lucas parle en son nom, pas "Kairos")
- Expérience réelle, jamais marketing corporate

Produis UNIQUEMENT le post. Zéro titre, zéro commentaire, zéro explication.`;

  const { stdout } = await execFileAsync(
    "claude", ["-p", prompt],
    { cwd: BOT_DIR, timeout: 120_000, maxBuffer: 1024 * 1024 * 5 }
  );
  return (stdout || "").trim();
}

// ─── Publication via Playwright ───────────────────────────────────────────────
async function publishPost(postText) {
  const { stdout, stderr } = await execFileAsync(
    "node", ["linkedin_poster.mjs", "post-text", postText],
    { cwd: BOT_DIR, timeout: 120_000, maxBuffer: 1024 * 1024 * 5 }
  );
  const out = (stdout || stderr || "").trim();
  if (out.includes("ERROR")) throw new Error(out);
  return out;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const now = new Date();
  // getDay() : 0=Dim, 1=Lun, ... 6=Sam → convertir en 0=Lun...6=Dim
  const jsDay = now.getDay();
  const dayIndex = jsDay === 0 ? 6 : jsDay - 1;

  const { type, pilier } = ROTATION[dayIndex];
  const state = loadState();
  const recentPiliers = (state.history || []).slice(-5).map(h => h.pilier);

  const dateStr = now.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });

  console.log(`[LinkedIn] ${dateStr} — Type ${type} — ${pilier}`);
  await sendTelegram(`⏳ Génération du post LinkedIn du jour...`);

  // 1. Générer le post
  let post;
  try {
    post = await generatePost(type, pilier, state.lastPilier, recentPiliers);
  } catch (err) {
    await sendTelegram(`❌ Erreur génération post LinkedIn : ${err.message}`);
    return;
  }

  if (!post) {
    await sendTelegram("❌ Post vide. Relance manuellement en disant `linkedin` sur Telegram.");
    return;
  }

  // Sauvegarder
  state.pendingPost = post;
  state.pendingDate = now.toISOString().split("T")[0];
  state.lastPilier = pilier;
  state.history = [...(state.history || []).slice(-20), { date: state.pendingDate, type, pilier }];
  saveState(state);

  // 2. Publier automatiquement
  try {
    await publishPost(post);

    state.pendingPost = null;
    state.postedAt = now.toISOString();
    saveState(state);

    await sendTelegram(
      `✅ *Post LinkedIn publié — ${dateStr}*\n\n` +
      `_Type ${type} — ${pilier}_\n\n` +
      `─────────────────────\n\n` +
      `${post}`
    );

  } catch (err) {
    // Échec publication → envoyer quand même le post pour copier-coller manuellement
    await sendTelegram(
      `⚠️ *Publication auto échouée — post à copier-coller manuellement*\n\n` +
      `Erreur : ${err.message}\n\n` +
      `─────────────────────\n\n` +
      `${post}\n\n` +
      `─────────────────────\n\n` +
      `Ou envoie *ok linkedin* pour retenter.`
    );
  }
}

main().catch(async (err) => {
  await sendTelegram(`❌ Erreur critique linkedin_agent : ${err.message}`).catch(() => {});
  console.error(err);
});
