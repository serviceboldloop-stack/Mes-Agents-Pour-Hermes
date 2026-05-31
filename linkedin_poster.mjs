/**
 * KAIROS — LinkedIn Auto-Poster
 * Poste le contenu en attente sur LinkedIn via Playwright.
 * Appelé par le bot Telegram quand Lucas répond "ok linkedin".
 */

import { chromium } from "playwright";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const BOT_DIR    = "C:\\Users\\chapo\\Documents\\Agent Marketing V1";
const STATE_FILE = join(BOT_DIR, ".linkedin_state.json");
const COOKIE_FILE = join(BOT_DIR, ".linkedin_cookies.json");
const CREDS_FILE = join(BOT_DIR, ".linkedin_creds.json");

// ─── State ────────────────────────────────────────────────────────────────────
function loadState() {
  if (existsSync(STATE_FILE)) {
    try { return JSON.parse(readFileSync(STATE_FILE, "utf8")); } catch {}
  }
  return {};
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf8");
}

function loadCreds() {
  if (existsSync(CREDS_FILE)) {
    try { return JSON.parse(readFileSync(CREDS_FILE, "utf8")); } catch {}
  }
  return null;
}

// ─── Publication LinkedIn ─────────────────────────────────────────────────────
export async function postToLinkedIn(postText) {
  // Sur VPS (pas d'écran) : headless: true
  // En local pour debug : mettre headless: false
  const isServer = process.env.NODE_ENV === "production";
  const browser = await chromium.launch({
    headless: isServer,
    slowMo: isServer ? 0 : 80,
    args: isServer ? ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"] : [],
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 800 },
  });

  // Charger les cookies si disponibles
  if (existsSync(COOKIE_FILE)) {
    const cookies = JSON.parse(readFileSync(COOKIE_FILE, "utf8"));
    await context.addCookies(cookies);
  }

  const page = await context.newPage();

  try {
    // Vérifier si déjà connecté
    await page.goto("https://www.linkedin.com/feed/", { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(2000);

    // Si redirigé vers login, se connecter
    if (page.url().includes("login") || page.url().includes("checkpoint")) {
      const creds = loadCreds();
      if (!creds) throw new Error("Credentials LinkedIn manquants. Configure avec 'setup linkedin'.");

      await page.fill("#username", creds.email);
      await page.fill("#password", creds.password);
      await page.click("[type=submit]");
      await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(3000);

      // Sauvegarder les cookies après login
      const cookies = await context.cookies();
      writeFileSync(COOKIE_FILE, JSON.stringify(cookies, null, 2), "utf8");
    }

    // Vérifier qu'on est bien sur le feed
    if (!page.url().includes("linkedin.com/feed") && !page.url().includes("linkedin.com/in")) {
      throw new Error(`Connexion échouée. URL actuelle : ${page.url()}`);
    }

    // Cliquer sur "Démarrer un post"
    await page.waitForSelector("[data-test-id='share-box-feed-entry__trigger'], .share-box-feed-entry__trigger, [aria-label*='post'], [aria-label*='publication']", { timeout: 15000 });
    await page.click("[data-test-id='share-box-feed-entry__trigger'], .share-box-feed-entry__trigger, [aria-label*='post'], [aria-label*='publication']");
    await page.waitForTimeout(2000);

    // Trouver la zone de texte du post
    const textArea = await page.waitForSelector(
      ".ql-editor, [data-placeholder*='Lancez'], [data-placeholder*='partager'], [contenteditable=true]",
      { timeout: 10000 }
    );

    // Taper le post (méthode clipboard pour préserver les retours à la ligne)
    await textArea.click();
    await page.evaluate((text) => {
      const el = document.querySelector(".ql-editor, [contenteditable=true]");
      if (el) {
        el.focus();
        document.execCommand("insertText", false, text);
      }
    }, postText);

    await page.waitForTimeout(1500);

    // Cliquer sur "Publier"
    const publishBtn = await page.waitForSelector(
      "[data-test-id='share-form__submit'], .share-actions__primary-action, [aria-label*='Publier'], [aria-label*='Post']",
      { timeout: 10000 }
    );
    await publishBtn.click();
    await page.waitForTimeout(4000);

    // Sauvegarder les cookies mis à jour
    const updatedCookies = await context.cookies();
    writeFileSync(COOKIE_FILE, JSON.stringify(updatedCookies, null, 2), "utf8");

    return { success: true };

  } catch (err) {
    // Screenshot pour debug
    await page.screenshot({ path: join(BOT_DIR, ".linkedin_error.png") });
    throw err;
  } finally {
    await browser.close();
  }
}

// ─── Setup credentials ────────────────────────────────────────────────────────
export function setupCredentials(email, password) {
  writeFileSync(CREDS_FILE, JSON.stringify({ email, password }, null, 2), "utf8");
  console.log("Credentials sauvegardés.");
}

// ─── CLI direct ───────────────────────────────────────────────────────────────
if (process.argv[2] === "setup") {
  const email = process.argv[3];
  const password = process.argv[4];
  if (!email || !password) {
    console.log("Usage: node linkedin_poster.mjs setup email@exemple.com motdepasse");
  } else {
    setupCredentials(email, password);
  }
} else if (process.argv[2] === "post") {
  const state = loadState();
  if (!state.pendingPost) {
    console.log("Pas de post en attente.");
    process.exit(1);
  }
  postToLinkedIn(state.pendingPost)
    .then(() => {
      state.pendingPost = null;
      saveState(state);
      console.log("Publié ✅");
    })
    .catch(err => {
      console.error("Erreur:", err.message);
      process.exit(1);
    });
} else if (process.argv[2] === "post-text") {
  const postText = process.argv.slice(3).join(" ");
  if (!postText) {
    console.log("Usage: node linkedin_poster.mjs post-text [texte du post]");
    process.exit(1);
  }
  postToLinkedIn(postText)
    .then(() => {
      console.log("Publié ✅");
    })
    .catch(err => {
      console.error("ERROR:" + err.message);
      process.exit(1);
    });
}
