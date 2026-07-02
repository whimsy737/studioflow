from sqlalchemy.orm import Session

from app.models.comment import Comment
from app.schemas.comment import CommentCreate


def create_comment(
    db: Session,
    project_id: int,
    comment_data: CommentCreate,
    user_id: int,
) -> Comment:
    comment = Comment(
        project_id=project_id,
        content=comment_data.content,
        user_id=user_id,
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

def get_comment_by_id(
    db: Session,
    comment_id: int,
) -> Comment | None:
    return db.query(Comment).filter(Comment.id == comment_id).first()

def update_comment(
    db: Session,
    comment_id: int,
    comment_data: CommentCreate,
    current_user_id: int,
) -> Comment | None:
    comment = get_comment_by_id(db, comment_id)

    if not comment:
        return None
    
    if comment.user_id != current_user_id:
        return None

    comment.content = comment_data.content

    db.commit()
    db.refresh(comment)

    return comment

def delete_comment(
    db: Session,
    comment_id: int,
    current_user_id: int,
) -> bool:
    comment = get_comment_by_id(db, comment_id)

    if not comment:
        return False
    
    if comment.user_id != current_user_id:
        return False

    db.delete(comment)
    db.commit()

    return True