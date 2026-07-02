from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import ProjectCreate


def create_project(
    db: Session,
    project_data: ProjectCreate,
    owner_id: int,
):
    project = Project(
        **project_data.model_dump(),
        owner_id=owner_id,
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_projects(
    db: Session,
    owner_id: int,
) -> list[Project]:
    return (
        db.query(Project)
        .filter(Project.owner_id == owner_id)
        .order_by(Project.created_at.desc())
        .all()
    )

def get_project_by_id(db: Session, project_id: int) -> Project | None:
    return db.query(Project).filter(Project.id == project_id).first()


def update_project(
    db: Session,
    project_id: int,
    project_data: ProjectCreate,
    current_user_id: int,
) -> Project | None:

    project = get_project_by_id(db, project_id)

    if not project:
        return None
    
    if project.owner_id != current_user_id:
        return None

    for key, value in project_data.model_dump().items():
        setattr(project, key, value)

    db.commit()
    db.refresh(project)

    return project


def delete_project(
        db: Session,
        project_id: int,
        current_user_id: int,
) -> bool:
    project = get_project_by_id(db, project_id)

    if not project:
        return False
    
    if project.owner_id != current_user_id:
        return False

    db.delete(project)
    db.commit()

    return True