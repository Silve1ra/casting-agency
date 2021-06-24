#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

import os
import sys
from sqlalchemy import Column, String, Integer
from flask_sqlalchemy import SQLAlchemy

#----------------------------------------------------------------------------#
# Db Config.
#----------------------------------------------------------------------------#

try:  
   database_path = os.environ['DATABASE_URL']
except KeyError: 
   print("Please set the environment variable")
   sys.exit(1)


db = SQLAlchemy()

#  Setup db
#  ----------------------------------------------------------------


def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    # db_drop_and_create_all()


#  Drop and create all db
#  ----------------------------------------------------------------
def db_drop_and_create_all():
    db.drop_all()
    db.create_all()

    # add one demo row for actors
    actor = Actor(
        name='Christian Bale',
        age='47',
        gender='male'
    )
    actor.insert()

    # add one demo row for movies
    movie = Movie(
        title='The Dark Knight Rises',
        release_date='2012-07-27',
    )
    movie.insert()

#----------------------------------------------------------------------------#
# Models.
#----------------------------------------------------------------------------#

#  Actor
#  ----------------------------------------------------------------


class Actor(db.Model):
    __tablename__ = 'actors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    age = db.Column(db.String(120))
    gender = db.Column(db.String(120))

    def __init__(self, name, age, gender):
        self.name = name
        self.age = age
        self.gender = gender

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
        }


#  Movie
#  ----------------------------------------------------------------
class Movie(db.Model):
    __tablename__ = 'movies'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    release_date = db.Column(db.DateTime(), nullable=False)

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'release_date': self.release_date,
        }
