"""Add basic User table

Revision ID: 09e9ac9a446a
Revises: None
Create Date: 2016-04-05 00:13:42.757841

"""

# revision identifiers, used by Alembic.
revision = '09e9ac9a446a'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('User',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('modified', sa.DateTime(), nullable=True),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('password_hash', sa.String(length=60), nullable=False),
    sa.Column('password_salt', sa.String(length=29), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('User')
    ### end Alembic commands ###