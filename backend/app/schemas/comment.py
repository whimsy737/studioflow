from datetime import datetime

from pydantic import BaseModel


class CommentCreate(BaseModel):
    content: str


class CommentResponse(BaseModel):
    id: int
    project_id: int
    user_id: int | None = None
    content: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }