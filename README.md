# Contrôle à distance éthique - Projet minimal

## Description

Ce projet permet, avec le consentement explicite d’un utilisateur, de partager son écran et de recevoir des commandes simples à distance.

## Contenu

- `server.js` : serveur WebSocket Node.js de signalisation WebRTC
- `client.html` : page client, doit être ouverte sur le téléphone cible
- `admin.html` : page admin, permet de voir le flux écran et envoyer des commandes
- `README.md` : ce fichier

## Déploiement

1. Héberger `server.js` sur un serveur Node.js accessible (ex: Railway, Heroku, VPS)
2. Modifier dans `client.html` et `admin.html` l’URL WebSocket (`ws://TON_SERVEUR:8080`) par l’URL publique de votre serveur WebSocket.
3. Héberger `client.html` et `admin.html` sur GitHub Pages ou Cloudflare Pages.
4. Le client doit ouvrir `client.html` et accepter le partage d’écran.
5. L’admin ouvre `admin.html` et peut contrôler avec les boutons.

## Avertissements

- Respecter la vie privée et ne pas utiliser sans consentement clair.
- Ce code est une preuve de concept très basique.
- Pour un usage réel, renforcer la sécurité (authentification, HTTPS, etc.).