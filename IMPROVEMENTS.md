# Améliorations du Portfolio

Ce document décrit les améliorations apportées au projet.

## 1. TypeScript et GraphQL Codegen

### Configuration
- `tsconfig.json` : Configuration TypeScript
- `codegen.yml` : Configuration GraphQL Code Generator
- Plugin Gatsby TypeScript activé

### Hooks migrés vers TypeScript
- `src/hooks/use-sitemetadata.ts`
- `src/hooks/use-github.ts`

### Scripts disponibles
```bash
yarn codegen          # Générer les types GraphQL
yarn codegen:watch    # Générer les types en mode watch
```

### Génération des types
Les types GraphQL sont générés dans `src/generated/graphql.ts` après avoir lancé le serveur de développement Gatsby et exécuté `yarn codegen`.

## 2. Tests d'accessibilité automatisés

### Configuration
- Jest configuré avec `jest.config.js`
- `jest-axe` pour les tests d'accessibilité
- `@testing-library/react` pour les tests de composants

### Scripts de test
```bash
yarn test              # Lancer les tests
yarn test:watch        # Lancer les tests en mode watch
yarn test:coverage     # Générer un rapport de couverture
```

### Tests créés
- `src/components/__tests__/contact.test.tsx` : Tests d'accessibilité du formulaire
- `src/components/__tests__/header.test.tsx` : Tests d'accessibilité du header

## 3. Fonctions serverless (Netlify)

### Architecture
Le serveur Express a été remplacé par des fonctions serverless Netlify :

- **Avant** : Serveur Express (`handleForm.js`)
- **Après** : Fonction Netlify (`netlify/functions/contact.ts`)

### Configuration Netlify
- `netlify.toml` : Configuration du build et des fonctions

### Avantages
- Pas de serveur à maintenir
- Scaling automatique
- Coûts réduits
- Meilleure sécurité

### Développement local
```bash
netlify dev    # Lance le serveur de développement avec les fonctions
```

## 4. reCAPTCHA v3

### Configuration
reCAPTCHA v3 est intégré au formulaire de contact pour protéger contre les bots.

### Variables d'environnement
```env
GATSBY_RECAPTCHA_SITE_KEY=votre_clé_publique
RECAPTCHA_SECRET_KEY=votre_clé_secrète
```

### Fonctionnement
1. Le formulaire génère un token reCAPTCHA lors de la soumission
2. Le token est envoyé avec les données du formulaire
3. La fonction serverless vérifie le token côté serveur
4. Score minimum requis : 0.5 (sur une échelle de 0 à 1)

### Obtenir les clés reCAPTCHA
1. Aller sur https://www.google.com/recaptcha/admin
2. Créer un nouveau site avec reCAPTCHA v3
3. Copier la clé du site et la clé secrète dans votre fichier `.env.production`

## Variables d'environnement

Copiez `.env.example` vers `.env.production` et remplissez les valeurs :

```bash
cp .env.example .env.production
```

## Déploiement

### Netlify
1. Connectez votre repository GitHub à Netlify
2. Configurez les variables d'environnement dans les paramètres Netlify
3. Le build et le déploiement se feront automatiquement

### Variables d'environnement Netlify
Ajoutez ces variables dans Site settings > Build & deploy > Environment :
- `GATSBY_GA4_MEASUREMENT_ID`
- `GATSBY_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USER`
- `MAIL_PASSWORD`
- `MAIL_CONTACT`

