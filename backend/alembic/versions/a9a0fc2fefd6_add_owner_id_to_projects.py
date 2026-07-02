"""add owner_id to projects

Revision ID: a9a0fc2fefd6
Revises: 265419476f31
Create Date: 2026-07-02 17:05:36.819879

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a9a0fc2fefd6'
down_revision: Union[str, Sequence[str], None] = '265419476f31'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "projects",
        sa.Column("owner_id", sa.Integer(), nullable=True),
    )

    op.create_foreign_key(
        "fk_projects_owner_id_users",
        "projects",
        "users",
        ["owner_id"],
        ["id"],
    )


def downgrade() -> None:
    op.drop_constraint(
        "fk_projects_owner_id_users",
        "projects",
        type_="foreignkey",
    )

    op.drop_column("projects", "owner_id")