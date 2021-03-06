"""empty message

Revision ID: 5180bed5bf97
Revises: fc38980eaee1
Create Date: 2016-05-30 17:26:50.221670

"""

# revision identifiers, used by Alembic.
revision = '5180bed5bf97'
down_revision = 'fc38980eaee1'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_profiles',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created', sa.DateTime(), nullable=True),
    sa.Column('modified', sa.DateTime(), nullable=True),
    sa.Column('birthday', sa.Date(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('users', sa.Column('profile_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'users', 'user_profiles', ['profile_id'], ['id'])
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='foreignkey')
    op.drop_column('users', 'profile_id')
    op.drop_table('user_profiles')
    ### end Alembic commands ###
