# Étape 1 : Construction de l'application React
FROM node:latest AS builder

# Créer un répertoire pour la construction
RUN mkdir /build

# Définir le répertoire de travail dans le conteneur
WORKDIR /build

# Copier tout le code source dans le répertoire de travail
COPY . .

# Installer les dépendances et construire l'application
RUN npm install
RUN npm run build

# Étape 2 : Serveur Node.js pour servir les fichiers statiques
FROM node:latest

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de la phase de construction dans le répertoire de travail
COPY --from=builder /build/build /app/build

# Installer le package `serve` pour servir les fichiers statiques
RUN npm install -g serve

# Exposer le port 3000
EXPOSE 3000

# Commande pour démarrer l'application avec `serve`
CMD ["serve", "-s", "build", "-l", "3000"]