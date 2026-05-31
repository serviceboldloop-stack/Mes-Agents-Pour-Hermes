#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# KAIROS — Setup VPS Ubuntu 22.04
# Exécuter en root : bash setup_vps.sh
# ═══════════════════════════════════════════════════════════════

set -e
echo "=== KAIROS VPS Setup ==="

# ─── 1. Mise à jour système ───────────────────────────────────
apt-get update -y && apt-get upgrade -y
apt-get install -y git curl wget unzip ca-certificates gnupg

# ─── 2. Node.js 20 ───────────────────────────────────────────
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
echo "Node.js : $(node -v)"
echo "npm : $(npm -v)"

# ─── 3. PM2 ──────────────────────────────────────────────────
npm install -g pm2
pm2 startup systemd -u root --hp /root
echo "PM2 installé"

# ─── 4. Dépendances Playwright (Chromium headless) ───────────
apt-get install -y \
  libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libdbus-1-3 libxkbcommon0 libxcomposite1 \
  libxdamage1 libxfixes3 libxrandr2 libgbm1 libpango-1.0-0 \
  libcairo2 libasound2 libxshmfence1 libglu1-mesa fonts-liberation \
  libappindicator3-1 xdg-utils
echo "Dépendances Chromium installées"

# ─── 5. Dossier projet ───────────────────────────────────────
mkdir -p /root/kairos/logs
cd /root/kairos

echo ""
echo "══════════════════════════════════════════════"
echo " ÉTAPE MANUELLE — À faire maintenant :"
echo "══════════════════════════════════════════════"
echo ""
echo " 1. Cloner le repo GitHub :"
echo "    git clone https://github.com/TON_USERNAME/kairos-agents.git /root/kairos"
echo ""
echo " 2. Installer les dépendances :"
echo "    cd /root/kairos && npm install"
echo "    npx playwright install chromium"
echo ""
echo " 3. Installer Claude CLI :"
echo "    npm install -g @anthropic-ai/claude-code"
echo "    claude  ← (authentifier avec le compte Pro)"
echo ""
echo " 4. Copier les credentials (depuis ton PC via sftp/scp) :"
echo "    .linkedin_creds.json"
echo ""
echo " 5. Configurer les crons :"
echo "    crontab -e"
echo "    0 8 * * * cd /root/kairos && node veille_matin.mjs"
echo "    0 9 * * * cd /root/kairos && NODE_ENV=production node linkedin_agent.mjs"
echo ""
echo " 6. Lancer le bot :"
echo "    pm2 start ecosystem.config.cjs"
echo "    pm2 save"
echo ""
echo "══════════════════════════════════════════════"
