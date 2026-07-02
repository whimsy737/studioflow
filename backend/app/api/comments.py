from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.repositories.comment_repository import (
    create_comment,
    get_comments_by_project_id,
    update_comment,
    delete_comment,
)
from app.schemas.comment import CommentCreate, CommentResponse

from app.api.auth import get_current_user

router = APIRouter(
    prefix="/projects/{project_id}/comments",
    tags=["comments"],
)


@router.post("", response_model=CommentResponse)
def create(
    project_id: int,
    comment_data: CommentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_comment(
        db,
        project_id,
        comment_data,
        current_user.id,
    )


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
    current_user=Depends(get_current_user),
):
    comment = update_comment(
        db,
        comment_id,
        comment_data,
        current_user.id,
    )

    if not comment:
        raise HTTPException(
            status_code=404,
            detail="Comment not found",
        )

    return comment

@router.delete("/{comment_id}")
def delete(
    project_id: int,
    comment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    success = delete_comment(
        db,
        comment_id,
        current_user.id,
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Comment not found",
        )

    return {"message": "Comment deleted"}