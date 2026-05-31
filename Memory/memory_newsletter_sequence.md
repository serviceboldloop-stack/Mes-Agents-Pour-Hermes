# MÉMOIRE — Séquences email + newsletter
## Apprentissages session 2026-05-29

> Toutes les erreurs, corrections et règles apprises lors de la création de la séquence Prompt TikTok Template.
> À lire AVANT toute création de newsletter ou séquence email.

---

## ERREURS À NE PLUS FAIRE

### 1. Montrer la structure au lieu du contenu réel
**Erreur :** J'ai présenté un "plan" avec "Corps : valeur gratuite, exemple d'utilisation..." au lieu d'écrire les emails directement.
**Règle :** Quand Lucas demande à voir la séquence, écrire les emails complets tels que le client les reçoit. Pas de description de structure — le contenu réel.

### 2. Timing des emails
**Erreur :** J'ai proposé J+0 / J+2 / J+4 / J+7 / J+14.
**Règle :** Les séquences onboarding se font en jours consécutifs : **J+0, J+1, J+2, J+3, J+4**. Pas de gaps.

### 3. Mise en forme dans les emails
**Erreur :** J'ai utilisé du gras (**texte**) dans les emails.
**Règle :** Zéro mise en forme dans les emails — pas de gras, pas d'italique, pas de listes à puces. Texte brut uniquement. Les emails de Lucas ressemblent à un message d'un ami.

### 4. "Agent TikTok IA" → "agent TikTok"
**Erreur :** J'ai écrit "agent TikTok IA" dans les emails 2, 3 et 4. Lucas a dû corriger 3 fois.
**Règle :** Dans les emails de Lucas, c'est "agent TikTok" — jamais "agent TikTok IA". Le "IA" ne fait pas partie du nom commercial dans les emails.

### 5. Inventer des stats
**Erreur :** J'ai écrit "je prends 4 clients par mois maximum" — Lucas ne l'a jamais dit.
**Règle :** Ne jamais inventer des stats, des chiffres, des contraintes (places, disponibilité, délais). Si Lucas ne les donne pas, ne pas les mettre.

### 6. Ouverture d'email mal écrite
**Erreur :** "T'as commenté PROMPT — voilà ce que je t'avais promis."
**Règle :** Ouverture naturelle et humaine : "Merci d'avoir commenté sous la vidéo." Pas de rappel robotique du mot-clé ManyChat dans l'email.

### 7. Nombre de scripts dans le prompt
**Erreur :** J'ai mis "Génère 3 scripts" dans le prompt gratuit.
**Règle :** Le prompt gratuit génère **1 seul script**. Le différenciateur de l'agent payant c'est entre autres le volume (7 scripts). Ne pas offrir trop dans la ressource gratuite.

### 8. Créer des fichiers inutiles (HTML Brevo)
**Erreur :** J'ai créé 5 fichiers email1.html à email5.html pour Brevo, et 5 templates dans Brevo via l'API — tout ça était inutile. La séquence se gère dans le code Next.js.
**Règle :** La séquence email chez Kairos est codée dans une route Next.js `/api/subscribe-[nom]` avec `scheduledAt`. PAS besoin de templates Brevo ni d'automation UI. Regarder le modèle existant dans `subscribe-tiktok-agent/route.ts` avant de faire quoi que ce soit.

### 9. Tester l'automation Brevo via API
**Erreur :** J'ai cherché des endpoints automation Brevo qui n'existent pas dans l'API publique.
**Règle :** Brevo n'a pas d'API publique pour créer des workflows d'automation visuels. La solution Kairos = `scheduledAt` dans l'API transactionnelle. C'est plus simple et ça marche.

### 10. Brevo API — champ `name` vs `templateName`
**Erreur :** Pour créer un template Brevo via API, j'ai utilisé `"name"` → erreur "Template name is missing".
**Règle :** L'API Brevo utilise **`templateName`** (pas `name`) pour créer un template email.

### 11. Mauvais serveur de preview
**Erreur :** J'ai démarré le serveur `review-v1` (Python, pour les vidéos) au lieu du serveur `kairos-dev`.
**Règle :** Pour prévisualiser le site Kairos, lancer le serveur `kairos-dev` (port 3000, npm run dev dans le dossier kairos). Le launch.json de ce projet pointe vers un autre serveur.

---

## STRUCTURE D'UNE NOUVELLE SÉQUENCE EMAIL — Ordre des étapes

1. **Identifier la ressource gratuite** (prompt, template, guide, agent...)
2. **Identifier l'upsell** (99€ agent TikTok / 299€ agent sur-mesure)
3. **Écrire les 5 emails complets** directement (pas de plan intermédiaire)
4. **Valider avec Lucas** — corrections de style, ton, contenu
5. **Créer la route Next.js** en s'inspirant de `subscribe-tiktok-agent/route.ts`
6. **Créer la liste Brevo** via API (POST /contacts/lists)
7. **Créer la page de capture** en s'inspirant de `agent-tiktok-ia/page.tsx`
8. **Déployer** : `npx vercel --prod --yes` depuis `C:\Users\chapo\Documents\kairos`
9. **Tester l'API** en prod avec curl
10. **Mettre à jour** `Context/ressources_gratuites.md`

---

## STYLE DES EMAILS LUCAS — Règles validées terrain

- Pas de "Bonjour", pas de "Salut" — entrer dans le vif directement
- Pas de gras, pas d'italique, pas de mise en forme
- Grammaire orale acceptée ("t'as", "y'a", "c'est pas")
- Phrases courtes — max 2 lignes par paragraphe
- Signer "Lucas" uniquement — pas "L'équipe Kairos" (base_memory dit "Kairos" mais les emails validés terrain signent "Lucas" — "Lucas" fait autorité)
- CTA naturel : "je peux te configurer un agent TikTok personnalisé : [lien]" — pas de bouton agressif dans les emails 1-3
- Email 4 = seul email avec un bouton CTA visible
- Désabonnement en bas de chaque email (obligatoire)
- Ton ami → pas marque

---

## STRUCTURE EMAILS VALIDÉE

| Email | Timing | Objectif | CTA |
|-------|--------|----------|-----|
| Email 1 | J+0 | Livraison ressource + 1 action immédiate | Aucun |
| Email 2 | J+1 | Nommer la friction de la ressource gratuite | CTA doux (lien texte) |
| Email 3 | J+2 | Comparaison ressource vs agent | CTA moyen (lien texte) |
| Email 4 | J+3 | Question directe + offre claire | CTA fort (bouton) |
| Email 5 | J+4 | Valeur bonus + invitation newsletter | CTA doux (lien texte) |

---

## ARCHITECTURE TECHNIQUE SÉQUENCES KAIROS

```
Page de capture (/app/[nom-ressource]/page.tsx)
  → formulaire appelle /api/subscribe-[nom-ressource]
    → route.ts :
        1. Ajoute le contact à la liste Brevo (listIds: [ID])
        2. Programme les 5 emails via scheduledAt (Brevo transactionnel)
    → 5 emails envoyés à J+0, J+1, J+2, J+3, J+4
```

**Listes Brevo :**
- Liste 5 : Acheteurs Kairos
- Liste 6 : Agent TikTok IA - Mises à jour
- Liste 8 : Newsletter Ressources Gratuites
- Liste 9 : Agent Sur-Mesure
- Liste 10 : Prompt TikTok Template ← nouvelle (2026-05-29)

**Liens Stripe :**
- 99€ agent TikTok : `process.env.NEXT_PUBLIC_STRIPE_OPTION3` = `https://buy.stripe.com/14A7sL3bw4Xc8dXeD1eQM02`
- 299€ agent sur-mesure : `process.env.NEXT_PUBLIC_STRIPE_OPTION2`

**Déploiement :**
```
cd C:\Users\chapo\Documents\kairos
npx vercel --prod --yes
```

---

## DIFFÉRENCE PRODUITS (ne plus confondre)

| Produit | Prix | Description | Route API |
|---------|------|-------------|-----------|
| Agent TikTok | 99€ | Base template personnalisé au style du client | subscribe-tiktok-agent |
| Agent sur-mesure | 299€ | Construit de A à Z selon le besoin client | subscribe-prompt-tiktok |

---

## CE QUI FAIT PERDRE DU TEMPS — À ÉVITER

1. Présenter un "plan" au lieu d'écrire directement le contenu → Lucas veut voir le contenu réel
2. Chercher une automatisation Brevo via API → ça n'existe pas, utiliser scheduledAt
3. Créer des fichiers HTML séparés pour les emails → tout va dans la route.ts
4. Lancer le mauvais serveur de preview → toujours vérifier le nom dans launch.json
5. Corriger les mêmes erreurs de style plusieurs fois → lire cette mémoire d'abord
