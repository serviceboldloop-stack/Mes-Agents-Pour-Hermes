# CLAUDE.md — Agent Marketing V1
## Business Agents IA Lucas — Système de production de contenu multi-plateforme

## INSTRUCTION PRIORITAIRE
Tu es un agent d'action. Quand tu sais quoi faire, tu le fais immédiatement.
Zéro méta-commentaire. Zéro hésitation. Tu agis.

---

## CHEMINS IMPORTANTS

| Projet | Chemin |
|---|---|
| Agent Marketing V1 (ce projet) | `C:\Users\chapo\Documents\Agent Marketing V1\` |
| Site web Kairos (Next.js) | `C:\Users\chapo\Documents\kairos\` |
| Mon Bro Cerveau (wiki) | `C:\Users\chapo\Documents\Mon Bro Cerveau\` |

**Site Kairos :**
- URL : https://kairos-seven-gray.vercel.app
- Stack : Next.js App Router + Tailwind + TypeScript
- Déploiement : Vercel (auto depuis git)
- Fichier principal : `app/layout.tsx`

---

## CONNEXION — Mon Bro Cerveau (second cerveau IA)

**Chemin** : `C:\Users\chapo\Documents\Mon Bro Cerveau\`

Ce projet est connecté au wiki personnel de Lucas. Le Cerveau contient :
- `wiki/index.md` — index de toutes les connaissances ingérées
- `wiki/concepts/` — frameworks, théories, idées
- `wiki/sources/` — sources déjà analysées (évite de chercher sur le web ce qui est déjà là)
- `wiki/agents/` — catalogue d'agents existants (évite les doublons)
- `wiki/projets/agents-claude.md` — contexte du projet agents Claude
- `wiki/projets/lucas-chpt.md` — contexte personnel Lucas

### Quand consulter le Cerveau (AVANT de chercher sur le web)

| Situation | Action |
|---|---|
| `agent_veille` cherche un sujet IA | Lire `wiki/index.md` → identifier sources déjà ingérées sur ce sujet |
| Besoin d'un contexte sur un concept (Claude, agents, LLM...) | Lire `wiki/concepts/[concept].md` si existant |
| Création d'un nouvel agent | Lire `wiki/agents/index-agents.md` pour éviter les doublons |
| Question sur le positionnement/business Lucas | Lire `wiki/projets/lucas-chpt.md` |

### Quand alimenter le Cerveau

| Situation | Action |
|---|---|
| Une source web forte est trouvée par `agent_veille` | La signaler pour ingestion : "À ingérer dans le Cerveau : [titre + URL]" |
| Un nouvel agent est créé dans ce système | Proposer de l'ajouter dans `wiki/agents/personnels/` du Cerveau |
| Une leçon importante est tirée d'un cycle | Proposer de l'ajouter dans le Cerveau comme synthèse |

### Règle de priorité
Le Cerveau est en **lecture seule depuis ce projet**. Jamais modifier les fichiers du Cerveau directement depuis Agent Marketing V1. Lucas le fait depuis le projet Cerveau.

---

## Ce que ce système produit

Système de production de contenu marketing pour vendre des **agents natifs Claude** (99€ personnalisé / 300€+ sur-mesure) en capturant des emails via YouTube, TikTok et Instagram.

**Objectif central : remplir la newsletter. Pas les likes. Pas les abonnés. Les emails.**

```
YouTube (hub de contenu — vidéo longue)
  → Description : lien page capture email (ressource gratuite)
  → Site vitrine en CTA secondaire
        ↓
TikTok + Instagram (volume — clips YT + contenu info IA)
  → ManyChat : "commente AGENT" → email capturé
        ↓
Newsletter (Brevo)
        ↓
Vente agents 99€ / 300€+
```

---

## Répertoire

```
Agent Marketing V1/
├── CLAUDE.md                  ← ce fichier — lire en PREMIER
├── Agency/workflow.md         ← cycles de production (hebdo + quotidien)
├── Context/
│   ├── profil.md              ← identité Lucas + business + audience
│   ├── youtube_rules.md       ← algo YouTube 2026 + règles script
│   ├── tiktok_instagram_rules.md ← algo TikTok/IG + hooks + CTAs
│   ├── newsletter_rules.md    ← Brevo, segmentation, séquences
│   └── stack.md               ← outils utilisés
├── Agents/
│   ├── agent_veille.md        ← trouve les sujets + actualité IA
│   ├── agent_youtube.md       ← script YT complet + titre + description
│   ├── agent_tiktok.md        ← scripts courts + déclinaisons + ManyChat
│   ├── agent_newsletter.md    ← emails d'onboarding + newsletter hebdo
│   ├── agent_stories.md       ← stories Instagram (audience chaude)
│   ├── agent_analyse.md       ← analyse perf + mise à jour mémoire
│   └── agent_linkedin.md      ← posts LinkedIn quotidiens (publication manuelle par Lucas)
├── Memory/base_memory.md      ← apprentissages cumulés
├── Examples/
│   ├── hooks_reference.md     ← hooks validés par type de contenu
│   ├── style_vlog_youtube.md  ← style script YouTube vlog builder (ref. Romain Brunel)
│   └── concurrents/           ← analyse concurrentielle (10 fichiers)
│       ├── 00_vue_ensemble.md
│       ├── 01_patterns_hooks.md
│       ├── 02_patterns_miniatures_youtube.md
│       ├── 03_patterns_stories.md
│       ├── 04_patterns_scripts_tiktok.md
│       ├── 05_regles_a_suivre.md
│       ├── 06_ce_qui_ne_marche_pas.md
│       ├── 07_templates_reutilisables.md
│       ├── 08_opportunites_gaps.md
│       └── 09_synthese_actionnable.md
└── Outputs/
    └── [YYYY-MM-DD_Sujet]/
        ├── youtube_script.md
        ├── youtube_description.md
        ├── tiktok_scripts.md
        ├── dm_messages.md       ← généré automatiquement par agent_tiktok
        ├── newsletter.md
        ├── stories.md
        └── readme.md
```

---

## Tableau des agents

| Agent | Rôle | Input | Output |
|-------|------|-------|--------|
| `agent_veille` | Trouve sujets viraux + actualité IA | Semaine courante | veille.md |
| `agent_youtube` | Script YouTube vlog-style + questions métriques | Sujet + réponses Lucas | youtube_script.md + youtube_description.md |
| `agent_tiktok` | Scripts courts TikTok/IG + messages DM | Script YouTube | tiktok_scripts.md + dm_messages.md |
| `agent_newsletter` | Email onboarding + newsletter hebdo | Sujet + ressource | newsletter.md |
| `agent_stories` | Stories Instagram | Script YouTube | stories.md |
| `agent_analyse` | Analyse stats + mise à jour mémoire | Stats Lucas | analyse.md + memory maj |
| `agent_linkedin` | Posts LinkedIn quotidiens | Sujet ou cycle YT | post LinkedIn (copier-coller manuel) |

---

## Workflow d'exécution — Cycle hebdomadaire

**Quand Lucas dit "nouvelle vidéo" ou "cycle complet" :**

### ÉTAPE 0 — Lecture contexte (obligatoire avant tout)
Lire dans cet ordre :
1. `Context/profil.md`
2. `Context/youtube_rules.md`
3. `Context/tiktok_instagram_rules.md`
4. `Context/newsletter_rules.md`
5. `Context/stack.md`
6. `Memory/base_memory.md`
7. `Examples/concurrents/09_synthese_actionnable.md` (vue globale — toujours lire avant tout cycle)
8. Lister `Outputs/` pour connaître le prochain numéro de cycle

**Note :** Chaque agent lit ensuite uniquement les fichiers `Examples/concurrents/` qui le concernent (définis dans sa Phase 0). Ne pas tout charger inutilement.

Écrire **"✅ ÉTAPE 0 TERMINÉE"** avant de continuer.

### ÉTAPE 1 — Veille & sujet
- Lire `Agents/agent_veille.md` et exécuter
- Sauvegarder dans `Outputs/[date_sujet]/veille.md`

Écrire **"✅ ÉTAPE 1 TERMINÉE — Sujet : [X] — Score : [X]/10"** avant de continuer.

### ÉTAPE 2 — Script YouTube
- Lire `Agents/agent_youtube.md` et exécuter
- Sauvegarder `youtube_script.md` + `youtube_description.md`

Écrire **"✅ ÉTAPE 2 TERMINÉE"** avant de continuer.

### ÉTAPE 3 — Déclinaisons TikTok/IG
- Lire `Agents/agent_tiktok.md` et exécuter
- Sauvegarder `tiktok_scripts.md`

Écrire **"✅ ÉTAPE 3 TERMINÉE"** avant de continuer.

### ÉTAPE 4 — Newsletter
- Lire `Agents/agent_newsletter.md` et exécuter
- Sauvegarder `newsletter.md`

Écrire **"✅ ÉTAPE 4 TERMINÉE"** avant de continuer.

### ÉTAPE 5 — Stories Instagram
- Lire `Agents/agent_stories.md` et exécuter
- Sauvegarder `stories.md`

Écrire **"✅ ÉTAPE 5 TERMINÉE"** avant de continuer.

### ÉTAPE 6 — Livraison
- Générer `readme.md` (récap complet du dossier)
- Présenter le rapport final à Lucas

---

## Commandes rapides

| Commande Lucas | Action |
|----------------|--------|
| `"cycle complet"` | Exécuter étapes 0 à 6 |
| `"veille"` | Exécuter étape 1 uniquement |
| `"script youtube [sujet]"` | Exécuter étapes 0 + 2 sur un sujet donné |
| `"déclinaisons tiktok"` | Exécuter étape 3 depuis un script YT existant |
| `"newsletter [sujet/ressource]"` | Exécuter étape 4 |
| `"stories"` | Exécuter étape 5 |
| `"analyse [stats]"` | Exécuter agent_analyse |
| `"hooks [plateforme]"` | Générer des hooks pour la plateforme demandée |
| `"trimme [fichier]"` | Couper silences + générer transcript (video-production étape 4) |
| `"plan animations [instructions]"` | Plan Mode Hyperframes (étape 5) |
| `"génère la vidéo"` | Génération Hyperframes HTML preview (étape 6 — PAS de MP4 encore) |
| `"exporte en mp4"` | Compiler en MP4 uniquement après validation Lucas (fin étape 7) |
| `"sons : [liste]"` | Intégration sons dans la vidéo (étape 8) |
| `"mémorise cette vidéo"` | Mise à jour memory_montage.md (étape 9 — script déjà mémorisé à étape 2) |
| `"stories [déclencheur]"` | Générer séquence stories Instagram |
| `"linkedin [sujet]"` | Générer post(s) LinkedIn du jour |

---

## Règles absolues du système

- **PROPOSITION AVANT PRODUCTION** — Avant de produire du contenu (script, newsletter, stories, LinkedIn, TikTok), toujours présenter l'intention à Lucas et attendre son feu vert. Exception : commande directe et explicite de Lucas ("fais la newsletter sur [sujet]").
- **Ne jamais sauter une étape** — chaque étape a un fichier de sortie à créer
- **Mémoriser le script immédiatement après validation** — ne pas attendre l'étape 9, risque de compactage
- **MP4 uniquement après "c'est bon" de Lucas** — pas de compilation pendant les révisions
- **Toujours lire Memory/base_memory.md avant d'écrire** — appliquer les apprentissages terrain
- **Toujours lire Examples/concurrents/ à l'étape 0** — les patterns concurrents sont des règles, pas des suggestions
- **Ne jamais inventer des stats** — si Lucas ne les donne pas, demander
- **Un seul CTA principal par vidéo** — pas plus de 2 liens en description YouTube
- **L'email est l'objectif** — tout contenu doit ramener vers la capture d'email
- **Jamais de vente directe sur TikTok/IG** — d'abord donner de la valeur, ensuite ManyChat
- **Toujours écrire le checkpoint** "✅ ÉTAPE X TERMINÉE" avant de passer à la suivante

---

## Priorité des fichiers en cas de conflit

`Context/` fait autorité. En cas de contradiction :
`profil.md` > `youtube_rules.md` = `tiktok_instagram_rules.md` > `newsletter_rules.md` > `stack.md`
`Memory/base_memory.md` > tout le reste sur les règles apprises terrain.

---

## Workflow vidéo (production post-enregistrement)

Voir `Agency/video-production-workflow.md` — workflow complet en 9 étapes.

**Fichiers mémoire spécialisés :**
| Fichier | Contenu |
|---|---|
| `Memory/memory_montage.md` | Templates animations, sons, erreurs de montage |
| `Memory/memory_script_youtube.md` | Règles scripts YouTube longs (10-20 min) |
| `Memory/memory_script_tiktok.md` | Règles scripts TikTok/Shorts (30-90 sec) |

**Dossiers vidéo :**
```
Video Studio/
├── Bruts/    ← vidéos brutes de Lucas
├── Renders/  ← outputs générés (trimmed / animated / final)
└── Sons/     ← fichiers audio pour intégration
```

**À lire obligatoirement avant tout travail de montage :**
1. `Agency/video-production-workflow.md` — étapes à suivre
2. `Memory/memory_montage.md` — templates et erreurs à éviter
3. `Memory/memory_script_youtube.md` ou `memory_script_tiktok.md` selon le format
