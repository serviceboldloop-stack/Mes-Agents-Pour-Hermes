# WORKFLOW — Production Vidéo + Distribution
## De l'idée à la vidéo publiée sur toutes les plateformes

> Ce workflow couvre la partie POST-SCRIPT : enregistrement → montage → animations → sons → distribution.
> Il est séparé du workflow marketing (`workflow.md`) qui gère l'architecture globale.

---

## ARCHITECTURE — Deux flux séparés

```
┌─────────────────────┐         ┌───────────────────────────────────────┐
│  FLUX A             │         │  FLUX B                               │
│  Vidéo YouTube      │         │  Vidéo courte TikTok/Shorts           │
│  Longue (10-20 min) │         │  3 sources possibles :                │
│                     │         │  a) News IA trouvée par la veille     │
│  → Étapes 1 à 11   │         │  b) Promo agent / update / newsletter │
└─────────────────────┘         │  c) Dérivation d'un script YouTube    │
                                └───────────────────────────────────────┘

⚠️ Les deux flux sont indépendants.
Un script YouTube ne déclenche PAS automatiquement des scripts TikTok.
C'est Lucas qui décide si une vidéo YouTube mérite une déclinaison TikTok.
```

---

## ÉTAPE 1 — TROUVER LE SUJET

### Flux A — Vidéo longue YouTube
**Critères (au moins un) :**
- Lucas a créé quelque chose → tuto complet sur l'agent
- Événement IA majeur avec beaucoup à dire (changement de paradigme)
- 5-8 nouvelles fonctions IA liées → compilation en 1 vidéo

❌ 1 outil mineur seul ne suffit pas pour 10-20 minutes de contenu utile

### Flux B — Vidéo courte TikTok
**Source a) News IA :** 1 actu = 1 courte. Plusieurs actus = 1 "tour d'horizon de la semaine"
**Source b) Promo/Update :** vendre l'agent, pousser vers la newsletter, annoncer un lancement
**Source c) Dérivation YT :** c'est MOI qui évalue si le script YouTube contient un extrait fort méritant un TikTok seul. Je compare les 3 sources et je propose la meilleure option.

**Je fais :** évaluer les 3 sources, choisir la meilleure option, **présenter ma proposition à Lucas**
**Lucas fait :** valider ou choisir une autre option

⚡ **Règle de validation :** Je ne produis rien sans accord de Lucas. Je propose d'abord.

---

## ÉTAPE 2 — SCRIPT + MÉMORISATION IMMÉDIATE

**Je fais (vidéo longue YouTube) :**
- Hook chiffré dans les 3 premières secondes
- Structure : hook / contexte / démo à l'écran / CTA email / "C'était Lucas."
- 1 seul CTA principal
- Aucun tiret em, ton direct
- Sauvegarde → `Outputs/[date_sujet]/youtube_script.md`

**Je fais (vidéo courte TikTok) :**
- Structure : 3s hook / 12s contexte / 35s démo / 15s CTAs empilés / "C'était Lucas."
- Mot-clé ManyChat unique par vidéo (à l'oral + dans la description)
- Sauvegarde → `Outputs/[date_sujet]/tiktok_scripts.md`

**Lucas fait :** corriger le script

**⚡ Immédiatement après validation du script :**
→ Je mets à jour `Memory/memory_script_youtube.md` ou `memory_script_tiktok.md`
→ Toutes les corrections faites pendant cet échange sont mémorisées maintenant
→ Pas d'attente jusqu'à l'étape 9 (risque de compactage du contexte)

---

## ÉTAPE 3 — LUCAS ENREGISTRE

- Lucas dépose le fichier brut dans `Video Studio/Bruts/[2026-05-XX_sujet.mp4]`
- Nommage : `2026-05-18_agent-tiktok.mp4`
- Les erreurs/silences/répétitions sont OK → trimming s'en charge

---

## ÉTAPE 4 — TRIMMING

**Commande :** `"trimme [nom_fichier.mp4]"`

**Je fais automatiquement :**
- ✅ Suppression silences > 0.5 sec
- ✅ Suppression des "euh", hésitations longues
- ✅ Transcript JSON timestamps mot par mot
- Output : `Video Studio/Bruts/[nom]_trimmed.mp4` + `[nom]_transcript.json`

**Lucas fait à la main :**
- Couper les répétitions (même phrase dite différemment → choisir la meilleure prise)
- C'est rapide : silences déjà supprimés, c'est juste choisir quelle version garder

---

## ÉTAPE 5 — PLAN D'ANIMATIONS

**Lucas dit ce qu'il veut :** "sous-titres, textes clés qui apparaissent, intro animée, transitions..."
Si Lucas ne précise pas : je propose un plan basé sur `Memory/memory_montage.md`

**Je fais :**
- Entre en Plan Mode → liste animations + timing + style + placement
- Vérifie les dead zones Instagram (bas + droite de l'écran)
- Référence les templates déjà validés dans `memory_montage.md`

**Lucas fait :** approuver le plan (avec modifications si besoin)

---

## ÉTAPE 6 — GÉNÉRATION HYPERFRAMES (PRÉVISUALISATION)

**Je fais :**
- Génère les fichiers HTML/CSS/GSAP
- Ouvre dans l'interface studio Hyperframes → **prévisualisation uniquement**
- **PAS de compilation MP4 à cette étape** — inutile avant validation

**Lucas fait :**
- Regarde dans l'interface studio
- Peut ajuster le timing depuis la timeline sans me re-prompter
- Me décrit ce qui ne va pas (texte, taille, position, vitesse)
- Envoie un screenshot si un élément couvre son visage

---

## ÉTAPE 7 — RÉVISIONS + EXPORT MP4

Itérations jusqu'à validation complète. Pas de limite de tours.

**Une fois que Lucas dit "c'est bon" :**
→ **Là seulement** je compile en MP4
→ Output : `Video Studio/Renders/[nom]_animated.mp4`

---

## ÉTAPE 8 — SONS

**Pour la première vidéo :** Lucas ajoute les sons à la main (établir le style)
Ensuite il me donne la liste :
```
[0:03] whoosh.mp3 → transition intro
[0:12] ding.mp3 → apparition texte clé
[0:45] swoosh.mp3 → slide entre sections
```

**À partir de la 2ème vidéo :**
- Je propose les sons de la bibliothèque existante (`Memory/memory_montage.md`) aux moments appropriés
- Si des sons manquent → Lucas me les donne → ils entrent dans la bibliothèque
- La bibliothèque grandit à chaque vidéo

Fichiers sons → `Video Studio/Sons/`
Output final → `Video Studio/Renders/[nom]_final.mp4`

---

## ÉTAPE 9 — MÉMORISATION MONTAGE

**Commande :** `"mémorise cette vidéo : [sujet]"`

**Je mets à jour uniquement `Memory/memory_montage.md` :**
- Templates animations validés
- Sons utilisés + timestamp + type d'animation associée
- Erreurs de placement / timing faites
- Préférences style Lucas découvertes

*(La mémorisation script a déjà été faite à l'étape 2)*

---

## ÉTAPE 10 — DISTRIBUTION MULTI-PLATEFORMES

Cette étape se déclenche après publication d'une vidéo ou selon le calendrier.
Chaque canal a son agent dédié.

---

## ⚡ RÈGLE UNIVERSELLE — VALIDATION AVANT PRODUCTION

**Valable pour TOUS les agents (newsletter, stories, LinkedIn, TikTok, YouTube) :**

Avant de produire du contenu, je présente toujours :
```
💡 PROPOSITION [Agent] :
- Ce que je vais faire : [description courte]
- Pourquoi : [raison]
- Tokens estimés : [bas / moyen / élevé]
Tu valides ?
```
Je ne génère rien tant que Lucas n'a pas dit oui.

**Exception :** Si Lucas me donne une commande directe et explicite ("fais la newsletter sur [sujet]"), je produis sans re-demander.

---

### 📧 Agent Newsletter
**Se déclenche quand :**
- Nouvelle vidéo YouTube publiée → email hebdo avec lien
- Nouvelle vidéo TikTok si elle pousse vers la newsletter
- Lancement d'un nouvel agent
- Stories ou LinkedIn qui poussent vers l'inscription

**Ce que je produis :**
- Email hebdo avec lien YouTube → `Outputs/[date]/newsletter.md`
- Séquence onboarding 3-5 emails automatiques (pour chaque nouveau lead magnet)
- **Mot-clé ManyChat** à utiliser dans la vidéo pour déclencher la réponse automatique
- Format ManyChat : `"Commente [MOT-CLÉ]"` → DM auto → lien page capture email → inscription Brevo → séquence emails → vente 99€

**Lucas fait :** configurer le trigger ManyChat avec le mot-clé fourni + envoyer via Brevo

---

### 📸 Agent Stories Instagram
**Se déclenche quand :**
- Nouvelle vidéo YouTube publiée → story avec lien/teaser
- Nouvelle vidéo TikTok/Reel publiée → republication en story dans les 2h
- Nouvelle info / actu IA importante
- Invitation à un événement
- Nouvelle newsletter disponible → story avec CTA inscription
- FAQ sur les agents IA

**Ce que je produis :**
- Séquence 3-5 stories → `Outputs/[date]/stories.md`
- Textes, emojis, CTAs, position des éléments
- ⚠️ Jamais de vente directe en story (Règle STORY-04)

**Lucas fait :** publier les stories manuellement sur Instagram

---

### 💼 Agent LinkedIn
**Fréquence : au moins 1 post par jour**

**Sources de contenu :**
- Sa vie, ce qu'il a appris, sa progression (infos dans le Cerveau)
- Vidéo YouTube publiée → post pour emmener vers YouTube
- Nouvelle newsletter → post pour emmener vers l'inscription
- Actu IA pertinente → point de vue de Lucas

**Quand plusieurs posts le même jour :**
Exemple : nouveau tutoriel YouTube → 1 post perso (ce que j'ai appris en créant ça) + 1 post sur la vidéo (emmène vers YouTube)

**Ce que je produis :**
- Post(s) LinkedIn prêt(s) à coller → `Outputs/[date]/linkedin.md`
- Si besoin de liens que je n'ai pas → je demande avant de rédiger

**Lucas fait :** copier-coller + publier manuellement (Règle STYLE-09)

---

### 🎵 TikTok / Shorts (Flux B)
Ce flux est INDÉPENDANT du Flux A. Il ne se déclenche pas automatiquement après une vidéo YouTube.

**3 sources (voir Étape 1 Flux B)**

**Ce que je produis :**
- Script court 30-90 sec → `Outputs/[date]/tiktok_scripts.md`
- Mot-clé ManyChat unique pour cette vidéo
- Messages DM automatiques associés → `dm_messages.md`

---

## ÉTAPE 11 — ANALYSE (J+7)

**Lucas donne :**
- Vues YouTube + rétention % + abonnés gagnés
- Vues TikTok + taux de complétion + commentaires
- Taux ouverture newsletter + clics
- Ventes éventuelles

**Je fais :**
- Rapport d'analyse
- Mise à jour `Memory/base_memory.md` avec nouvelles règles
- Ce qui a sur/sous-performé → règle dans la mémoire pour ne plus répéter

---

## RÉSUMÉ — Qui fait quoi

| Étape | Lucas | Claude |
|---|---|---|
| 1. Sujet | Valide | Cherche + note /10 |
| 2. Script | Corrige → valide | Écrit + **mémorise immédiatement** |
| 3. Enregistrement | **Enregistre** | — |
| 4. Trimming | Coupe répétitions | Coupe silences + transcript |
| 5. Plan animations | Instructions + approuve | Planifie en Plan Mode |
| 6. Génération | Regarde prévisualisation HTML | Génère Hyperframes (HTML seulement) |
| 7. Révisions → valide | Feedback + **"c'est bon"** | Corrige → **compile MP4** |
| 8. Sons | 1ère fois : ajoute à la main | À partir de 2ème : propose + intègre |
| 9. Mémorisation montage | — | Met à jour memory_montage.md |
| 10. Distribution | Publie sur chaque plateforme | Génère tout le contenu (newsletter / stories / LinkedIn / TikTok) |
| 11. Analyse | Donne les stats | Analyse + met à jour mémoire |

---

## COMMANDES RAPIDES

| Lucas dit | Action |
|---|---|
| `"veille"` | Étape 1 — cherche sujets |
| `"script youtube [sujet]"` | Étape 2 Flux A |
| `"script tiktok [source/sujet]"` | Étape 2 Flux B |
| `"trimme [fichier]"` | Étape 4 |
| `"plan animations [instructions]"` | Étape 5 |
| `"génère la vidéo"` | Étape 6 — HTML preview |
| `"exporte en mp4"` | Fin étape 7 — après validation |
| `"sons : [liste]"` | Étape 8 |
| `"mémorise cette vidéo"` | Étape 9 |
| `"newsletter [sujet/vidéo]"` | Étape 10 — agent newsletter |
| `"stories [déclencheur]"` | Étape 10 — agent stories |
| `"linkedin [sujet]"` | Étape 10 — agent linkedin |
| `"analyse [stats]"` | Étape 11 |

---

## DOSSIERS

```
Video Studio/
├── Bruts/           ← vidéos brutes + versions _trimmed
├── Renders/         ← _animated.mp4 + _final.mp4
└── Sons/            ← bibliothèque sons

Outputs/[date_sujet]/
├── youtube_script.md
├── youtube_description.md
├── tiktok_scripts.md
├── dm_messages.md
├── newsletter.md
├── stories.md
├── linkedin.md      ← nouveau
└── readme.md
```
