# Groupomania_P7

## Backend

### Installation

Ouvrir le dossier backend depuis le terminal de commande.

Taper la commande pour installer les paquets npm.
```
npm install
```

#### Configuration de la base de donnée
Depuis le dossier Backend créer un fichier .env 

**PORT** = 5000  

**DB_USERNAME** = ' nom utilisateur du système de gestion de base de donnée'   

**DB_PASSWORD** = ' mot de passe du système de gestion de base de donnée'

**DB_NAME** = ' nom de la base de donnée '

**DB_HOST** = 127.0.0.1

**SECRET** = ' chaine de caractère pour le payload du token '



#### Création de la de la base de donnée
```
sequelize db:create 
```


#### Création des tables
```
sequelize db:migrate 
```


#### Lancement du serveur backend
```
npm start
```




## Frontend



### Installation

Ouvrir le dossier frontend depuis le terminal de commande.

Taper la commande pour installer les paquets npm.
```
npm install
```


#### Lancement du serveur frontend
```
npm run dev
```

Ouvrez le projet en utilisant le lien fournit dans le terminal
