from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate


def create_project(db: Session, project_data: ProjectCreate) -> Project:
    project = Project(**project_data.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


def get_projects(db: Session) -> list[Project]:
    return db.query(Project).order_by(Project.created_at.desc()).all()

def get_project_by_id(db: Session, project_id: int) -> Project | None:
    return db.query(Project).filter(Project.id == project_id).first()


def update_project(
    db: Session,
    project_id: int,
    project_data: ProjectCreate,
) -> Project | None:

    project = get_project_by_id(db, project_id)

    if not project:
        return None

    for key, value in project_data.model_dump().items():
        setattr(project, key, value)

    db.commit()
    db.refresh(project)

    return project


def delete_project(db: Session, project_id: int) -> bool:
    project = get_project_by_id(db, project_id)

    if not project:
        return False

    db.delete(project)
    db.commit()

    return True