from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.projects import get_db
from app.repositories.comment_repository import (
    create_comment,
    get_comments_by_project_id,
    update_comment,
    delete_comment,
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

@router.put("/{comment_id}", response_model=CommentResponse)
def update(
    project_id: int,
    comment_id: int,
    comment_data: CommentCreate,
    db: Session = Depends(get_db),
):
    comment = update_comment(db, comment_id, comment_data)

    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    return comment

@router.delete("/{comment_id}")
def delete(
    project_id: int,
    comment_id: int,
    db: Session = Depends(get_db),
):
    success = delete_comment(db, comment_id)

    if not success:
        raise HTTPException(status_code=404, detail="Comment not found")

    return {"message": "Comment deleted"}