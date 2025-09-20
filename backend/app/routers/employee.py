from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from .. import models, schemas, database
import os
from datetime import datetime
from .. utils.HTTPResponse import HTTPResponse

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Path to resume folder
RESUME_FOLDER = os.path.join(os.path.dirname(__file__), "../../resumes")

# Make sure folder exists
os.makedirs(RESUME_FOLDER, exist_ok=True)

@router.post("/employees/", response_model=schemas.EmployeeOut)
def create_employee_with_resume(
    name: str = Form(...),
    email: str = Form(...),
    position: str = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # 1. Create employee entry with actual_resume_filename but ref_resume_filename as None initially
        new_emp = models.Employee(
            name=name,
            email=email,
            position=position,
            actual_resume_filename=resume.filename,
            ref_resume_filename=None
        )
        db.add(new_emp)
        db.commit()
        db.refresh(new_emp)
        print("In...")

        # 2. Rename resume file to {id}_{timestamp}.pdf
        timestamp_str = datetime.now().strftime("%Y%m%d_%H%M%S")
        new_filename = f"{new_emp.id}_{timestamp_str}.pdf"
        file_path = os.path.join(RESUME_FOLDER, new_filename)

        # 3. Save the uploaded file to the resumes folder with new filename
        with open(file_path, "wb") as f:
            f.write(resume.file.read())

        # 4. Update the employee record with the reference filename
        new_emp.ref_resume_filename = new_filename
        db.commit()
        db.refresh(new_emp)
        print("Out1...")
        employee_data = schemas.EmployeeOut.model_validate(new_emp).model_dump()
        print("Out2...")
        return HTTPResponse.success(message="User Details", result=employee_data)
    except Exception as e:
        print(str(e))
        return HTTPResponse.error()