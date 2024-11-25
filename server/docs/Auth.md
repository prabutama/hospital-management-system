## LOGIN

POST /api/login
Request 
```json
{
      "email": "arvazf09@gmail.com",
      "password": "12345678"
}
```
Response
```json
{
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcnZhemYwOUBnbWFpbC5jb20iLCJyb2xlIjoicGFzaWVuIiwiaWF0IjoxNzMyNDQ5ODAwLCJleHAiOjE3MzI0NTM0MDB9.ANSkGGRz1LAWQ5fVxHg-YN0Cum2FVVq6Qdjm_vokBwA",
      "name": "arva",
      "email": "arvazf09@gmail.com"
}
```

## REGISTER 

POST /api/register
Request
```json
{
      "name": "arva",
      "email": "arvazf09@gmail.com",
      "password": "12345678",
}
```

Response 
```json
{
      {
  "message": "User registered successfully",
  "user": {
    "role": "pasien",
    "user_id": 1,
    "name": "arva",
    "email": "arvazf09@gmail.com",
    "password": "$2b$10$a0FhZQMPOBe25kPi39nZg.2Y98W31GQPgjfyqUNyTDqi51QR4i792",
    "resetPasswordToken": null,
    "resetPasswordExpires": null
      }
      }
}
```

## Logout 
POST /api/logout
Response
```json 
{
  "message": "User logged out successfully"
}
```