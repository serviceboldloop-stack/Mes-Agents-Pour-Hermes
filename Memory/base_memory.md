# MÉMOIRE DU SYSTÈME — Business Agents IA Lucas
## Apprentissages cumulés — mis à jour après chaque cycle analysé

---

## VERSION
- Créée le : 2026-05-12
- Dernière mise à jour : 2026-05-29 (séquence email Prompt TikTok + déploiement)
- Nombre de cycles analysés : 1

## MÉMOIRES SPÉCIALISÉES
- `Memory/memory_newsletter_sequence.md` — erreurs, règles de style emails, architecture technique séquences Brevo

---

## RÈGLES DE STYLE — ABSOLUES (apprises cycle #1)

**Règle STYLE-01 — Zéro trait/tiret en dehors du code**
Ne JAMAIS utiliser de tirets em (—) ni de séparateurs (---) dans les emails, scripts, descriptions, stories.
C'est un marqueur IA immédiatement reconnaissable. Remplacer par : point, point d'exclamation, ou rien.
Exemples :
❌ "5 scripts en 30s — voilà comment"
✅ "5 scripts en 30s. Voilà comment !"
❌ "De zéro à l'agent qui tourne."
✅ "De zéro à l'agent qui tourne."

**Règle STYLE-02 — Signature = "Kairos" (pas "Lucas")**
Dans toutes les newsletters et emails, signer "Kairos" et non "Lucas".
Nom de marque : Kairos — Business Agents IA.

**Règle STYLE-03 — Offre 99€ = questionnaire POST-achat**
Le process de vente pour l'agent personnalisé 99€ est :
1. Lien [URL PAGE VENTE 99€] = page description agent sur kairos-seven-gray.vercel.app/agents/[slug]
2. Bouton Stripe sur cette page = paiement direct
3. APRÈS paiement = email automatique avec lien questionnaire
Ne jamais envoyer vers /questionnaire AVANT paiement. Ne jamais décrire l'offre comme une réunion.

**Règle STYLE-04 — Email 1 onboarding : configurer avant de tester**
Après livraison de l'agent, instruire d'abord à personnaliser (audience, vocabulaire, exemples) AVANT de tester.
L'agent générique fonctionne mais n'est pas adapté à leur niche.

**Règle STYLE-05 — Nouveau lead magnet = page de capture + liste Brevo automatiques**
Chaque nouveau contenu gratuit (agent, template, guide, prompt pack...) nécessite :
1. Une nouvelle page de capture créée sur kairos-seven-gray.vercel.app/newsletter/[nom-du-lead-magnet]
   Convention de chemin OBLIGATOIRE (depuis 2026-05-21) : toutes les nouvelles pages de capture sont dans /newsletter/[nom], jamais à la racine.
   Fichier Next.js à créer dans : app/newsletter/[nom]/page.tsx
   Structure SIMPLIFIÉE (obligatoire) :
   - Uniquement le formulaire email ("Reçois [ressource] gratuitement")
   - En dessous : CTA "Tu veux ton agent personnalisé ? Je te le fais pour 99€ →" → /agents/agent-script-video-ia
   - Rien d'autre. Pas de badges, pas de bénéfices, pas d'explications.
   - Style : bg #0a0a0f, card #13131f, accent #7c3aed, police Syne.
2. Une nouvelle liste Brevo créée via API (POST /v3/contacts/lists) avec nom clair.
   Ne jamais réutiliser une liste d'un autre lead magnet.
3. Une route API dédiée /api/subscribe-[nom] qui ajoute dans la bonne liste + envoie Email 1.
4. Le fichier agent/ressource hébergé dans /public/agents/ ou /public/ressources/.
Règle : 1 lead magnet = 1 page = 1 liste Brevo = 1 route API = 1 séquence onboarding distincte.

**Règle STYLE-06 — URL du site : kairos-seven-gray.vercel.app UNIQUEMENT**
Le domaine kairos-agents.fr N'EXISTE PAS (pas acheté). Ne jamais l'utiliser.
URL officielle : https://kairos-seven-gray.vercel.app
Ne jamais aliaser vers kairos-agents.fr lors des déploiements Vercel.

**Règle STYLE-07 — Signature verbale : "C'était Lucas."**
Phrase identique à la FIN de chaque reel, TikTok et vidéo YouTube.
Jamais de variation. C'est une règle de branding, pas une suggestion.
Exemples d'utilisation :
- Reels/TikTok : "[CTA empilés]... C'était Lucas."
- YouTube : "Je vous dis à très vite. C'était Lucas."

**Règle STYLE-08 — Pas de nom propre pour le système d'agents**
Le setup d'agents Claude de Lucas s'appelle "mon système" ou "mes agents".
Ne jamais inventer un nom type "Kairos OS" dans les scripts.
Utiliser : "mon système", "mes agents", "mon système d'agents Claude".

**Règle STYLE-09 — LinkedIn : publication manuelle**
L'agent génère le post LinkedIn prêt à copier-coller.
Lucas le publie lui-même manuellement.
Ne jamais tenter de poster automatiquement sur LinkedIn.

---

## RÈGLES ISSUES DES TRANSCRIPTIONS VIDÉO (2026-05-28)

**Source : Romain Brunel (@Affiseo_) — "J'ai Automatisé TOUT Mon Business avec Claude Code"**

**Règle VOCAB-01 — Vocabulaire authentique à utiliser dans les scripts**
Formules observées dans les scripts les plus performants de la niche :
- "ça me coûte 0 temps, 0 euros"
- "j'ai simplement à valider"
- "ça tourne 24h/24"
- "je le faisais à la main avant"
- "c'est Game Changer"
Ces formules sonnent vrai car elles viennent de créateurs réels. Ne pas les remplacer par des équivalents IA.

**Règle VOCAB-02 — Hook de contradiction = ironie d'accessibilité**
Le hook de Romain : "Je ne suis pas développeur, je n'ai jamais appris à coder et pourtant ces trois dernières semaines j'ai construit mon propre système."
Structure qui marche : [obstacle attendu] + "et pourtant" + [résultat surprenant].
Pour Lucas : "J'ai 19 ans, je n'ai jamais codé, et pourtant mon agent tourne pour moi tous les jours."

**Règle VOCAB-03 — ManyChat : dupliquer l'automatisation + changer le mot-clé**
Process validé Romain : une automatisation ManyChat de base est dupliquée pour chaque nouvelle vidéo, seul le mot-clé change. Prend 10 secondes. Confirme la stratégie de mots-clés uniques par vidéo de Lucas.

**Règle VOCAB-04 — Durée des reels : calibrer sur les prospects, pas les vues**
Un reel de 30s avec 90% de complétion convertit mieux qu'un reel de 75s avec 20%.
Règle opérationnelle : la vidéo dure exactement ce que la démo exige. Couper dès que la valeur est livrée.

**Règle VOCAB-05 — Zéro signature "C'était Lucas." dans les reels**
Supprimer définitivement la signature verbale des scripts reels/TikTok.
Raison : ralentit le script, ajoute de la longueur inutile, les gens s'en foutent du nom.
La signature reste UNIQUEMENT dans les emails de la newsletter.
Fin de reel = CTA + fin. Rien d'autre.

**Règle VOCAB-10 — Vendre sans vendre : montrer le résultat, ne pas pitcher**
Ne jamais expliquer pourquoi l'agent est meilleur que les concurrents.
Ne jamais comparer explicitement avec un autre outil pour le dévaloriser.
Ne jamais présenter l'agent comme un produit à vendre dans le contenu.
Principe : montrer le résultat brut → le spectateur le veut → il commente pour l'avoir.
Le seul endroit où l'agent est "vendu" = le DM ManyChat après le commentaire.
Dans la vidéo : documenter ce que Lucas fait, pas pitcher ce que l'agent fait.
❌ "Mon agent Claude est meilleur que ChatGPT parce que..."
✅ "Ce matin j'avais 0 idée. Voilà ce que mon agent m'a généré en 30 secondes."

**Règle VOCAB-05 — Grammaire orale de Lucas : ne pas corriger**
Lucas parle en voice-to-text. Sa grammaire orale est intentionnelle et fait partie de son authenticité.
Ne jamais corriger : "je ne comprennait pas", "tu parle", "5 minute", "lui il créer", "sa" pour "ça".
Conserver ces formes dans les scripts tels quels.

**Règle VOCAB-06 — CTAs : promesse de livraison directe**
❌ "Commente X et je t'explique comment l'avoir"
✅ "Commente X et je te l'envoie"
Le CTA promet une livraison immédiate, pas une explication. Réduire la friction perçue.

**Règle VOCAB-07 — Jamais l'argument "ChatGPT ne se souvient pas"**
Techniquement inexact depuis les projets ChatGPT et Codex. Discrédite l'auteur auprès des gens qui savent.
Angle correct : "sans agent dédié configuré pour ta niche, tu réexpliques tout à chaque session" — valable peu importe l'outil.

**Règle VOCAB-11 — Formules orales récurrentes de Lucas (à réutiliser)**
- "Donc voilà ce que..." — connecteur entre hook et transition vers démo
- "Et lui il fait le reste" — clôture naturelle d'une explication sur l'agent
- "Et voilà ce que ça donne" — transition vers la démo screen
- "Alors qu'en X [temps] lui il [résultat]" — formule AVANT/APRÈS
Ces formules reviennent dans ses modifications manuelles. Les intégrer systématiquement dans les scripts.

**Règle VOCAB-08 — Hashtags obligatoires dans toutes les descriptions**
8-10 hashtags en fin de description, jamais dans le corps du texte.
Mix : 3-4 populaires (#intelligenceartificielle #automatisation #IA) + 3-4 niche (#agentsIA #claudeai #scriptsTikTok) + 1-2 engagement (#hack #exclusif).
TikTok/Instagram utilisent les hashtags pour calibrer l'audience cible initiale.

**Règle VOCAB-09 — Specs écran obligatoires dans chaque script**
Chaque reel avec démo screen doit avoir une section "ÉCRAN À ENREGISTRER" qui liste exactement :
1. Quelle app ouvrir
2. Quelle action faire
3. Ce qu'on doit voir à l'écran
4. Comment zoomer ou encadrer le résultat
Lucas ne doit pas deviner ce qu'il filme pendant la session d'enregistrement.

---

## RÈGLES ISSUES DE L'ANALYSE CONCURRENTIELLE (2026-05-14)

### CAROUSEL INSTAGRAM (source : Ayoub @disizyyov7, 338k followers)

**Règle CARR-01 — 12 slides standard, jamais moins de 9**
Les carousels d'Ayoub à 12 slides atteignent 5 025 likes et 4 669 commentaires. Son premier carousel à 7 slides a sous-performé. L'algo booste le temps passé sur le post (swipes = engagement).

**Règle CARR-02 — Fond uni clair + grand texte noir manuscrit**
Toutes les covers performantes d'Ayoub : fond jaune pâle (#F5E6B8 environ), texte noir handwriting, chiffre en accent orange/rouge. Lisible en miniature dans la grille profil.

**Règle CARR-03 — Chiffre obligatoire dans le titre**
"100 codes", "60 prompts", "9 étapes" — le chiffre = promesse de densité. "100 codes" surpasse "des codes" en CTR systématiquement.

**Règle CARR-04 — Indicateurs de progression sur chaque slide**
Points oranges en bas ou format "1/9". Quand l'audience sait qu'il reste des slides, elle continue de swiper. Sans indicateur elle arrête.

**Règle CARR-05 — Signature @handle sur chaque slide**
Si une slide est screenshottée et repartagée, la signature voyage avec elle. Attribution automatique et gratuite.

**Règle CARR-06 — Dernière slide = CTA pur, fond couleur vive, 1 seul message**
Exemple Ayoub : "Commente 'Claude' si tu veux la roadmap en pdf" — texte noir sur fond jaune, grande étoile décorative. Épuré, mémorable, actionnable.

**Règle CARR-07 — Ajouter une musique de fond au carousel**
Option Instagram au moment de la publication. Ayoub le fait systématiquement.

**Règle CARR-08 — Republier chaque carousel en story dans les 2h**
Ayoub republie systématiquement. Double exposition à l'audience, signal algo supplémentaire.

---

### REELS/TIKTOK — STRUCTURE (source : analyse scripts Ayoub + Danyltn)

**Règle REEL-01 — Structure en 4 temps : 3s hook / 12s contexte / 35s démo / 15s CTA+signature**
Standard optimal observé sur tous les reels performants. Durée totale cible : 55-75 secondes.

**Règle REEL-02 — Ne jamais dépasser 90 secondes sur IG/TikTok**
Exception : YouTube Shorts format long accepté. Sur IG/TT, la rétention chute après 90 secondes.

**Règle REEL-03 — Signature verbale identique à la fin de chaque reel**
Ayoub : "Je m'appelle Ayoub et j'explique l'IA et la tech simplement." — toujours la même. Crée reconnaissance et attribution automatique.
Pour Lucas : créer SA signature et la répéter sur 100% des reels.

**Règle REEL-04 — Un seul CTA par vidéo, jamais deux**
"Commente [MOT]" + "abonne-toi" + "sauvegarde" dans la même vidéo dilue l'action. Sur IG/TT : 1 CTA = "Commente [MOT-CLÉ]". Sur YouTube : CTA email prioritaire.

**Règle REEL-05 — Le mot-clé ManyChat doit apparaître à l'oral ET dans la description**
Si le mot-clé n'est pas dit explicitement dans la vidéo, l'automatisation ManyChat ne peut pas se déclencher. Erreur observée chez Ayoub dans ses anciens reels.

**Règle REEL-06 — Chaque mot-clé ManyChat = unique par vidéo**
Ne jamais réutiliser "AGENT" pour deux vidéos différentes → confusion dans l'automatisation et mauvais ciblage des segments Brevo.

**Règle REEL-07 — Musique de fond légère obligatoire**
100% des reels analysés ont une musique d'ambiance (lo-fi, cinématique, suspense léger). Pas de silence.

**Règle REEL-08 — Sous-titres sur 100% du contenu vidéo**
70-80% des vues IG/TT se font sans son. Sans sous-titres = contenu inaccessible pour la majorité.

**Règle REEL-09 — Toujours montrer une interface à l'écran pendant la démo**
100% des reels performants montrent l'interface Claude ou un outil. Pas de vidéo 100% face caméra sur du contenu tech IA.

---

### MINIATURES YOUTUBE (source : analyse Aurélien Fagioli + Romain Brunel)

**Règle MINI-01 — Fond sombre obligatoire (noir ou bleu nuit)**
Sur YouTube, les recommandations s'affichent sur fond blanc. Un fond clair disparaît dans le décor.

**Règle MINI-02 — Visage expressif obligatoire (jamais neutre)**
100% des miniatures analysées : expression choc, joie intense, ou incrédulité. Expression normale = miniature ignorée.

**Règle MINI-03 — 2-3 mots max en texte principal (pas de phrase)**
Aurélien : "N8N MORT ?", "GRATUIT", "INTERDIT". Romain : "J'AI TOUT AUTOMATISÉ". Jamais de phrase entière.

**Règle MINI-04 — Logo Claude visible sur toutes les miniatures agents**
Différenciateur immédiat + cohérence de niche. Tester en version 100px de large pour vérifier la lisibilité.

**Règle MINI-05 — Texte toujours en haut ou au centre, jamais en bas**
Sur mobile, le titre de la vidéo cache le bas de la miniature. Texte en bas = invisible pour 70% des vues.

**Règle MINI-06 — Durée "0 CODE" ou "NO CODE" = argument miniature**
Aurélien l'utilise systématiquement comme élément de miniature. Fort attracteur sur la cible non-développeurs.

---

### STORIES INSTAGRAM (source : analyse stories Ayoub)

**Règle STORY-01 — Republier les reels ET carousels en story le même jour**
Ayoub le fait systématiquement dans les 2h après publication. Double exposition, signal fort algo.

**Règle STORY-02 — Technique du "cache" = 2x plus de clics**
Couvrir la révélation clé d'un carousel en story force le clic vers le post original. Ne jamais tout montrer.

**Règle STORY-03 — Ajouter une flèche rouge ou annotation pointant vers l'écran**
Ayoub utilise des flèches rouges pour attirer le regard vers la démo à l'écran. Simple et efficace.

**Règle STORY-04 — Jamais de vente directe en story**
Aucun créateur analysé ne vend directement en story. Story = trafic vers le reel/carousel/lien, pas pitch commercial.

**Règle STORY-05 — Fond noir ou couleur vive, jamais blanc pur**
Les stories sur fond blanc disparaissent visuellement. Fond sombre ou saturé = attention captée.

---

### BIO ET PROFIL (source : analyse profils Ayoub + Danyltn)

**Règle BIO-01 — Format nom de profil : [Prénom] | [Niche]**
Standard observé chez tous les créateurs performants : "Ayoub Faouzi | IA & Automatisation", "Danyltn | IA & Automatisation". Optimise la recherche par mots-clés.
Pour Lucas : "Lucas | Agents IA" ou "Lucas | Agents IA Claude"

**Règle BIO-02 — Bio 3 lignes max : bénéfice chiffré + preuve sociale + CTA**
Danyltn : "1 astuce IA/jour pour booster ta productivité — J'aide les entrepreneurs à gagner 2h/jour — DM AUTO pour que j'intègre l'IA pour toi"
Pour Lucas : utiliser l'angle "99€" et "48h" comme bénéfices concrets différenciants.

**Règle BIO-03 — CTA DM avec mot-clé dans la bio**
Danyltn : "DM AUTO" dans la bio. L'audience sait exactement quoi écrire. Réduire la friction d'action.

---

### DESCRIPTIONS INSTAGRAM (source : analyse descriptions Ayoub)

**Règle DESC-01 — Description courte = 2-4 lignes maximum**
Ayoub : descriptions ultra-courtes, pas de hashtags. Ses vidéos font 14k à 310k vues. La description longue IA-generated diminue l'authenticité.

**Règle DESC-02 — Ligne 1 = reformulation du hook (visible sans cliquer sur "plus")**
La première ligne est toujours visible dans le feed sans ouvrir la description. Elle doit avoir la même force que le hook verbal.

**Règle DESC-03 — Commentaire épinglé sous chaque post**
Ayoub ne le fait pas = erreur identifiée. Le commentaire épinglé rappelle le CTA ET donne le lien directement. Emplacement N°1 de visibilité sous le post.

---

### POSITIONNEMENT CONCURRENTIEL — GAPS ACTIFS EN FRANCE (mai 2026)

**GAP-01 — Offre à prix fixe et public dans le contenu**
Aucun concurrent n'affiche ses prix dans son contenu. Le "99€ agent personnalisé en 48h" de Kairos est un différenciateur unique de confiance et de suppression de friction.

**GAP-02 — Angle "19 ans sans code" inexploité**
Tous les concurrents (25-40 ans) légitiment par l'expérience. Lucas légitme par l'accessibilité. "Si un mec de 19 ans y arrive, je peux y arriver aussi" = forte identification de l'audience débutante.

**GAP-03 — Format AVANT/APRÈS automatisation inexistant**
Personne ne montre "X heures/semaine sur [tâche]" → agent Claude → "[X minutes/semaine]". C'est le format de transformation le plus puissant pour convaincre (format éprouvé : magazines, pub TV, témoignages).

**GAP-04 — ROI chiffré en contenu**
Tous les concurrents expliquent les fonctionnalités. Personne ne dit "cet agent m'a économisé X heures cette semaine" avec des chiffres réels. Les entrepreneurs ont un cerveau ROI.

**GAP-05 — Niche agents Claude pour non-développeurs francophones**
Créneau vide en France en mai 2026. Romain + Aurélien = développeurs/semi-tech. Ayoub + Danyltn = entrepreneurs généraux sans spécialisation agents. Lucas peut prendre ce positionnement précis.

---

## RÈGLES ACTIVES (issues des données wiki)

### YOUTUBE

**Règle YT-01** — UHI obligatoire
Chaque vidéo doit être Utile + Honnête + Intéressante. Manque un des 3 = mauvaise rétention.
Source : données algo YouTube 2026.

**Règle YT-02** — Démo live > explication verbale
L'IA (ChatGPT/Perplexity) absorbe le contenu éducatif générique. Ce qui reste : expérience humaine réelle + démo à l'écran.
Source : shift YouTube 2026.

**Règle YT-03** — CTA email en priorité absolue
Le CTA lien email doit apparaître AVANT le CTA 99€ dans la description ET dans le script.
L'objectif n°1 = remplir la newsletter.

**Règle YT-04** — Ne pas juger trop tôt
L'effet dividende = une vidéo peut prendre 228+ jours à décoller. Ne pas supprimer.

**Règle YT-05** — Autorité thématique
Publier UNIQUEMENT sur "agents IA Claude / automatisation IA". Dériver = perdre la recommandation algo.

---

### TIKTOK

**Règle TK-01** — 3 CTAs obligatoires
Hook excellent + 0 CTA = bloqué à 300 vues (validé terrain @chronovision.fr).
Empilement obligatoire : commentaire ManyChat + sauvegarde + partage.

**Règle TK-02** — "Commente AGENT" = CTA N°1
Trigger ManyChat systématique sur chaque post. C'est le chemin email.

**Règle TK-03** — Complétion > 20% = seuil critique
En dessous de 20% : vidéo enterrée par l'algo. Hook + WTF moment < 8s obligatoires.

**Règle TK-04** — Nommer Claude (pas juste "l'IA")
Différenciateur fort + SEO TikTok + crédibilité.

**Règle TK-05** — Jamais vente directe sur TikTok
D'abord valeur → ManyChat → email → séquence → vente. Pas de prix dans les posts.

**Règle TK-06** — Partages × 5 > likes
Optimiser pour partage et sauvegarde. Pas pour les likes.

---

### INSTAGRAM

**Règle IG-01** — Ne pas partager les Reels à ses amis proches
Biais négatif sur l'échantillon initial (~200 non-abonnés). Laisse l'algo distribuer seul.

**Règle IG-02** — Répondre à TOUS les commentaires
Signal de relation fort = boost distribution. Répondre dans l'heure idéalement.

**Règle IG-03** — Description 100+ mots avec mots-clés
SEO Instagram > hashtags en 2026. Mots-clés : "agent IA Claude", "automatisation contenu".

**Règle IG-04** — Cross-post Botato depuis TikTok
Reels 60-90s = format optimal Instagram. Même durée que TikTok ✅.

---

### NEWSLETTER

**Règle NL-01** — 1 segment par ressource gratuite
Chaque lead magnet = une liste Brevo séparée. Séquences d'onboarding distinctes.

**Règle NL-02** — Email hebdo lié à la vidéo YouTube
1 email/semaine, le jour de publication YT ou J+1. Jamais de newsletter déconnectée du contenu.

**Règle NL-03** — Objet 40 caractères max
Visible complet en push mobile. 1 chiffre si possible.

**Règle NL-04** — Valeur avant vente
Minimum 2 emails de valeur pure avant de proposer le 99€. Construire la confiance d'abord.

**Règle NL-05** — Timing séquence emails : jours consécutifs uniquement
Toujours J+0, J+1, J+2, J+3, J+4. Jamais J+5, J+10, J+14 ou espacement long.
Raison : garder le contexte frais dans la tête du lecteur. Plus l'écart est long, moins il se souvient des emails précédents.

**Règle NL-06** — Zéro flèches (→) ni tirets em (—) dans les emails
Complète STYLE-01. Interdit aussi dans les boutons CTA et les listes à puces.
Si un séparateur est absolument nécessaire, utiliser | uniquement.
❌ "Je veux mon agent — 99€ →"
✅ "Je veux mon agent | 99€"
❌ "→ 5 scripts filmables"
✅ "5 scripts filmables."

**Règle NL-07** — Signature emails : Lucas + Kairos | Business Agents IA
Format exact à respecter dans tous les emails.
Jamais "— Lucas" ni "Kairos — Business Agents IA".
Format correct : Lucas / Kairos | Business Agents IA

**Règle NL-08** — Newsletter générale vs séquence agent spécifique
Newsletter générale (liste 8, /api/subscribe) : mène vers agent sur-mesure 300€+. Pas de mention de l'agent TikTok IA.
Séquence Agent TikTok IA (liste 6, /api/subscribe-tiktok-agent) : mène vers agent personnalisé 99€. Spécifique à cet agent.
Ne jamais croiser les deux séquences.

**Règle NL-09** — Séquences emails : état TERMINÉ (2026-05-19)
Les deux séquences sont écrites, déployées et testées sur kairos-seven-gray.vercel.app.
Newsletter générale : 5 emails J+0 à J+4 dans /api/subscribe/route.ts
Agent TikTok IA : 5 emails J+0 à J+4 dans /api/subscribe-tiktok-agent/route.ts
Ne pas réécrire ces séquences sauf demande explicite de Lucas. Les modifier directement dans les fichiers.

**Règle NL-10** — Site Kairos : chemin local obligatoire
Le site est dans C:\Users\chapo\Documents\kairos
Stack : Next.js 16 + Vercel + Brevo
URL production : https://kairos-seven-gray.vercel.app
Déploiement : cd "C:\Users\chapo\Documents\kairos" && vercel deploy --prod
Toujours lire les fichiers depuis ce chemin. Ne jamais demander à Lucas de redonner le dossier.

**Règle NL-11** — Brevo : restriction IP désactivée (2026-05-19)
La restriction IP Brevo (Clés API + SMTP) est désactivée. Ne pas la réactiver.
Si une erreur "unrecognised IP" réapparaît, vérifier app.brevo.com/security/authorised_ips.

**Règle NL-12** — Test emails : endpoint temporaire /api/test-newsletter
Pour envoyer tous les emails d'une séquence en même temps à des fins de test, créer /api/test-newsletter/route.ts avec delayDays=0 sur tous les emails + bandeau jaune [TEST] dans chaque email.
Supprimer le fichier après validation. Ne jamais laisser cet endpoint en production.

---

## SUJETS TRAITÉS (anti-doublon)

*(vide — aucun contenu produit pour l'instant)*

| # | Sujet | Date | Plateforme | Score | Principale leçon |
|---|-------|------|------------|-------|-----------------|
| — | — | — | — | — | — |

---

## HOOKS QUI ONT FONCTIONNÉ

*(vide — à remplir au fil des cycles)*

| Hook | Plateforme | Rétention 5s / CTR | Score |
|------|------------|-------------------|-------|
| — | — | — | — |

---

## SUJETS À FORT POTENTIEL (identifiés mais pas encore traités)

**Source : analyse concurrentielle 4 comptes (2026-05-14) — classés par potentiel viral :**

1. "J'ai automatisé [tâche connue] avec un agent Claude" — tutoriel concret (pilier de niche)
2. "[Outil connu] vs Agent Claude — qui gagne ?" — comparatif (fort CTR miniature)
3. "X agents Claude que les entreprises vont utiliser en 2026" — liste (fort potentiel carousel aussi)
4. "Comment construire un second cerveau avec Claude et Obsidian" — très demandé dans la niche
5. "Mon agent Claude répond à mes DMs à ma place — voici comment" — fort engagement
6. "Claude a rendu [outil populaire] obsolète" — hook viral
7. "X erreurs que font 99% des gens avec Claude" — self-improvement + IA
8. "J'ai construit un agent Claude en 20 min pour [métier spécifique]" — niche + IA
9. "Ce que j'ai compris à 19 ans sur les agents IA que les gens de 40 ans n'ont pas encore vu" — angle unique Lucas

---

## JOURNAL DES ANALYSES

| # | Cycle | Date | YouTube | TikTok | Newsletter | Revenus | Score global | Leçon principale |
|---|-------|------|---------|--------|-----------|---------|-------------|-----------------|
| — | — | — | — | — | — | — | — | — |

---

## ERREURS À NE PLUS REPRODUIRE

*(vide — à remplir au fil des cycles)*

---

## EXPÉRIENCES À TESTER (next cycles)

1. Tester un hook YouTube avec chiffre de gain de temps très précis ("47 minutes gagnées")
2. Tester une story Instagram avec sondage avant le CTA email (mesurer conversion)
3. Tester email avec sujet "Question directe" vs sujet avec chiffre (mesurer taux d'ouverture)
4. Tester cross-post immédiat (J+0) vs décalé (J+1) sur Instagram
5. Tester ManyChat trigger différent par vidéo ("AGENT" vs mot-clé lié au sujet)
