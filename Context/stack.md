# STACK — Outils de production
## Référence complète pour tous les agents

---

## PRODUCTION CONTENU

| Outil | Usage | Coût |
|-------|-------|------|
| **Claude Code** | Cerveau central — création d'agents, scripts | Abonnement Max |
| **CapCut** | Montage vidéo TikTok/Instagram | Gratuit |
| **Botato** | Cross-post TikTok → Instagram (automatique) | Payant (à configurer) |
| **Canva / Magic** | Stories Instagram, miniatures YouTube | Gratuit / Freemium |
| **YouTube Studio** | Analytics, chapitres, descriptions | Gratuit |

---

## CAPTURE EMAIL + NEWSLETTER

| Outil | Usage | Coût |
|-------|-------|------|
| **Brevo** | Newsletter + automatisations email | Gratuit jusqu'à 300 emails/jour |
| **ManyChat** | Automation DM TikTok/Instagram ("commente AGENT") | Freemium (compte Business TikTok requis) |
| **Page de capture** | Recevoir le lien email (via site vitrine ou outil simple) | À définir |

---

## VENTE

| Outil | Usage | Coût |
|-------|-------|------|
| **Site vitrine** | Présenter les agents, page de vente 99€/300€+ | ✅ En ligne — kairos-seven-gray.vercel.app |
| **Stripe** | Paiement en ligne | % sur transaction |
| **Formulaire** | Client remplit → Lucas configure l'agent | Google Forms ou Tally (gratuit) |

---

## VEILLE IA

| Outil | Usage |
|-------|-------|
| **X/Twitter** | Suivre les comptes Anthropic, Claude, IA créateurs |
| **Newsletter IA** | The Rundown, TLDR AI, Ben's Bites |
| **YouTube** | Suivre créateurs : Matt Wolfe, AI Explained, Fireship |
| **Anthropic.com** | Annonces officielles Claude |

---

## NOTES TECHNIQUES IMPORTANTES

**ManyChat sur TikTok :**
- Fonctionne uniquement sur compte TikTok **Business** (pas personnel)
- Configurer avant le premier post avec trigger ManyChat
- Mot-clé trigger : "AGENT" (peut être différent par vidéo)

**Botato :**
- Cross-post automatique TikTok → Instagram
- Reels 60-90s = format optimal Instagram (même durée que TikTok ✅)
- Ajouter description personnalisée Instagram avant de lancer l'automatisation

**Claude Code en production :**
- Ce système tourne dans Claude Code
- Les outputs sont des fichiers .md → Lucas les copie/colle dans ses outils de publication
- Pas d'automatisation de publication directe pour l'instant (volume insuffisant)

---

## PIPELINE DE PUBLICATION (ordre des étapes manuelles pour Lucas)

```
1. Agent génère : youtube_script.md + tiktok_scripts.md + newsletter.md + stories.md
2. Lucas enregistre la vidéo YouTube (ou crée la démo screen record)
3. Lucas monte dans CapCut
4. Lucas publie YouTube → description copiée depuis youtube_description.md
5. Lucas publie TikTok → description copiée depuis tiktok_scripts.md
6. Botato cross-poste automatiquement sur Instagram
7. Lucas envoie newsletter via Brevo (copie depuis newsletter.md)
8. Lucas poste les stories Instagram manuellement
9. ManyChat gère les DMs automatiquement
```

---

## ÉVOLUTIONS PRÉVUES

- [ ] Site vitrine (Claude Code + Vercel) — page vente 99€ + 300€+
- [ ] Page de capture email reliée à Brevo
- [ ] Configurer Botato pour le cross-post automatique
- [ ] Configurer ManyChat avec trigger "AGENT"
- [ ] Automatiser la publication YouTube (quand volume > 2 vidéos/semaine)
