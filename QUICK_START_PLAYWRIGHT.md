# 🚀 Guide de démarrage rapide - Playwright

## ✅ Tests prêts à l'emploi

Tes tests Playwright sont configurés et fonctionnels ! Voici comment les utiliser :

## 🎯 Commandes essentielles

### Tests rapides (recommandé)
```bash
# Tests de base uniquement (plus rapides)
yarn test:e2e:basic

# Tests qui fonctionnent bien (base + portfolio)
yarn test:e2e:working

# Tests d'API simplifiés (sans CSRF)
yarn test:e2e:api

# Interface graphique pour voir le site en action
yarn test:e2e:basic:ui

# Interface graphique avec tous les tests qui marchent
yarn test:e2e:working:ui

# Interface graphique pour les tests d'API
yarn test:e2e:api:ui
```

### Tests complets
```bash
# Tous les tests (tous navigateurs)
yarn test:e2e

# Interface graphique complète
yarn test:e2e:ui
```

## 🎭 Interface graphique (recommandé)

L'interface graphique est **parfaite** pour :
- ✅ Voir ton site en action
- ✅ Debugger les tests
- ✅ Comprendre ce qui se passe
- ✅ Tester manuellement

```bash
yarn test:e2e:basic:ui
```

## 📊 Ce qui est testé

### Tests de base (`tests/basic.spec.ts`)
- ✅ **Page d'accueil** se charge
- ✅ **Formulaire de contact** présent
- ✅ **Navigation** fonctionne
- ✅ **Responsive** sur mobile
- ✅ **Pas d'erreurs JavaScript** critiques

### Tests avancés (`tests/portfolio.spec.ts`)
- ✅ **Accessibilité** (navigation clavier, images alt)
- ✅ **Performance** (temps de chargement)
- ✅ **Multi-navigateurs** (Chrome, Firefox, Safari)
- ✅ **Multi-devices** (Mobile, tablette, desktop)

## 🔧 Configuration

### Configuration par défaut (`playwright.config.ts`)
- **1 navigateur** : Chrome uniquement
- **Plus rapide** pour le développement
- **Parfait** pour les tests de base

### Configuration complète (`playwright.config.ts`)
- **5 navigateurs** : Chrome, Firefox, Safari, Mobile
- **Plus complet** pour la CI/CD
- **Plus lent** mais plus robuste

## 🚀 Workflow recommandé

### 1. Développement quotidien
```bash
# Interface graphique - voir le site
yarn test:e2e:working:ui

# Tests d'API (si serveur Express en marche)
yarn test:e2e:api:ui
```

### 2. Avant commit
```bash
# Tests qui fonctionnent bien
yarn test:e2e:working

# Tests d'API (optionnel)
yarn test:e2e:api
```

### 3. Avant déploiement
```bash
# Tests complets (tous navigateurs)
yarn test:e2e
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
DEBUG=pw:api yarn test:e2e:basic
```

## 📁 Structure des tests

```
tests/
├── basic.spec.ts           # ✅ Tests de base (recommandé)
├── portfolio.spec.ts       # Tests avancés
├── github-projects.spec.ts # Tests projets GitHub
└── server.spec.ts         # Tests API Express
```

## 🎉 Avantages

- ✅ **Tests visuels** - Voir le site en action
- ✅ **Tests multi-navigateurs** - Chrome, Firefox, Safari
- ✅ **Tests responsive** - Mobile, tablette, desktop
- ✅ **Debug facile** - Interface graphique
- ✅ **Rapports détaillés** - Screenshots, traces, logs
- ✅ **Tests d'API** - Serveur Express inclus

## 🚨 Points d'attention

### Serveur Express
- Les tests d'API nécessitent le serveur Express en marche
- Utilise `yarn server:dev` en parallèle pour les tests d'API

### reCAPTCHA
- Les tests utilisent des tokens de test
- En production, reCAPTCHA vérifie vraiment
- Configurer `localhost` dans la console Google reCAPTCHA

### Timeouts
- Gatsby peut prendre du temps à démarrer
- Timeout configuré à 2 minutes
- Si problème, augmenter dans la config

## 🎯 Prochaines étapes

1. **Lance l'interface graphique** :
   ```bash
   yarn test:e2e:basic:ui
   ```

2. **Explore tes tests** - Voir le site en action

3. **Personnalise** - Adapte les tests à ton contenu

4. **Intègre en CI/CD** - Automatise les tests

## 📚 Ressources

- [Documentation Playwright](https://playwright.dev/)
- [Best practices](https://playwright.dev/docs/best-practices)
- [Debugging](https://playwright.dev/docs/debug)

**Tes tests sont prêts ! Lance `yarn test:e2e:basic:ui` pour commencer !** 🚀
