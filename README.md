# Groupomania_P7

## Backend

### Installation

```
npm install
```

#### Configuration de la base de donnée
Depuis le dossier Backend créer un fichier .env 

**PORT** = 5000  

**DB_USERNAME** = ' nom utilisateur'  

**DB_PASSWORD** = ' mot de passe '

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


#### lancement du serveur backend
```
npm start
```




## Frontend



### Installation

```
npm install
```


#### lancement du serveur backend
```
npm run dev
```
