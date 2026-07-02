from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import SessionLocal, get_db
from app.repositories.project_repository import (
    create_project,
    delete_project,
    get_project_by_id,
    get_projects,
    update_project,
)
from app.schemas.project import ProjectCreate, ProjectResponse

from app.api.auth import get_current_user

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("", response_model=ProjectResponse)
def create(
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_project(
        db,
        project_data,
        current_user.id,
    )


@router.get("", response_model=list[ProjectResponse])
def read_projects(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_projects(
        db,
        current_user.id,
    )

@router.get("/{project_id}", response_model=ProjectResponse)
def get_detail(
    project_id: int,
    db: Session = Depends(get_db),
):
    project = get_project_by_id(db, project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project

@router.put("/{project_id}", response_model=ProjectResponse)
def update(
    project_id: int,
    project_data: ProjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    project = update_project(
        db,
        project_id,
        project_data,
        current_user.id,
    )
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project


@router.delete("/{project_id}")
def delete(
    project_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    success = delete_project(
        db,
        project_id,
        current_user.id,
    )

    if not success:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"message": "Project deleted"}