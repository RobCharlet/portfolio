# 🚀 Guide de déploiement - Architecture Serveur Express

Ce guide explique comment déployer le portfolio sur ton propre serveur avec Express.

## 📋 Architecture

```
┌─────────────────┐
│   Utilisateur   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Gatsby (8000)  │ ← Site statique
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Express (3000)  │ ← Serveur API TypeScript
│   server.ts     │   - Formulaire contact
└────────┬────────┘   - CSRF protection
         │            - reCAPTCHA v3
         ▼
┌─────────────────┐
│  Serveur SMTP   │
└─────────────────┘
```

## 🛠️ Développement local

### 1. Installation

```bash
yarn install
```

### 2. Configuration

Copie `env.example` vers `_.env.production` et remplis les valeurs :

```bash
cp env.example _.env.production
```

Variables requises :
```env
GATSBY_RECAPTCHA_SITE_KEY=***REMOVED***
RECAPTCHA_SECRET_KEY=***REMOVED***
MAIL_HOST=smtp.laposte.net
MAIL_PORT=587
MAIL_USER=robin.charlet@laposte.net
MAIL_PASSWORD=***
MAIL_CONTACT=robin.charlet@laposte.net
```

### 3. Lancer en développement

**Terminal 1 - Gatsby** :
```bash
yarn develop
```

**Terminal 2 - Serveur Express** :
```bash
yarn server:dev
```

Le site sera accessible sur `http://localhost:8000`

## 🌐 Déploiement en production

### 1. Build du site Gatsby

```bash
yarn build
```

Cela génère le dossier `public/` avec le site statique.

### 2. Upload sur ton serveur

#### Via FTP/SFTP
```bash
# Upload le dossier public/
scp -r public/* user@ton-serveur:/var/www/portfolio/

# Upload le serveur
scp server.ts user@ton-serveur:/var/www/portfolio-api/
scp package.json user@ton-serveur:/var/www/portfolio-api/
scp _.env.production user@ton-serveur:/var/www/portfolio-api/.env.production
scp tsconfig.json user@ton-serveur:/var/www/portfolio-api/
```

#### Via Git
```bash
# Sur ton serveur
git clone https://github.com/RobCharlet/portfolio.git
cd portfolio
yarn install
yarn build
```

### 3. Configuration du serveur

#### Installer les dépendances production
```bash
cd /var/www/portfolio-api
yarn install --production=false
```

#### Lancer le serveur avec PM2

```bash
# Installer PM2 globalement si nécessaire
npm install -g pm2

# Compiler et lancer le serveur
pm2 start server.ts --name portfolio-api --interpreter ts-node

# Sauvegarder la config PM2
pm2 save
pm2 startup
```

### 4. Configuration Nginx

Exemple de configuration Nginx :

```nginx
# Site statique (Gatsby)
server {
    listen 80;
    server_name robincharlet.fr www.robincharlet.fr;
    
    root /var/www/portfolio/public;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # API Express
    location /contact {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /csrf-token {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL (HTTPS)

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir un certificat SSL
sudo certbot --nginx -d robincharlet.fr -d www.robincharlet.fr
```

## 🔄 Mise à jour

### Workflow Git

```bash
# Sur ton serveur
cd /var/www/portfolio
git pull origin main
yarn install
yarn build

# Redémarrer le serveur Express
pm2 restart portfolio-api
```

## 📊 Monitoring

### Logs PM2

```bash
# Voir les logs en temps réel
pm2 logs portfolio-api

# Voir le statut
pm2 status

# Redémarrer si nécessaire
pm2 restart portfolio-api
```

### Logs Nginx

```bash
# Logs d'accès
tail -f /var/log/nginx/access.log

# Logs d'erreurs
tail -f /var/log/nginx/error.log
```

## 🔒 Sécurité

### Firewall

```bash
# Autoriser HTTP/HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Port 3000 ne doit PAS être ouvert (accès uniquement via Nginx)
# sudo ufw deny 3000/tcp
```

### Variables d'environnement

- ❌ Ne JAMAIS commiter `_.env.production`
- ✅ Garder le fichier hors du dossier web public
- ✅ Permissions : `chmod 600 _.env.production`

## 🧪 Tests

### Tests d'accessibilité

```bash
yarn test
```

### Générer les types GraphQL

```bash
# Après avoir lancé gatsby develop
yarn codegen
```

## 📝 Scripts disponibles

```bash
yarn develop       # Lancer Gatsby en dev
yarn build         # Build production
yarn server        # Lancer le serveur Express (production)
yarn server:dev    # Lancer le serveur Express (dev avec hot-reload)
yarn test          # Tests
yarn codegen       # Générer types GraphQL
```

## 🆘 Dépannage

### Le formulaire ne fonctionne pas

1. Vérifier que le serveur Express tourne :
```bash
pm2 status
```

2. Vérifier les logs :
```bash
pm2 logs portfolio-api
```

3. Tester l'endpoint directement :
```bash
curl -X GET http://localhost:3000/csrf-token
```

### Erreur CORS

Vérifie que `SITE_URL` dans `.env.production` correspond à ton domaine :
```env
SITE_URL=https://robincharlet.fr
```

### reCAPTCHA échoue

1. Vérifie que les clés sont correctes
2. Vérifie que ton domaine est autorisé dans la console Google reCAPTCHA
3. En dev, autorise `localhost` dans les paramètres reCAPTCHA

## 📚 Ressources

- Documentation TypeScript : https://www.typescriptlang.org/
- Documentation PM2 : https://pm2.keymetrics.io/
- Documentation Nginx : https://nginx.org/en/docs/
- Documentation reCAPTCHA : https://developers.google.com/recaptcha

## 🎉 Ce qui a changé vs ancien système

### ✅ Améliorations
- TypeScript pour le serveur ET les hooks
- Tests d'accessibilité automatisés
- reCAPTCHA v3 (meilleure protection)
- Serveur Express moderne avec async/await

### 🔄 Resté identique
- Architecture générale (Gatsby + Express)
- Hébergement sur ton serveur
- Gestion DNS inchangée
- Coûts identiques

Tu as le meilleur des deux mondes : modernisation du code sans changer d'hébergement ! 🚀

