# WORKFLOW — Système Marketing Multi-Plateforme
## Cycles de production et collaboration entre agents

---

## ARCHITECTURE DU SYSTÈME

```
┌─────────────────────────────────────────────────────────────┐
│                    LUCAS (chef de projet)                    │
│     Lance les commandes / donne les stats / publie          │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────▼─────────────┐
         │   ÉTAPE 1 — VEILLE        │
         │   agent_veille            │
         │   Sujets + actus IA       │
         └──────┬────────────────────┘
                │ Sujet validé par Lucas
         ┌──────▼──────────────────────┐
         │   ÉTAPE 2 — YOUTUBE        │
         │   agent_youtube            │
         │   Script + Description     │
         └──────┬──────────────────────┘
                │ Script YouTube prêt
    ┌───────────┼──────────────────┐
    │           │                  │
┌───▼────┐ ┌───▼──────┐ ┌────────▼────┐
│ÉTAPE 3 │ │ÉTAPE 4   │ │ÉTAPE 5      │
│TikTok  │ │Newsletter│ │Stories IG   │
│agent_  │ │agent_    │ │agent_       │
│tiktok  │ │newsletter│ │stories      │
└───┬────┘ └───┬──────┘ └────────┬────┘
    └───────────┴──────────────────┘
                │ Tous les outputs prêts
         ┌──────▼──────────────────────┐
         │   ÉTAPE 6 — LIVRAISON       │
         │   readme.md + rapport       │
         └──────┬──────────────────────┘
                │ Lucas publie
         ┌──────▼──────────────────────┐
         │   ÉTAPE 7 — ANALYSE         │
         │   agent_analyse (J+7)       │
         │   Stats → Mémoire           │
         └─────────────────────────────┘
```

---

## CYCLE HEBDOMADAIRE (production complète)

### Lundi — Veille + Sujet
- agent_veille → liste sujets notés
- Lucas valide le sujet YouTube de la semaine
- Lucas identifie la ressource gratuite associée

### Mardi — Production YouTube + Déclinaisons
- agent_youtube → script complet + description
- agent_tiktok → 3-5 scripts courts
- agent_newsletter → email hebdo + onboarding si nouveau lead magnet
- agent_stories → séquence stories pour la semaine

### Mercredi — Publication YouTube
- Lucas enregistre + monte la vidéo
- Publication YouTube avec description copiée depuis youtube_description.md
- **Lucas donne l'URL YouTube à l'agent**
- L'agent remplace [URL YouTube] dans : newsletter.md (2 endroits) + stories.md (1 endroit)
- Publication TikTok #1 (clip démo depuis YouTube)

### Jeudi → Dimanche — Publications TikTok/IG
- Publication TikTok #2 (actu IA)
- Cross-post automatique Instagram via Botato
- Stories Instagram publiées selon la séquence

### Jeudi — Newsletter
- Lucas envoie l'email hebdo via Brevo (copié depuis newsletter.md)

### Semaine suivante J+7 — Analyse
- Lucas donne les stats au format standard
- agent_analyse → rapport + mise à jour mémoire

---

## CYCLE QUOTIDIEN (minimal, si pas de nouvelle vidéo)

Si pas de nouvelle vidéo YouTube cette semaine :
1. agent_veille → 1-2 actus IA de la semaine
2. agent_tiktok → 2-3 TikToks info IA (sans vidéo YouTube source)
3. Lucas publie selon l'ordre recommandé

**Fréquence minimale :** 3 TikToks/semaine même sans nouvelle vidéo YouTube.

---

## COMMANDES RAPIDES — RÉFÉRENCE

| Lucas dit... | Agent déclenché | Output |
|-------------|-----------------|--------|
| `"cycle complet"` | Tous les agents (0→6) | Dossier complet |
| `"vidéo publiée [URL]"` | Remplacement URL YouTube | newsletter.md + stories.md mis à jour |
| `"veille"` | agent_veille | Liste sujets |
| `"script youtube [sujet]"` | agent_youtube | Script + Description |
| `"déclinaisons tiktok"` | agent_tiktok | 3-5 scripts + dm_messages.md |
| `"newsletter [sujet]"` | agent_newsletter | Email + Onboarding |
| `"stories [objectif]"` | agent_stories | Séquence 5-7 stories |
| `"analyse [stats]"` | agent_analyse | Rapport + Mémoire |
| `"hooks youtube"` | agent_youtube (phase 2 seule) | 3 options de titres |
| `"hooks tiktok [sujet]"` | agent_tiktok (phase 2 seule) | 5 hooks |

---

## GESTION DES BLOCAGES

### Si un agent est bloqué
```
❌ BLOQUÉ — [NOM AGENT]
Problème : [Description précise]
Besoin : [Ce qu'il faut pour débloquer]
```
→ Signaler à Lucas immédiatement. Ne pas continuer sans résoudre.

### Si les stats ne sont pas données
agent_analyse ne peut pas fonctionner sans stats.
→ Rappeler à Lucas le format d'input standard.

### Si le sujet n'atteint pas 7/10
agent_veille propose le sujet suivant de la liste.
Si aucun sujet ne passe 7/10 → relancer la veille sur un angle différent.

---

## SUIVI DE PRODUCTION

```
Outputs/
├── [2026-MM-JJ_Sujet_1]/  ✅ Publié | [date] | [vues] vues | Analysé ✅
├── [2026-MM-JJ_Sujet_2]/  🎬 En production
└── [2026-MM-JJ_Sujet_3]/  ⬜ À lancer
```
