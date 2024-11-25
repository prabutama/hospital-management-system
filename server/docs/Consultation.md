## REQUEST APPOINTMENT (Pasien)
POST /api/consultation

Request
```json
  {
      "doctor_id":3,
      "patient_id":1,
      "complaint":"sakit uhuyyy",
      "schedule_id": 1
  }
```
Response 
```json
{
  "message": "Consultation request created successfully",
  "consultation": {
    "consultation_id": 1,
    "dokter_id": 3,
    "pasien_id": 1,
    "complaint": "sakit uhuyyy",
    "schedule_id": 1,
    "status": "pending",
    "response": null
  }
}
```

## GET DATA APPOINTMENT BY STAFF 
GET /api/consultation/list-appointment/

Response
```json
{
  "message": "Appointments retrieved successfully",
  "appointments": [
    {
      "consultation_id": 1,
      "dokter": {
        "name": "arva doktor"
      },
      "pasien": {
        "name": "arva pasien"
      },
      "complaint": "sakit uhuyyy",
      "status": "pending"
    },
    {
      "consultation_id": 2,
      "dokter": {
        "name": "isa doktor"
      },
      "pasien": {
        "name": "achmad pasien"
      },
      "complaint": "sakit hati",
      "status": "accepted"
    },
  ]
}
```
## GET DATA APPOINTMENT BY DOCTOR 
GET /api/consultation/list-appointment/:doctorId

Response
```json
{
  "message": "Appointments retrieved successfully",
  "appointments": [
    {
      "consultation_id": 1,
      "complaint": "sakit uhuyyy",
      "response": null,
      "status": "pending",
      "pasien": {
        "name": "arva pasien"
      }
    }
  ]
}
```