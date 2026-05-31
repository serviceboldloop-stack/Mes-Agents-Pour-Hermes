# PROFIL — Lucas
## Contexte créateur — base de lecture pour tous les agents

---

## IDENTITÉ

- **Prénom** : Lucas
- **Âge** : 19 ans
- **Localisation** : Genouillé (village rural, Nouvelle-Aquitaine, France)
- **Statut** : Solo entrepreneur — travaille seul, full-time
- **Communication** : Direct, dense, pas de blabla. Voice-to-text souvent.
- **Budget pub** : 0€ — croissance 100% organique

---

## BUSINESS MODEL

**Produit principal** : Agents natifs Claude (pas n8n/Make)
- **99€** : agent personnalisé (formulaire client → Lucas configure en ~30 min)
- **300€+** : sur-mesure complet

**Flagship** : Agent TikTok IA — génère scripts viraux + prompts images/animations.
Preuve de concept : @chronovision.fr (compte test)

**Différenciateur** : Agents natifs Claude = zéro abonnement outil tiers. Aucun concurrent français identifié sur ce positionnement.

---

## OBJECTIF PRINCIPAL

**Remplir la newsletter. Pas les likes. Pas les abonnés. Les emails.**

Funnel :
```
Vidéo YouTube (tuto complet agent IA)
  → CTA description : lien page capture email (ressource gratuite)
        ↓
TikTok/Instagram (clips + info IA)
  → ManyChat : "commente AGENT" → DM automatique → page capture email
        ↓
Newsletter (Brevo) — actif propriétaire prioritaire
        ↓
Vente agents 99€ / 300€+
```

**Objectif court terme** : Première vente dans les 4 semaines.
**Objectif moyen terme** : Scaler par volume de contenu (tout délégué à l'IA).

---

## AUDIENCE CIBLE

**Profil primaire :**
- Créateurs TikTok/Instagram francophones
- Solopreneurs, indépendants, freelances
- 20-35 ans
- Problème : perdent trop de temps à créer du contenu / ne savent pas comment utiliser l'IA
- Budget : 99-300€ acceptables pour un outil qui fait gagner 5h/semaine

**Profil secondaire (YouTube) :**
- Curieux de l'IA et de l'automatisation
- Pas encore créateur mais veut le devenir
- Cherche des outils concrets, pas de la théorie

**Déclencheur d'achat :**
"Je vois Lucas en démo — ça fait exactement ce que je voulais faire — je peux pas reproduire ça seul — 99€ c'est rentable."

---

## PLATEFORMES ET RÔLES

| Plateforme | Rôle | Statut |
|------------|------|--------|
| **YouTube** | Hub principal — confiance + capture email | ✅ Actif — @kairos.agents.ai |
| **TikTok** | Volume + viralité → ManyChat → email | ✅ Actif — @kairos.agents.ai |
| **Instagram** | Cross-post TikTok via Botato + stories | ✅ Actif — @kairos.agents.ai |
| **Newsletter** | Actif propriétaire — Brevo | ✅ En ligne — séquences déployées |
| **Site vitrine** | Présenter les agents + page de vente | ✅ En ligne — kairos-seven-gray.vercel.app |

---

## COMPTES ET BIOS — VALIDÉS (2026-05-19)

### TikTok
**Username :** `kairos.agents.ai`
**Bio (validée) :**
```
J'automatise tout avec des agents IA 🤖
👉 Insta : @kairos.agents.ai
```
**Stratégie :** pas de lien (pas encore 1000 abonnés) — renvoie vers Instagram uniquement.

---

### Instagram
**Username :** `kairos.agents.ai`
**URL :** https://www.instagram.com/kairos.agents.ai/
**Bio (validée) :**
```
J'automatise tout avec des agents IA 🤖
Solopreneurs & créateurs | gagne + de 5h/sem
👇 Reçois un agent gratuit
```
**Lien en bio :** https://kairos-seven-gray.vercel.app/#newsletter

---

### YouTube
**URL chaîne :** https://www.youtube.com/channel/UCWQ6zGpEwq0CF2JPkUrtKEQ
**Description (validée) :**
```
J'automatise tout avec des agents IA natifs Claude.

Sur cette chaîne : des tutos concrets pour créer des agents qui font le travail à ta place. Scripts TikTok, contenu Instagram, gestion client, analyse de données. Automatisés et dans ton style.

Pas de no-code générique. Pas de blabla. Des agents qui tournent vraiment.

Je suis Lucas, 19 ans, solo entrepreneur. Je construis ces agents pour mon propre business et je te montre exactement comment je fais.

Rejoins la newsletter pour des ressources gratuites sur l'IA chaque semaine.
```
**Liens YouTube (section dédiée) :**
1. Newsletter (ressource gratuite) → https://kairos-seven-gray.vercel.app/#newsletter
2. Tous mes agents → https://kairos-seven-gray.vercel.app
3. Instagram → https://www.instagram.com/kairos.agents.ai

---

### Newsletter
**Route générale :** /api/subscribe — liste Brevo 8 — séquence 5 emails J+0 à J+4 — mène vers agent sur-mesure 300€+
**Route Agent TikTok IA :** /api/subscribe-tiktok-agent — liste Brevo 6 — séquence 5 emails J+0 à J+4 — mène vers agent personnalisé 99€
**Lien capture :** https://kairos-seven-gray.vercel.app/#newsletter

---

## CONTENU PAR PLATEFORME

**YouTube :**
- 1 tuto complet/semaine (15-20 min)
- Sujet : démo d'un agent en action, ou guide "comment automatiser [tâche] avec Claude"
- CTA systématique en description : lien vers ressource gratuite (capture email)

**TikTok/Instagram :**
- Clips courts depuis YouTube (30-60s) → "tu veux le tuto complet ? lien en bio"
- Contenu info : news Claude, nouveautés IA, solutions aux problèmes de la cible
- ManyChat trigger : "commente AGENT"

**Newsletter :**
- 1 email/semaine lié à la vidéo YouTube de la semaine
- Segments : par ressource gratuite reçue (agent TikTok IA / autre agent / curiosité générale IA)
- Séquence d'onboarding : 3-5 emails automatiques après inscription

---

## CE QUE LUCAS NE FAIT JAMAIS

- ❌ Vente directe sur TikTok/IG (pas de "achetez mon agent" dans les posts)
- ❌ Créer du contenu sur plusieurs niches à la fois (autorité thématique = 1 pilier)
- ❌ Pub payante (budget = 0€)
- ❌ Face cam sur les comptes TikTok (sauf si décision future)
- ❌ Utiliser n8n/Make dans ses agents (natifs Claude uniquement)

---

## STACK DE PRODUCTION

→ Voir `Context/stack.md` pour le détail complet.

---

## DONNÉES DE PERFORMANCE ACTUELLES

À remplir au fur et à mesure dans `Memory/base_memory.md`.
Lucas fournit les stats après chaque publication.

---

## NOTE STRATÉGIQUE

Lucas est seul. Tout doit être délégué à l'IA au maximum.
Son rôle = donner l'input (sujet, stats) + valider les outputs + publier.
L'agent fait tout le reste.
