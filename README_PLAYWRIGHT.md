# 🎭 Tests Playwright - Portfolio

Ce guide explique comment utiliser Playwright pour tester le portfolio en local.

## 🚀 Installation

Playwright est déjà installé avec les navigateurs. Si besoin :

```bash
npx playwright install
```

## 🧪 Scripts disponibles

### Tests E2E (End-to-End)
```bash
# Lancer tous les tests
yarn test:e2e

# Interface graphique (recommandé pour le développement)
yarn test:e2e:ui

# Tests avec navigateur visible
yarn test:e2e:headed

# Mode debug (step-by-step)
yarn test:e2e:debug
```

### Tests unitaires (Jest)
```bash
# Tests d'accessibilité
yarn test

# Mode watch
yarn test:watch

# Rapport de couverture
yarn test:coverage
```

## 📁 Structure des tests

```
tests/
├── portfolio.spec.ts      # Tests principaux du site
├── github-projects.spec.ts # Tests des projets GitHub
└── server.spec.ts         # Tests de l'API Express
```

## 🎯 Types de tests

### 1. Tests de navigation
- ✅ Page d'accueil se charge
- ✅ Navigation vers /examples
- ✅ Page 404 fonctionne

### 2. Tests du formulaire de contact
- ✅ Formulaire présent et fonctionnel
- ✅ Validation des champs
- ✅ Soumission avec données valides

### 3. Tests d'accessibilité
- ✅ Navigation au clavier
- ✅ Images avec attributs alt
- ✅ Liens avec textes descriptifs

### 4. Tests de performance
- ✅ Temps de chargement < 3s
- ✅ Pas d'erreurs console

### 5. Tests responsive
- ✅ Mobile (375px)
- ✅ Tablette (768px)
- ✅ Desktop

### 6. Tests de l'API Express
- ✅ Endpoint CSRF token
- ✅ Endpoint contact
- ✅ CORS configuré

## 🔧 Configuration

### Configuration Playwright (`playwright.config.ts`)
- **Base URL** : `http://localhost:8000`
- **Serveur de dev** : Lance automatiquement `yarn develop`
- **Navigateurs** : Chrome, Firefox, Safari, Mobile
- **Timeout** : 2 minutes pour Gatsby

### Variables d'environnement
Les tests utilisent les variables de ton `.env.production` :
- `GATSBY_RECAPTCHA_SITE_KEY`
- `RECAPTCHA_SECRET_KEY`
- `MAIL_*` (pour l'API)

## 🚀 Workflow de test

### 1. Tests rapides (développement)
```bash
# Interface graphique - parfait pour le dev
yarn test:e2e:ui
```

### 2. Tests complets (CI/CD)
```bash
# Tous les tests en mode headless
yarn test:e2e
```

### 3. Tests spécifiques
```bash
# Seulement les tests du formulaire
yarn test:e2e tests/portfolio.spec.ts

# Seulement les tests de l'API
yarn test:e2e tests/server.spec.ts
```

## 🐛 Debug

### Mode debug interactif
```bash
yarn test:e2e:debug
```
- Pause à chaque étape
- Console du navigateur accessible
- Variables inspectables

### Logs détaillés
```bash
DEBUG=pw:api yarn test:e2e
```

### Screenshots automatiques
Les tests prennent automatiquement des screenshots en cas d'échec dans `test-results/`

## 📊 Rapports

### Rapport HTML
```bash
yarn test:e2e
# Ouvre automatiquement le rapport dans le navigateur
```

### Rapport CI
```bash
yarn test:e2e --reporter=github
```

## 🔍 Exemples de tests

### Test de formulaire
```typescript
test('formulaire de contact fonctionne', async ({ page }) => {
  await page.goto('/')
  
  // Remplir le formulaire
  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="mail"]', 'test@example.com')
  
  // Vérifier les valeurs
  await expect(page.locator('input[name="name"]')).toHaveValue('Test User')
})
```

### Test d'API
```typescript
test('API contact fonctionne', async ({ request }) => {
  const response = await request.post('http://localhost:3000/contact', {
    data: { name: 'Test', mail: 'test@example.com' }
  })
  
  expect(response.status()).toBe(200)
})
```

## ⚠️ Points d'attention

### reCAPTCHA en test
- Les tests utilisent des tokens de test
- En production, reCAPTCHA vérifie vraiment
- Configurer `localhost` dans la console Google reCAPTCHA

### Serveur Express
- Les tests API nécessitent le serveur Express en marche
- Utilise `yarn server:dev` en parallèle

### Timeouts
- Gatsby peut prendre du temps à démarrer
- Timeout configuré à 2 minutes
- Si problème, augmenter dans `playwright.config.ts`

## 🎉 Avantages

- ✅ **Tests visuels** - Voir le site en action
- ✅ **Tests multi-navigateurs** - Chrome, Firefox, Safari
- ✅ **Tests responsive** - Mobile, tablette, desktop
- ✅ **Tests d'API** - Serveur Express inclus
- ✅ **Debug facile** - Interface graphique
- ✅ **Rapports détaillés** - Screenshots, traces, logs

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/)
- [Best practices](https://playwright.dev/docs/best-practices)
- [Debugging](https://playwright.dev/docs/debug)
- [CI/CD](https://playwright.dev/docs/ci)

**Tes tests sont prêts ! Lance `yarn test:e2e:ui` pour commencer !** 🚀



