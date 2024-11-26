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
    "consultation_id": 2,
    "dokter_id": 3,
    "pasien_id": 2,
    "complaint": "sakit uhuyyy",
    "schedule_id": 1,
    "status": "pending",
    "consultation_date": "26 November 2024, 04:35 PM",
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
      "consultation_id": 2,
      "dokter": {
        "name": "Dr.Arva Zaki"
      },
      "pasien": {
        "name": "patient"
      },
      "complaint": "sakit uhuyyy",
      "date": "26 November 2024, 04:35 PM",
      "status": "pending"
    },
    {
      "consultation_id": 3,
      "dokter": {
        "name": "Dr.Arva Zaki"
      },
      "pasien": {
        "name": "nama pasien"
      },
      "complaint": "sakit pinggang",
      "date": "26 November 2024, 04:35 PM",
      "status": "pending"
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
      "date": "26 November 2024, 04:35 PM",
      "pasien": {
        "name": "arva pasien"
      }
    }
  ]
}
```
## GET DATA APPOINTMENT BY PATIENT 
GET /api/consultation/list-appointment/patient/:patient_id

Response
```json
{
  "message": "Appointments retrieved successfully",
  "appointments": [
    {
      "complaint": "sakit uhuyyy",
      "response": null,
      "status": "pending",
      "date": "26 November 2024, 04:35 PM",
      "doctor": {
        "name": "Dr.Arva Zaki"
      }
    }
  ]
}
```