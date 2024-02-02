
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## Test 

```bash

$ npx jest  

```

## Api Documentation 

```bash

url : https://documenter.getpostman.com/view/5269633/2s9YyvBfdR

```

## API URL

```bash

- Base Url : http://localhost:3000/v1/

## CREATE RESTAURANT
- restaurant
- POST Method
- Body  :  {"city" : "Lagos", "address" : "Abule egba", "latitude" : 6.6484, "longitude" : 3.2992}

## FETCH ALL RESTAURANTS 
- /restaurant/all
- GET Method 

## VIEW RESTAURANT 

- /restaurant/:id
- GET Method


## UPDATE RESTAURANT 
- /restaurant/:id 
- PUT Method 
- Body  :  {"city" : "Lagos"}


## DELETE RESTAURANT

- /restaurant/:id
- DELETE Method

## GET NEARBY RESTAURANT 

- /restaurant?city=New%20York&latitude=6.5941&longitude=3.3362&distance=1000
- GET Method

```


