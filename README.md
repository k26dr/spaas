# API Documentation

Base URL: `http://api.spaasmobility.com`

All POST bodies are JSON.  

All requests require the `Content-Type: application/json` header to be set.

All endpoints except `/register` and `/login` must include the `SPAAS-ACCESS-TOKEN` header set with an access token from `/login`

## Register

```
POST /register

{
    "email": "myemail@email.com",
    "password": "passswroddd123",
    "first_name": "Jake",
    "last_name": "Plumber"
}
```
   
## Login

```
POST /login

{
    "email": "myemail@email.com",
    "password": "passswroddd123"
}
```

## Add Device

`POST /device/<code>`

`code` is a 6 digit SPAAS device code found on the device. 

## Get Devices

`GET /devices`

Returns all of a user's devices
	

