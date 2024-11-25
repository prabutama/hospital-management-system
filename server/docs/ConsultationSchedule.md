## GET SCHEDULE DOCTOR DATA

GET /api/consultation-schedule

```json
  [
  {
    "schedule_id": 2,
    "dokter_id": 1,
    "start_time": "06:45:00",
    "end_time": "19:00:00",
    "Doctor": {
      "name": "arva"
    }
  },
  {
    "schedule_id": 3,
    "dokter_id": 2,
    "start_time": "07:45:00",
    "end_time": "12:00:00",
    "Doctor": {
      "name": "achmad"
    }
  },

] 
```

## ADD SCHEDULE DOCTOR DATA (BY STAFF)
POST /api/consultation-schedule

request 
```json
  {
  "email":"doctor123@gmail.com",
  "password":"12345678",
  "doctor_name": "dokter12",
  "start_time": "06:15:00",
  "end_time": "15:45:00"
}
```
response 
```json
{
  "message": "Doctor and consultation schedule created successfully.",
  "doctor": {
    "user_id": 12,
    "name": "dokter12",
    "email": "doctor123@gmail.com",
    "password": "$2b$10$Ub.NjjNUebUf.DigP.eFEesn0G9mHOKmNHiQKSPeDluLFkgOfHetG",
    "role": "doctor",
    "resetPasswordToken": null,
    "resetPasswordExpires": null
  },
```

## UPDATE SCHEDULE DOCTOR DATA (BY STAFF)
PUT /api/consultation-schedule/staff/:idSchedule
Request
```json
  {
     "doctor_name":"arva",
    "start_time":"06:45:00",
    "end_time":"19:00:00",
  }
```

Response 
```json
{
  "message": "Consultation schedule updated successfully"
}
```

## DELETE SCHEDULE DOCTOR DATA (BY STAFF)
DELETE /api/consultation-schedule/staff/:idSchedule

response 
```json
{
  "message": "Consultation schedule deleted successfully"
}
```