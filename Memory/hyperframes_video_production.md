# MÉMOIRE — Production vidéo HyperFrames
## Agent Montage — Apprentissages session #1 (2026-05-27)
### Vidéo de référence : "Agent TikTok IA" — agent_tiktok_ia.mp4 (418.7s, 214.7 MB)

---

## 0. STACK TECHNIQUE

| Outil | Version | Rôle |
|-------|---------|------|
| HyperFrames | 0.6.44 | Moteur de composition vidéo HTML/JS |
| GSAP | 3.14.2 | Animations (chargé via CDN dans index.html) |
| Node.js | any LTS | Scripts de consultation transcript.json |
| ffmpeg | any | Post-traitement si nécessaire (pas requis avec HF) |

**Commandes essentielles :**
```bash
# Démarrer le preview (localhost:3002)
cd "C:\Users\chapo\Videos\edit\animations\slot_timeline"
npm run dev

# Rendre la vidéo finale
npx hyperframes@0.6.44 render -o "C:\Users\chapo\Documents\01_Agent Personnaliser\Agent Marketing V1\.claude\worktrees\epic-panini-8c4c0d\Outputs\[dossier_output]\[nom_fichier].mp4" --quality high
```

**Fichiers projet :**
- Composition principale : `C:\Users\chapo\Videos\edit\animations\slot_timeline\index.html`
- Transcript word-level : `C:\Users\chapo\Videos\edit\transcript.json`
- Assets visuels : `C:\Users\chapo\Videos\edit\animations\slot_timeline\assets\visuels\`
- Vidéo source principale : `C:\Users\chapo\Downloads\[fichier].mp4`

---

## 1. RÈGLE ABSOLUE — NE JAMAIS FAIRE SANS VALIDATION

**⛔ Ne jamais lancer le rendu final sans approbation explicite de Lucas sur le preview.**

Workflow obligatoire :
1. Faire les modifications dans `index.html`
2. Vérifier via `npm run dev` (preview localhost:3002)
3. Présenter à Lucas, attendre son **"ok je valide"** ou équivalent explicite
4. Seulement alors lancer le rendu

---

## 2. SYSTÈME DE TRACKS HYPERFRAMES

Chaque élément `class="clip"` doit avoir un `data-track-index` unique par position temporelle.
**Deux éléments sur le même track NE PEUVENT PAS se chevaucher dans le temps.**

| Track | Rôle |
|-------|------|
| 0 | Facecam plein écran (vidéo principale) |
| 1 | Glow effects (halos violets sous les cartes) |
| 2 | Card PIP / média principal (screen recordings) |
| 3 | Audio (piste son) |
| 4 | Fan card secondaire A (carousel 3 cartes) |
| 5 | Fan card secondaire B (carousel 3 cartes) |
| 6 | Overlays texte (cartes avec stats, checklists, titres) |
| 7 | Pillar card A |
| 8 | Pillar card B |
| 9 | Pillar card C |
| 10 | Fan background (pour carousels de type 004/023) |
| 11 | Fan background PIP (pour sections avec pip-face) |
| 12 | PIP face cam (petite bulle facecam en bas à droite) |

**Règle tracks :** Si un nouveau segment doit occuper un track déjà utilisé sur la même période, utiliser le track suivant disponible.

---

## 3. RÈGLE CRITIQUE — data-duration vs GSAP exit

**La règle la plus importante, responsable de snap cuts si mal appliquée :**

`data-start + data-duration` DOIT être **supérieur ou égal** à `GSAP_exit_start + GSAP_exit_duration`

Si HyperFrames force-cache l'élément avant que GSAP finisse son exit → snap cut brutal au lieu d'un fade smooth.

**Formule de calcul :**
```
data-duration = (temps_fin_speech - data-start) + 0.30s de marge
```

**Exemple correct :**
```html
<!-- Exit GSAP à t=296.58s, durée 0.24s → doit finir à 296.82s -->
<!-- data-start=292.42, data-duration=4.40 → finit à 296.82 ✅ -->
<div data-start="292.42" data-duration="4.40" ...>
```

---

## 4. SYSTÈME PIP (Picture-in-Picture)

Quand Lucas parle sur une screen recording, le layout PIP montre :
- La screen recording en plein écran (fond)
- Lucas en petite bulle en bas à droite (pip-face, track 12)
- Un halo violet sous la bulle (fan-bg, track 11)
- La vidéo source uniquement visible pendant les fenêtres `pip-face` array

**Structure HTML PIP :**
```html
<!-- fan-bg (track 11) — fond violet diffus -->
<div id="fbg-[section]" class="clip fan-bg" 
     data-start="[t0]" data-duration="[dur]" data-track-index="11"></div>

<!-- screen recording (track 2) -->
<video id="v[num]" class="clip" data-start="[t0]" data-duration="[dur]" data-track-index="2"
       src="assets/visuels/[fichier].mp4"
       style="left:0;top:0;width:1920px;height:1080px;object-fit:cover;"
       muted playsinline></video>

<!-- pip-face (track 12) — géré via JS array, pas inline -->
```

**JS pour pip-face array :**
```js
[
  [t0, dur],  // [secondes_début, durée_en_secondes]
  // ...
].forEach(([t0, dur]) => {
  tl.fromTo(pipFace, {autoAlpha:0, scale:0.82, y:20}, 
            {autoAlpha:1, scale:1, y:0, duration:0.44, ease:"back.out(1.4)"}, t0+0.20);
  tl.to(pipFace, {autoAlpha:0, scale:0.9, duration:0.24, ease:"power2.in"}, t0+dur-0.24);
});
```

**JS pour fan-bg PIP array :**
```js
const PIP_ENTER = 0.35, PIP_EXIT = 0.28;
[
  ["fbg-[section]", t0, dur],
].forEach(([id, t0, dur]) => {
  const el = document.getElementById(id);
  if (!el) return;
  tl.fromTo(el, {autoAlpha:0}, {autoAlpha:1, duration:PIP_ENTER, ease:"power2.out"}, t0);
  tl.to(el, {autoAlpha:0, duration:PIP_EXIT, ease:"power2.in"}, t0+dur-PIP_EXIT);
});
```

---

## 5. SYSTÈME FAN CAROUSEL (3 cartes rotatives)

Utilisé pour montrer des statistiques/visuels multiples (ex : résultats, exemples).

**Structure HTML :**
```html
<!-- fan-bg (track 10 pour carousel standalone, track 11 pour PIP) -->
<div id="fbg-[nom]" class="clip fan-bg" data-start="[t0]" data-duration="[dur]" data-track-index="10"></div>

<!-- Carte principale (track 2) -->
<img id="f[num]a" class="clip fan-card"
     src="assets/visuels/[img]"
     data-start="[t0]" data-duration="[dur]" data-track-index="2"
     style="left:280px; top:[TOP]px; width:360px; height:[H]px; object-fit:cover; object-position:center;" />

<!-- Cartes secondaires (tracks 4, 5) -->
<img id="f[num]b" class="clip fan-card" ... data-track-index="4" />
<img id="f[num]c" class="clip fan-card" ... data-track-index="5" />
```

**⚠️ RÈGLE CRITIQUE — Aspect ratio des images :**

Le conteneur DOIT correspondre exactement au ratio de l'image source.
Ne JAMAIS forcer une image paysage dans un conteneur portrait.

```
container_height = container_width / (image_width / image_height)
top = 540 - container_height / 2  ← centre visuel à 540px (milieu de 1080p)
```

**Exemples :**
- Image 487×238px (ratio 2.046:1) → width:360px → height:176px, top:452px
- Image 1280×720px (ratio 16:9) → width:360px → height:202px, top:439px
- Image 640×640px (ratio 1:1) → width:360px → height:360px, top:360px
- Image portrait 9:16 → width:360px → height:640px, top:220px

---

## 6. ANIMATIONS — TEMPLATES GSAP

### 6.1 Overlay standard (carte info, apparition + disparition)

```js
const el = document.getElementById("ov-[id]");
const t0 = [timestamp_début];
const exitTime = [timestamp_fin_speech];

// Entrée
tl.fromTo(el, 
  { autoAlpha:0, scale:0.88, y:24 }, 
  { autoAlpha:1, scale:1, y:0, duration:0.40, ease:"back.out(1.4)" }, 
  t0);

// Sortie
tl.to(el, { autoAlpha:0, scale:0.94, y:-18, duration:0.24, ease:"power2.in" }, exitTime);
```

### 6.2 Liste en cascade (éléments qui arrivent l'un après l'autre)

```js
const items = ["#item1", "#item2", "#item3"];
items.forEach((sel, i) => {
  const t = t0 + 0.45 + i * 0.18;
  const el = document.querySelector(sel);
  tl.fromTo(el,
    { autoAlpha:0, x:-50, scale:0.90 },
    { autoAlpha:1, x:0, scale:1, duration:0.32, ease:"back.out(1.5)" },
    t);
});
```

### 6.3 Pulse sur mot-clé (synchronisé avec la parole de Lucas)

```js
const t_word = [timestamp_exact_du_mot]; // extrait de transcript.json
tl.to(el, { scale:1.08, duration:0.16, ease:"power2.out" }, t_word);
tl.to(el, { scale:1.0, duration:0.24, ease:"back.out(2)" }, t_word + 0.16);
```

### 6.4 Animation de frappe clavier (typing effect — email CTA)

```js
const proxy = { val: 0 };
const typedEl = document.getElementById("ov-[id]-typed");
const cursorEl = document.getElementById("ov-[id]-cursor");
const texte = "ton@email.com"; // 13 caractères

tl.fromTo(proxy, { val:0 }, {
  val: texte.length,
  duration: 1.6,
  ease: `steps(${texte.length})`,
  onUpdate: function() {
    typedEl.textContent = texte.substring(0, Math.round(proxy.val));
  }
}, t_typing);

// Clignotement curseur
tl.to(cursorEl, { opacity:0, duration:0.36, yoyo:true, repeat:8, ease:"steps(1)" }, t_typing);
```

### 6.5 Compteur animé (chiffre qui monte)

```js
const counter = { val: 0 };
const targetEl = document.getElementById("ov-[id]-num");

tl.fromTo(counter, { val:0 }, {
  val: [valeur_cible],  // ex: 78
  duration: 1.4,
  ease: "power2.out",
  onUpdate: function() {
    targetEl.textContent = Math.round(counter.val) + "%";
  }
}, t0 + 0.5);
```

### 6.6 Barre de progression animée

```js
const bar = document.getElementById("ov-[id]-bar");
tl.fromTo(bar,
  { width:"0%" },
  { width:"[valeur]%", duration:1.4, ease:"power2.out" },
  t0 + 0.5);
```

### 6.7 Entrée carte centrée (style newsletter/email)

```js
const card = document.getElementById("ov-[id]");
tl.fromTo(card,
  { autoAlpha:0, scale:0.85, y:40 },
  { autoAlpha:1, scale:1, y:0, duration:0.50, ease:"back.out(1.6)" },
  t0);
tl.to(card,
  { autoAlpha:0, scale:0.94, y:-18, duration:0.28, ease:"power2.in" },
  exitTime);
```

### 6.8 Highlight (encadrement lumineux sur un terme clé)

```js
const highlight = document.getElementById("ov-[id]-hl");
tl.fromTo(highlight,
  { autoAlpha:0, scale:0.9 },
  { autoAlpha:1, scale:1, duration:0.24, ease:"back.out(2)" },
  t_word);
```

---

## 7. DESIGN SYSTEM — COULEURS ET STYLES

### Palette principale
```
Fond sombre principal : #080416 (quasi-noir violet)
Fond carte : rgba(8, 4, 22, 0.94)
Accent violet : #7c3aed
Violet clair : #a78bfa
Blanc texte principal : #ffffff
Blanc secondaire : rgba(255,255,255,0.70)
Vert validé : #22c55e
Rouge négatif : #ef4444
Jaune warning : #facc15
```

### Carte standard (overlay centré)
```css
background: rgba(8,4,22,0.94);
backdrop-filter: blur(28px);
-webkit-backdrop-filter: blur(28px);
border-radius: 28px;
box-shadow: 
  0 0 0 1.5px rgba(124,58,237,0.4),
  0 0 80px rgba(124,58,237,0.3),
  0 50px 120px rgba(0,0,0,0.95);
padding: 48px 60px;
```

### Carte centrée (taille recommandée)
```
width: 800px
height: auto (selon contenu, ~520-720px)
left: 560px   (= (1920-800)/2)
top: 160px    (visuellement centré en 1080p)
```

### Icône circulaire (en-tête de carte)
```css
width: 72px; height: 72px;
border-radius: 50%;
background: linear-gradient(135deg, rgba(124,58,237,0.25), rgba(167,139,250,0.15));
border: 1.5px solid rgba(124,58,237,0.5);
display: flex; align-items: center; justify-content: center;
```

### Typographie
```
Titre principal : font-size: 42-48px, font-weight: 800, color: #ffffff
Sous-titre : font-size: 22-24px, color: rgba(255,255,255,0.70)
Label petit : font-size: 13-15px, letter-spacing: 0.1em, text-transform: uppercase, color: #a78bfa
Chiffre accent : font-size: 56-72px, font-weight: 900, color: #a78bfa
```

### Séparateur horizontal entre titre et contenu
```html
<div style="width:60px; height:3px; background:linear-gradient(90deg,#7c3aed,#a78bfa); 
            border-radius:2px; margin:0 auto 32px;"></div>
```

---

## 8. PARTICULES — spawnParticles

Chaque section avec overlay doit appeler `spawnParticles` pour les points flottants violets.
**Chaque section doit avoir un seed UNIQUE (entier entre 1000 et 9999).**

```js
spawnParticles(t0, dur, seed);
// Exemple : spawnParticles(286.94, 5.42, 1117);
```

```js
// Dans le tableau pip (drives les particules par section) :
["fbg-[id]", t0, dur],
```

---

## 9. ERREURS COMMISES — RÈGLES PERMANENTES

### ERREUR-01 — Image au mauvais format dans fan carousel
**Ce qui s'est passé :** Image paysage 487×238px mise dans un conteneur 360×640px (portrait) → bandes noires au-dessus et en dessous.
**Feedback Lucas :** "le carré n'est pas au même format que l'image"
**Règle permanente :** Toujours calculer `container_height = container_width / (image_width / image_height)`. Ne JAMAIS deviner. Vérifier les dimensions réelles de chaque image avant de définir les styles.

### ERREUR-02 — Timing d'animation ne correspondant pas à la parole
**Ce qui s'est passé :** Animation "soyons honnêtes" placée à 199.22s alors que Lucas parlait de l'email CTA.
**Feedback Lucas :** "il faut que ça commence à trois minutes vingt sept... avant ça je parlais du lien en description"
**Règle permanente :** TOUJOURS extraire les timestamps du transcript AVANT de placer une animation. Ne jamais deviner ou supposer. Utiliser le script Node.js de consultation.

### ERREUR-03 — Animation qui disparaît avant la fin du mot clé
**Ce qui s'est passé :** Exit GSAP déclenché avant que Lucas finisse de dire le mot clé de la diapo.
**Feedback Lucas :** "ça s'arrête avant que je dise ton style" / "ça s'arrête avant que je dis nul à chier quoi en gros"
**Règle permanente :** L'exit GSAP doit se déclencher **au dernier mot de la section**, pas au premier mot de la section suivante. Toujours extraire le timestamp de fin exacte du dernier mot pertinent via transcript.json. Ajouter 0.30s de marge de data-duration pour absorber les exit animations.

### ERREUR-04 — Animation suivante qui commence trop tôt (overlap verbal)
**Ce qui s'est passé :** Animation U commençait pendant que Lucas disait encore les mots de l'animation T.
**Feedback Lucas :** "le truc commence en même temps que je dis nul à chier quoi en gros"
**Règle permanente :** Le début d'une animation = timestamp du PREMIER MOT de la nouvelle phrase/section, pas la fin de l'animation précédente.

### ERREUR-05 — Screen recording qui commence trop tôt
**Ce qui s'est passé :** vidéo d'écran v028 démarrait à 352.7s alors que Lucas voulait qu'elle commence à "Bien sûr c'est pas magique" (354.20s).
**Feedback Lucas :** "ça commence un petit peu trop tôt et donc ça fait que c'est un peu décalé"
**Règle permanente :** Toujours vérifier transcript pour trouver l'exact timestamp du mot ou de la phrase sur lequel Lucas veut que la démo apparaisse.

### ERREUR-06 — Screenshots statiques à la place d'animations
**Ce qui s'est passé :** Deux images statiques (screenshots stats) placées pour la section 379-390s.
**Feedback Lucas :** "ces screenshots, ça ne sert vraiment à rien, ça s'appuie sa mère... enlève-les et à la place fait des animations"
**Règle permanente :** Ne JAMAIS insérer un screenshot statique brut comme contenu principal d'une section. Si Lucas montre des stats, créer des animations qui restituent les chiffres clés de manière dynamique et visuelle.

### ERREUR-07 — data-duration trop courte (snap cut)
**Ce qui s'est passé :** HyperFrames force-cachait l'élément avant que GSAP finisse l'exit → coupure brutale.
**Règle permanente :** `data-start + data-duration >= GSAP_exit_start + GSAP_exit_duration + 0.05s`. Toujours calculer explicitement, ne jamais approximer.

---

## 10. WORKFLOW — CONSULTATION DU TRANSCRIPT

### Script de consultation (à lancer dans Node.js)
```js
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:\\Users\\chapo\\Videos\\edit\\transcript.json', 'utf8'));
const words = data.segments.flatMap(s => s.words || []);

// Chercher les mots dans une plage temporelle
const t_start = 199, t_end = 220; // secondes
words.filter(w => w.start >= t_start && w.start <= t_end).forEach(w => {
  const m = Math.floor(w.start/60), s = (w.start % 60).toFixed(2);
  console.log(m+':'+s+' ('+w.start.toFixed(2)+'s) → "'+w.word+'"');
});
```

### Convertir minutes:secondes en secondes totales
```
3:27 → 3 × 60 + 27 = 207s
4:52 → 4 × 60 + 52 = 292s
5:01 → 5 × 60 + 1 = 301s
6:08 → 6 × 60 + 8 = 368s
```

---

## 11. RÈGLES DE DÉCISION — QUAND ANIMER QUOI

### ✅ Mettre une animation overlay quand :
- Lucas énonce un chiffre précis (stats, %, durée, prix)
- Lucas présente un plan structuré ("3 choses", "2 étapes")
- Lucas donne une liste d'éléments (outils, fonctionnalités, bénéfices)
- Lucas fait un récapitulatif ("avant / maintenant", "résumé")
- Lucas mentionne un CTA concret (email, lien, mot-clé ManyChat)
- La section dure > 6 secondes sans screen recording

### ✅ Mettre un cutaway (screen recording) quand :
- Lucas dit "je vais te montrer" / "voilà comment" / "regarde"
- Lucas décrit l'interface d'un outil
- Lucas montre une démo en temps réel
- La section dure > 8 secondes ET c'est de la démo concrète

### ✅ Mettre un PIP (face cam + screen) quand :
- Lucas commente une démo à l'écran
- La section est une démo longue (>10s) mais le commentaire vocal est important

### ✅ Laisser la facecam seule quand :
- Lucas introduit un sujet (intro < 6s)
- Lucas fait une transition narrative courte
- Lucas parle de manière personnelle/émotionnelle
- La section dure < 5s

### ❌ Ne JAMAIS faire :
- Deux overlays simultanés sur le même track
- Un screenshot statique brut comme contenu principal
- Une animation qui commence au milieu d'une phrase
- Une animation qui disparaît avant que Lucas finisse son point

---

## 12. LINTING HYPERFRAMES — CONTRAINTES BLOQUANTES

HyperFrames bloque ces patterns lors du `npm run check` :

| Interdit | Raison | Alternative |
|----------|--------|-------------|
| `repeat: -1` (GSAP) | Boucle infinie = pas de rendu déterministe | Repeat fini `repeat: N` |
| `Math.random()` | Non-déterministe = frames différentes entre renders | PRNG seeded (mulberry32) |
| Imports ES modules dynamiques | Incompatible avec le moteur | Tout inline dans index.html |

**PRNG mulberry32 (copier-coller obligatoire) :**
```js
function mulberry32(seed) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}
```

**spawnParticles doit utiliser mulberry32 :**
```js
function spawnParticles(t0, dur, seed) {
  const rng = mulberry32(seed);
  // Ne jamais appeler Math.random() à l'intérieur
  // Utiliser rng() à la place
}
```

---

## 13. RÉFÉRENCE COMPLÈTE — ANIMATIONS VIDÉO #1 (Agent TikTok IA)

Liste de toutes les sections animées avec leur type et timing :

| ID | Type | t0 (s) | fin (s) | Description |
|----|------|---------|---------|-------------|
| ov-nl | overlay | 30.22 | 38.3 | "CAPTURE EMAILS" — CTA email |
| ov-prob | overlay | 52 | 67.2 | "PROBLÈME" — chat classique |
| ov-form | overlay | 67.2 | 88.6 | "FORMATION" — solution trouvée |
| ov-memory | overlay | 88.6 | 113.8 | "MÉMOIRE" — Claude.md |
| pip-001 | PIP | 96.7 | 113.8 | claude.md swipe |
| pip-002 | PIP | 113.8 | 128 | claude.md + face cam |
| v003 | cutaway | 128 | 133.2 | Transition concurrents |
| v004 | split | 133.2 | 149.3 | Concurrents + face |
| v005 | cutaway | 149.3 | 175.3 | 10 idées live |
| v006 | cutaway | 175.3 | 199.2 | Script généré live |
| ov-email-cta2 | overlay | 199.22 | 206.4 | "TON AGENT GRATUIT" — newsletter CTA |
| ov-honest | overlay | 206.6 | 238.8 | "SOYONS HONNÊTES" — limites |
| v007 | cutaway | 241 | 268 | Magnific template |
| ov-valid | overlay | 286.94 | 292.36 | "RÉSULTATS VALIDÉS" — stats positives |
| ov-infos | overlay | 292.42 | 296.82 | "3 INFOS CLÉS" — contexte obligatoire |
| ov-sansinfo | overlay | 297.1 | 302.1 | "SANS CES INFOS → NUL" |
| ov-package | overlay | 302.10 | 311.5 | "LE PACKAGE COMPLET" |
| ov-split | split | 315.4 | 333.4 | Script structure + face |
| ov-recap1 | overlay | 333.4 | 352.7 | "RÉCAP — AVANT" |
| v028 | PIP | 354.2 | 368.7 | Mémoire live + face |
| ov-temps | overlay | 368.7 | 379.8 | "TEMPS LIBÉRÉ" |
| ov-x-stats | overlay | 379.82 | 390.6 | Stats avant/après — 5 animations |
| ov-cta-final | overlay | 390.6 | 418.7 | CTA final + "C'était Lucas" |

---

## 14. PIPELINE DE RENDU

**Durée typique de rendu :** 20-25 min pour ~420s de vidéo à 30fps (12 600 frames).
HyperFrames utilise 2 workers Chrome en parallèle par défaut pour accélérer.

**Commande de rendu :**
```bash
npx hyperframes@0.6.44 render -o "[chemin_absolu_output].mp4" --quality high
```

**Output attendu :**
- Format : MP4 H.264
- Résolution : 1920×1080
- FPS : 30
- Taille typique : ~200-250 MB pour 7 min

**Vérification post-rendu :**
```bash
ffprobe -v quiet -show_entries format=duration -of csv=p=0 "[fichier.mp4]"
# Diviser par 60 pour obtenir les minutes
```

---

## 15. CHECKLIST PRÉ-LIVRAISON

Avant de proposer le preview à Lucas :

- [ ] Aucun `repeat:-1` ni `Math.random()` dans le JS
- [ ] Chaque `spawnParticles` a un seed unique
- [ ] Chaque `data-duration` couvre la fin du GSAP exit + 0.05s de marge
- [ ] Aucun overlap sur le même track
- [ ] Chaque image de fan carousel a son ratio vérifié
- [ ] Chaque timestamp d'animation vérifié dans transcript.json
- [ ] Les exits GSAP se déclenchent après le DERNIER MOT de la section (pas avant)
- [ ] Les entrées GSAP se déclenchent au PREMIER MOT de la nouvelle section (pas pendant la précédente)
- [ ] Aucun screenshot statique brut — tout est animé
- [ ] Les CTAs email sont animés de façon visible (typing effect ou card violette)

---

## 16. COMMENT LUCAS PENSE LE MONTAGE

**Son approche temporelle :** Lucas parle en minutes:secondes, jamais en secondes absolues.
Toujours convertir ses indications : "4 minutes 52" → 292s, "5 minutes 1" → 301s.

**Sa logique de validation :** Il valide par sections ("ok je valide"), jamais la vidéo entière d'un coup.
Présenter chaque plan d'animation AVANT de coder. Attendre "c bon je valide" avant d'écrire le code.

**Son niveau d'exigence sur la synchronisation :** Très précis. Il remarque une désynchronisation de 0.5s entre une animation et sa parole. Toujours coller aux timestamps exacts du transcript, pas à des estimations.

**Ce qu'il n'aime pas :**
- Les screenshots statiques qui ne s'animent pas
- Les animations qui commencent/finissent au mauvais moment
- Les images mal cadrées (ratio incorrect)
- Trop peu d'animations (il veut "le plus possible pour que ce soit le plus animé possible")

**Ce qu'il aime :**
- Les animations avec chiffres qui s'animent (compteurs)
- Les cartes de type "résumé" avec listes en cascade
- Le typing effect pour les CTAs email
- Les pulses sur les mots-clés
- La cohérence visuelle violet foncé / blanc / violet clair
