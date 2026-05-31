/**
 * KAIROS — Bot Telegram local (Node.js)
 * Utilise Claude Code CLI (abonnement Pro) — zéro coût API
 * Lance : node telegram_bot.mjs
 * Depuis : C:\Users\chapo\Documents\Agent Marketing V1\
 */

import { execFile, spawn } from "child_process";
import { promisify } from "util";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const execFileAsync = promisify(execFile);

// ─── Config ───────────────────────────────────────────────────────────────────
const BOT_TOKEN    = "8881380387:AAHPQEUuZSptb5UFNXq0ZsctM6lNKc6SrCE";
const CHAT_ID      = 7579717556;
const BOT_DIR      = "C:\\Users\\chapo\\Documents\\Agent Marketing V1";
const HISTORY_FILE = join(BOT_DIR, ".telegram_history.json");
const MAX_HISTORY  = 12;

// ─── Telegram ─────────────────────────────────────────────────────────────────
async function telegramPost(method, body) {
  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

async function sendMessage(text) {
  // Découper si > 4000 chars
  const chunks = text.match(/[\s\S]{1,4000}/g) || [text];
  for (const chunk of chunks) {
    await telegramPost("sendMessage", {
      chat_id: CHAT_ID,
      text: chunk,
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });
  }
}

async function sendTyping() {
  await telegramPost("sendChatAction", { chat_id: CHAT_ID, action: "typing" }).catch(() => {});
}

async function getUpdates(offset) {
  const params = new URLSearchParams({ timeout: "30", allowed_updates: '["message"]' });
  if (offset) params.set("offset", String(offset));
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?${params}`,
    { signal: AbortSignal.timeout(35_000) }
  );
  return res.json();
}

// ─── Historique ───────────────────────────────────────────────────────────────
function loadHistory() {
  try {
    if (existsSync(HISTORY_FILE)) return JSON.parse(readFileSync(HISTORY_FILE, "utf8"));
  } catch {}
  return [];
}

function saveHistory(history) {
  writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf8");
}

function resetHistory() {
  try { writeFileSync(HISTORY_FILE, "[]", "utf8"); } catch {}
}

// ─── Appel Claude CLI ─────────────────────────────────────────────────────────
async function askClaude(userMessage) {
  const history = loadHistory();

  // Construire le contexte
  let context = "";
  if (history.length > 0) {
    context = "=== Historique de conversation ===\n";
    for (const h of history.slice(-MAX_HISTORY)) {
      context += `Lucas : ${h.user}\nKairos : ${h.assistant}\n\n`;
    }
    context += "=== Fin historique ===\n\n";
  }

  const fullPrompt = `${context}Lucas dit : ${userMessage}`;

  try {
    // claude -p lance une session non-interactive depuis BOT_DIR
    // → charge automatiquement CLAUDE.md et toute la mémoire du projet
    const { stdout, stderr } = await execFileAsync(
      "claude",
      ["-p", fullPrompt],
      { cwd: BOT_DIR, timeout: 180_000, maxBuffer: 1024 * 1024 * 10 }
    );

    const response = (stdout || stderr || "Pas de réponse.").trim();

    // Sauvegarder dans l'historique
    history.push({ user: userMessage, assistant: response });
    saveHistory(history.slice(-MAX_HISTORY));

    return response;
  } catch (err) {
    if (err.code === "ETIMEDOUT") return "Timeout — réponse trop longue. Réessaie.";
    if (err.code === "ENOENT") return "Erreur : `claude` introuvable. Vérifie que Claude Code est dans le PATH.";
    return `Erreur : ${err.message}`;
  }
}

// ─── Commandes ────────────────────────────────────────────────────────────────
function handleSpecialCommand(text) {
  const cmd = text.trim().toLowerCase();

  if (["/start", "/aide", "/help"].includes(cmd)) {
    return (
      "*Kairos Agent IA* — Opérationnel ✅\n\n" +
      "Je suis connecté à Claude Code \\(abonnement Pro\\)\\.\n\n" +
      "*Production de contenu :*\n" +
      "• `cycle complet` → tout produire pour la semaine\n" +
      "• `veille` → sujets viraux IA\n" +
      "• `script youtube [sujet]` → script complet\n" +
      "• `déclinaisons tiktok` → 4 scripts courts\n" +
      "• `newsletter [sujet]` → email hebdo \\+ onboarding\n" +
      "• `stories` → séquences Instagram\n" +
      "• `hooks youtube/tiktok` → hooks optimisés\n" +
      "• `analyse [stats]` → leçons \\+ mémoire\n\n" +
      "*Après publication :*\n" +
      "• `vidéo publiée [URL]` → mise à jour fichiers\n\n" +
      "/reset → effacer l'historique"
    );
  }

  if (cmd === "/reset") {
    resetHistory();
    return "Historique effacé. Nouvelle conversation.";
  }

  // ─── Commandes LinkedIn ───────────────────────────────────────────────────
  if (cmd === "ok linkedin" || cmd === "ok" || cmd === "poster linkedin") {
    return "__LINKEDIN_POST__";
  }

  if (text.toLowerCase().startsWith("modifier linkedin ")) {
    return "__LINKEDIN_MODIFY__:" + text.slice("modifier linkedin ".length).trim();
  }

  if (text.toLowerCase().startsWith("setup linkedin ")) {
    return "__LINKEDIN_SETUP__:" + text.slice("setup linkedin ".length).trim();
  }

  return null; // pas une commande spéciale
}

// ─── Handlers LinkedIn ────────────────────────────────────────────────────────
const LINKEDIN_STATE_FILE = join(BOT_DIR, ".linkedin_state.json");

function loadLinkedInState() {
  if (existsSync(LINKEDIN_STATE_FILE)) {
    try { return JSON.parse(readFileSync(LINKEDIN_STATE_FILE, "utf8")); } catch {}
  }
  return {};
}

function saveLinkedInState(state) {
  writeFileSync(LINKEDIN_STATE_FILE, JSON.stringify(state, null, 2), "utf8");
}

async function handleLinkedInPost() {
  const state = loadLinkedInState();
  if (!state.pendingPost) {
    await sendMessage("Aucun post LinkedIn en attente. Génère-en un avec `linkedin` ou attends 9h demain.");
    return;
  }

  await sendMessage("Publication en cours sur LinkedIn...");

  try {
    const { execFile: ef } = await import("child_process");
    const { promisify: p } = await import("util");
    const efAsync = p(ef);

    const { stdout, stderr } = await efAsync(
      "node", ["linkedin_poster.mjs", "post"],
      { cwd: BOT_DIR, timeout: 120_000 }
    );

    state.pendingPost = null;
    state.postedAt = new Date().toISOString();
    saveLinkedInState(state);

    await sendMessage("Post publié sur LinkedIn ✅");
  } catch (err) {
    await sendMessage(
      `Erreur publication LinkedIn : ${err.message}\n\n` +
      `Vérification : assure-toi que tes credentials sont configurés avec\n` +
      "`setup linkedin email@exemple.com motdepasse`"
    );
  }
}

async function handleLinkedInModify(instruction) {
  const state = loadLinkedInState();
  if (!state.pendingPost) {
    await sendMessage("Aucun post en attente à modifier.");
    return;
  }

  await sendTyping();
  const prompt = `Voici un post LinkedIn en attente :\n\n${state.pendingPost}\n\nInstruction de modification : ${instruction}\n\nProduis le post modifié UNIQUEMENT. Rien d'autre.`;
  const newPost = await askClaude(prompt);

  state.pendingPost = newPost;
  saveLinkedInState(state);

  await sendMessage(
    `*Post LinkedIn modifié :*\n\n─────────────────────\n\n${newPost}\n\n─────────────────────\n\n` +
    `Réponds *ok linkedin* pour poster.`
  );
}

async function handleLinkedInSetup(email, password) {
  if (!email || !password) {
    await sendMessage("Usage : `setup linkedin ton@email.com motdepasse`");
    return;
  }
  try {
    const credsFile = join(BOT_DIR, ".linkedin_creds.json");
    writeFileSync(credsFile, JSON.stringify({ email, password }, null, 2), "utf8");
    await sendMessage("Credentials LinkedIn sauvegardés ✅\nProchain post : réponds `ok linkedin` pour tester.");
  } catch (err) {
    await sendMessage(`Erreur : ${err.message}`);
  }
}

// ─── Boucle principale ────────────────────────────────────────────────────────
async function main() {
  const ts = () => new Date().toLocaleTimeString("fr-FR");
  console.log(`[${ts()}] Bot Kairos démarré.`);
  console.log(`Répertoire : ${BOT_DIR}`);

  await sendMessage(
    "*Kairos Agent IA* — En ligne ✅\n" +
    "Connecté à Claude Code \\(abonnement Pro\\)\\.\n" +
    "Tape /aide pour voir les commandes\\."
  ).catch(() => {});

  let offset = undefined;

  while (true) {
    try {
      const data = await getUpdates(offset);
      if (!data.ok) { await sleep(5000); continue; }

      for (const update of data.result || []) {
        offset = update.update_id + 1;

        const msg = update.message;
        if (!msg?.text) continue;

        const chatId = msg.chat.id;
        if (chatId !== CHAT_ID) {
          await telegramPost("sendMessage", { chat_id: chatId, text: "Accès non autorisé." });
          continue;
        }

        const text = msg.text.trim();
        console.log(`[${ts()}] Message: ${text.slice(0, 60)}...`);

        // Commandes spéciales
        const special = handleSpecialCommand(text);

        if (special === "__LINKEDIN_POST__") {
          await handleLinkedInPost();
          continue;
        }

        if (special?.startsWith("__LINKEDIN_MODIFY__:")) {
          const instruction = special.slice("__LINKEDIN_MODIFY__:".length);
          await handleLinkedInModify(instruction);
          continue;
        }

        if (special?.startsWith("__LINKEDIN_SETUP__:")) {
          const parts = special.slice("__LINKEDIN_SETUP__:".length).split(" ");
          await handleLinkedInSetup(parts[0], parts[1]);
          continue;
        }

        if (special) {
          await sendMessage(special);
          continue;
        }

        // Claude
        await sendTyping();
        const response = await askClaude(text);
        console.log(`[${ts()}] Réponse: ${response.length} chars`);
        await sendMessage(response);
      }
    } catch (err) {
      if (err.name === "AbortError" || err.name === "TimeoutError") continue;
      console.error(`[${ts()}] Erreur: ${err.message}`);
      await sleep(5000);
    }
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

main().catch(console.error);
