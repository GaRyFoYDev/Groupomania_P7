# Groupomania_P7

## Backend

### Installation

Open the backend folder from the command line

Run this command to install the packages
```
npm install
```

#### Database configuration 
From the backend folder create a .env file

**PORT** = 5000  

**DB_USERNAME** = ' username'   

**DB_PASSWORD** = ' password'

**DB_NAME** = 'database'

**DB_HOST** = 127.0.0.1

**SECRET** = ' string for the token payload '



#### Database creation
```
sequelize db:create 
```


#### Tables creation
```
sequelize db:migrate 
```


#### Image folder creation
```
mkdir images
```


#### Run the backend server
```
npm start
```


#### Create an admin

Update the user role field to "admin" in your database.



## Frontend



### Installation

Open the frontend folder from the command line

Run this command to install the packages
```
npm install
```


#### Run the frontend server
```
npm run dev
```

Open the app fom the localhost:3000
