# API Documentation

Base URL: `http://api.spaasmobility.com:3333`

All POST bodies are JSON.  All requests require the `Content-Type: application/json` header to be set.

## Register

```
POST /register

{
    "username": "myemail@email.com",
    "password": "passswroddd123"
}
```
   
## Login

```
POST /login

{
    "username": "myemail@email.com",
    "password": "passswroddd123"
}
```

## Devices

`GET /device/<code>`

`code` is a 6 digit SPAAS device code found on the device. 

The endpoint returns device information.
	

