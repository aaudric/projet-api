#  Recipes & Nutrition 


## Table of Contents

- [Recipes \& Nutrition](#recipes--nutrition)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Démonstration](#démonstration)
  - [Fonctionnalités](#fonctionnalités)
  - [Technologies Utilisées](#technologies-utilisées)
  - [Installation et Configuration](#installation-et-configuration)
    - [Configuration et Lancement du Backend](#configuration-et-lancement-du-backend)
    - [Configuration et Lancement du Frontend](#configuration-et-lancement-du-frontend)
  - [Lancement de l'Application](#lancement-de-lapplication)
  - [Documentation et Test de l'API avec Swagger](#documentation-et-test-de-lapi-avec-swagger)
  - [Crédits](#crédits)

## Description

 Nutrition Recipes est une application web qui permet aux utilisateurs de découvrir des recettes. L'application récupère les données de recettes via deux API backend, l'une affichant les recettes avec des détails tels que les ingrédients et l'autre les informations nutritionnelles asssociées aux ingrédients de la recette.

## Démonstration

![Démo](/Démo.gif)

## Fonctionnalités

- Affichage de recettes en choisissant le type de recttes, le type de cuisne et le nombre de rectte à afficher.
- Détails de recettes incluant les ingrédients et les informations nutritionnelles.
- Interface utilisateur simple et réactive adaptée à tous les appareils.

## Technologies Utilisées

- **Frontend** : HTML, CSS, JavaScript - pour construire l'interface utilisateur.
- **Backend** : Node.js, Express - pour l'API de récupération des recettes.
- **API de Recettes** : Spoonacular API - pour obtenir les données de recettes.
- **API de Nutriscore** : Open Food Facts - pour obtenir le nutriscore des ingrédients

## Installation et Configuration

Assurez-vous d'avoir Node.js installé sur votre machine. Vous pouvez le télécharger et l'installer à partir de [Node.js official website](https://nodejs.org/).

### Configuration et Lancement du Backend

1. Clonez le dépôt de l'application ou téléchargez les fichiers source.
2. Naviguez dans le dossier backend de l'application via un terminal.
3. Exécutez `npm install` pour installer les dépendances nécessaires.
4. Créez un fichier `.env` à la racine du projet backend et ajoutez votre clé API Spoonacular comme suit :
    ```
    PORT=3000
    SPOONACULAR_API_KEY=VotreCléAPIIci
    ```
5. Lancez le serveur backend en exécutant soit `node app.js`, `npm run dev` ou nodemon app.js` si vous avez `nodemon` installé.

### Configuration et Lancement du Frontend

Le frontend utilise Lite Server pour un rechargement automatique lors du développement.

1. Naviguez dans le dossier frontend de l'application via un terminal.
2. Assurez-vous que `lite-server` est défini comme dépendance de développement dans votre `package.json` ou installez-le en exécutant :
    ```
    npm install lite-server --save-dev
    ```
3. Ajoutez le script suivant à votre `package.json` sous l'objet `scripts` si ce n'est pas déjà fait :
    ```json
    "dev": "light-server -s . -p 9090 -w \"./**/*.js, ./**/*.html\""

    ```
4. Pour lancer le frontend, exécutez la commande suivante :
    ```
    npm run dev
    ```
    Cette commande démarrera Lite Server, qui servira vos fichiers frontend et ouvrira votre navigateur par défaut à l'adresse du frontend. Le serveur surveillera les changements dans les fichiers et rechargera la page automatiquement, facilitant ainsi le développement.

## Lancement de l'Application

Après avoir configuré et lancé le backend, et exécuté `npm run dev` pour le frontend, votre application devrait être accessible via le navigateur à l'adresse indiquée par Lite Server.


## Documentation et Test de l'API avec Swagger

L'API de Nutrition Recipes peut être testée et explorée à l'aide de Swagger UI. Après avoir lancé le serveur backend, vous pouvez accéder à Swagger UI à l'adresse suivante : 
```
http://localhost:3000/api-docs 
```
Cette interface utilisateur de Swagger vous permet de voir toutes les routes disponibles, les modèles de données, et vous offre la possibilité d'envoyer des requêtes test directement depuis votre navigateur. C'est un excellent moyen de découvrir comment interagir avec l'API et de tester ses différentes fonctionnalités en temps réel.

## Crédits

Ce projet a été réalisé par :

- **GIRONDIN Audric** 
- [**DUCKES Jonathan**](https://github.com/jonathanduc)

Nous tenons à remercier nos enseignants pour leurs aides et conseils qui nous ont été très utiles que ce soit par leurs idées, leur temps ou leurs compétences.

- **PAILLOT Thomas**
- **GRESSE Hugo**