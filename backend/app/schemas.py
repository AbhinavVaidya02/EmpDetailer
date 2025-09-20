from pydantic import BaseModel

class EmployeeBase(BaseModel):
    name: str
    email: str
    position: str

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(EmployeeBase):
    pass

class EmployeeOut(EmployeeBase):
    id: int
    actual_resume_filename: str | None = None
    ref_resume_filename: str | None = None

    class Config:
        from_attributes = True