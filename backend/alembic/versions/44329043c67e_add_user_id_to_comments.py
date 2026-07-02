"""add user_id to comments

Revision ID: 44329043c67e
Revises: a9a0fc2fefd6
Create Date: 2026-07-03 00:23:44.300561

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '44329043c67e'
down_revision: Union[str, Sequence[str], None] = 'a9a0fc2fefd6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "comments",
        sa.Column("user_id", sa.Integer(), nullable=True),
    )

    op.create_foreign_key(
        "fk_comments_user_id_users",
        "comments",
        "users",
        ["user_id"],
        ["id"],
    )


def downgrade() -> None:
    op.drop_constraint(
        "fk_comments_user_id_users",
        "comments",
        type_="foreignkey",
    )

    op.drop_column("comments", "user_id")
