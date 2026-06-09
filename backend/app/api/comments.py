from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.projects import get_db
from app.repositories.comment_repository import (
    create_comment,
    get_comments_by_project_id,
)
from app.schemas.comment import CommentCreate, CommentResponse

router = APIRouter(
    prefix="/projects/{project_id}/comments",
    tags=["comments"],
)


@router.post("", response_model=CommentResponse)
def create(
    project_id: int,
    comment_data: CommentCreate,
    db: Session = Depends(get_db),
):
    return create_comment(db, project_id, comment_data)


@router.get("", response_model=list[CommentResponse])
def list_comments(
    project_id: int,
    db: Session = Depends(get_db),
):
    return get_comments_by_project_id(db, project_id)