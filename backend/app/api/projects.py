from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.repositories.project_repository import (
    create_project,
    delete_project,
    get_project_by_id,
    get_projects,
    update_project,
)
from app.schemas.project import ProjectCreate, ProjectResponse

router = APIRouter(prefix="/projects", tags=["projects"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("", response_model=ProjectResponse)
def create(project_data: ProjectCreate, db: Session = Depends(get_db)):
    return create_project(db, project_data)


@router.get("", response_model=list[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    return get_projects(db)

@router.put("/{project_id}", response_model=ProjectResponse)
def update(
    project_id: int,
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
):
    project = update_project(db, project_id, project_data)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project


@router.delete("/{project_id}")
def delete(
    project_id: int,
    db: Session = Depends(get_db),
):
    success = delete_project(db, project_id)

    if not success:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"message": "Project deleted"}