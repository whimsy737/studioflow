from sqlalchemy.orm import Session

from app.models.comment import Comment
from app.schemas.comment import CommentCreate


def create_comment(
    db: Session,
    project_id: int,
    comment_data: CommentCreate,
) -> Comment:
    comment = Comment(
        project_id=project_id,
        content=comment_data.content,
    )

    db.add(comment)
    db.commit()
    db.refresh(comment)

    return comment


def get_comments_by_project_id(
    db: Session,
    project_id: int,
) -> list[Comment]:
    return (
        db.query(Comment)
        .filter(Comment.project_id == project_id)
        .order_by(Comment.created_at.desc())
        .all()
    )