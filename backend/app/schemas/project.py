from datetime import datetime
from pydantic import BaseModel


class ProjectCreate(BaseModel):
    title: str
    description: str | None = None
    status: str = "todo"
    deadline: datetime | None = None


class ProjectResponse(BaseModel):
    id: int
    owner_id: int | None = None
    title: str
    description: str | None
    status: str
    deadline: datetime | None
    created_at: datetime

    model_config = {
        "from_attributes": True
    }