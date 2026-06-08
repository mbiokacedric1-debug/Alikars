# 🚗 MonoChrome Prestige - Catalogue Automobile

Un catalogue de véhicules d'occasion haut de gamme interactif et moderne. Ce projet arbore un design haute couture épuré mariant le noir absolu (#000000), le blanc pur et un accent rouge vif (#DC2626).

L'application propose des filtres de sélection en temps réel, un comparateur de fiches techniques (jusqu'à 3 véhicules), un simulateur de financement personnalisé intégré directement dans la fiche détaillée et une gestion des favoris persistante.

---

## ✨ Fonctionnalités clés

- **Visualisation Premium et Minimaliste** : Thème sombre sophistiqué, animations soignées avec `motion` et typographie moderne.
- **Filtres de Recherche Avancés** : Recherche par texte libre (marque, modèle), par constructeur, par type de boîte de vitesses, par couleur, ainsi que par curseurs dynamiques pour le budget maximal et le kilométrage maximal.
- **Analyse Comparative** : Ajout de fiches techniques côte à côte pour analyser et choisir le véhicule idéal.
- **Fiches Détaillées & Simulateur de Crédit** : Calculateur d'apport personnel et de durée de remboursement pour obtenir une estimation de mensualité personnalisée à 4,9% TAEG.
- **Formulaire de Contact Intégré** : Demande d'informations ou d'essai directement rattachée au véhicule.
- **Section Favoris** : Enregistrement local des véhicules favoris pour un accès rapide.

---

## 🛠️ Stack Technique

- **Framework** : React 19 (avec TypeScript)
- **Outil de Build** : Vite
- **Styling** : Tailwind CSS v4.0
- **Animations** : motion (importé depuis `motion/react` ou `motion`)
- **Icônes** : Lucide React

---

## 💻 Installation et Lancement Local

Suivez ces étapes pour lancer l'application sur votre machine locale :

1. **Cloner le projet** (une fois publié sur GitHub) :
   ```bash
   git clone <URL_DE_VOTRE_DEPOT_GITHUB>
   cd <NOM_DU_DEPOT>
   ```

2. **Installer les dépendance** :
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   L'application sera accessible localement à l'adresse suivante : [http://localhost:3000](http://localhost:3000) (ou le port indiqué par votre terminal).

4. **Compiler pour la production** :
   ```bash
   npm run build
   ```
   Les fichiers compilés statiques seront générés dans le dossier `dist/`.

---

## 🚀 Publication sur GitHub

Pour héberger vos fichiers et les versionner sur GitHub, suivez ces instructions dans votre terminal :

1. **Initialiser Git localement** (si ce n'est pas déjà fait) :
   ```bash
   git init
   ```

2. **Ajouter les fichiers au suivi Git** :
   ```bash
   git add .
   ```

3. **Créer votre premier Commit** :
   ```bash
   git commit -m "Initial commit: Monochrome Prestige automobile catalogue"
   ```

4. **Créer un nouveau dépôt sur GitHub** :
   - Allez sur [github.com](https://github.com) et créez un nouveau dépôt public ou privé.
   - Ne cochez pas l'option pour initialiser avec un README ou un .gitignore (ceux-ci sont déjà inclus dans le projet).

5. **Lier votre projet local à GitHub et pusher** :
   ```bash
   git branch -M main
   git remote add origin https://github.com/<VotreNomUtilisateur>/<NomDuDepot>.git
   git push -u origin main
   ```

---

## 🌍 Déploiement sur Netlify

L'application est pré-configurée avec un fichier `netlify.toml` à la racine pour assurer un déploiement fluide en un clic.

### Option 1 : Déploiement automatique via GitHub (Recommandé)
Cette option reconstruit automatiquement votre site à chaque fois que vous faites un `git push`.

1. Rendez-vous sur votre tableau de bord [Netlify](https://app.netlify.com/).
2. Cliquez sur **Add new site** > **Import an existing project**.
3. Choisissez **GitHub** comme fournisseur et autorisez Netlify.
4. Sélectionnez le dépôt de votre catalogue automobile.
5. Netlify détecte automatiquement les paramètres de configuration grâce au fichier `netlify.toml` créé à la racine :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
6. Cliquez sur **Deploy site**. Votre application sera en ligne en quelques secondes !

### Option 2 : Déploiement manuel via Netlify CLI
Si vous préférez déployer directement depuis votre terminal :

1. Installez la CLI Netlify globalement :
   ```bash
   npm install -g netlify-cli
   ```
2. Associez votre compte :
   ```bash
   netlify login
   ```
3. Initialisez et déployez le site :
   ```bash
   netlify init
   netlify deploy --prod
   ```
