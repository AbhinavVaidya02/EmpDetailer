from fastapi import FastAPI
from .database import Base, engine
from .routers import employee
from fastapi.middleware.cors import CORSMiddleware

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS (optional if using frontend later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include employee routes
app.include_router(employee.router)