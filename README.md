# DONATION

Plateforme de Collecte de Dons - Master CCA Beni Mellal

Cette plateforme web permet de collecter des dons pour l'organisation d'un buffet lors des soutenances du Master Comptabilité, Contrôle et Audit (CCA) à l'Université Sultan Moulay Slimane de Beni Mellal.

## Fonctionnalités

- Page d'accueil avec présentation du projet et objectif de la collecte
- Barre de progression dynamique montrant l'avancement vers l'objectif
- Formulaire de don avec différentes options de paiement
- Affichage des donateurs avec leurs messages de soutien
- Informations bancaires pour les virements
- Formulaire de contact
- Responsive design pour tous les appareils

## Technologies utilisées

- Frontend : HTML5, CSS3, JavaScript (Vanilla)
- Backend : Node.js avec Express
- Stockage : Fichiers JSON pour la persistance des données

## Installation et démarrage

### Prérequis

- Node.js (v14 ou supérieur)
- npm (v6 ou supérieur)

### Installation

1. Clonez ce dépôt :
```bash
git clone https://github.com/MrAbdBiya/DONATION.git
cd DONATION
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez le serveur :
```bash
npm start
```

4. Accédez à l'application dans votre navigateur :
```
http://localhost:3001
```

Pour le développement avec rechargement automatique :
```bash
npm run dev
```

## Structure du projet

```
donation-platform-master-cca/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # JavaScript frontend
├── server.js           # Serveur backend Express
├── data/               # Dossier pour les données persistantes
│   └── donations.json  # Stockage des dons
├── package.json        # Configuration npm
└── README.md           # Documentation
```

## API

### Endpoints disponibles

- `GET /api/donations` : Récupérer tous les dons publics
- `POST /api/donations` : Ajouter un nouveau don
- `GET /api/stats` : Obtenir les statistiques de la collecte

## Auteurs

- Équipe du Master CCA - Université Sultan Moulay Slimane, Beni Mellal 