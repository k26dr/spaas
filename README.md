# API Documentation

Base URL: `http://api.spaasmobility.com`

All POST bodies are JSON.  All requests require the `Content-Type: application/json` header to be set.

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

## Devices

`GET /device/<code>`

`code` is a 6 digit SPAAS device code found on the device. 

The endpoint returns device information.
	

