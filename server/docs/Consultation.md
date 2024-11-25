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