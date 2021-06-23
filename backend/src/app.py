#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

import os
from flask import Flask, request, abort, jsonify
from flask_cors import CORS

from models import setup_db, Actor, Movie

#----------------------------------------------------------------------------#
# App Config.
#----------------------------------------------------------------------------#

app = Flask(__name__)
setup_db(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.after_request
def after_request(response):
    response.headers.add(
        'Access-Control-Allow-Headers',
        'Content-Type,Authorization,true')

    response.headers.add(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,OPTIONS')

    return response

#----------------------------------------------------------------------------#
# Controllers.
#----------------------------------------------------------------------------#

@app.route('/')
def index():
    return 'Casting Agency API'

#  Actors
#  ----------------------------------------------------------------

@app.route('/actors')
def get_actors():
    selection = Actor.query.all()
    print(selection)
    actors = [actor.serialize() for actor in selection]

    return jsonify({
        'error': False,
        'data': actors
    })

@app.route('/actors/<int:actor_id>')
def show_actor(actor_id):
    actor = Actor.query.filter(Actor.id == actor_id).one_or_none()

    return jsonify({
        'error': False,
        'data': actor.serialize(),
    })

@app.route('/actors', methods=['POST'])
def create_actor():
    body = request.get_json()
    actor = Actor(name=body.get('name'), age=body.get('age'), gender=body.get('gender'))
    actor.insert()

    return jsonify({
        'error': False,
        'data': actor.serialize(),
    })

@app.route('/actors/<int:actor_id>', methods=['PATCH'])
def update_actor(actor_id):
    actor = Actor.query.filter(Actor.id == actor_id).one_or_none()

    body = request.get_json()
    if 'name' in body:
        actor.name = body.get('name')

    if 'age' in body:
        actor.age = body.get('age')

    if 'gender' in body:
        actor.gender = body.get('gender')

    actor.update()

    return jsonify({
        'error': False,
        'data': actor.serialize(),
    })
    
@app.route('/actors/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):
    actor = Actor.query.filter(Actor.id == actor_id).one_or_none()
    actor.delete()

    return jsonify({
        'error': False
    })

#  Movies
#  ----------------------------------------------------------------

@app.route('/movies')
def get_movies():
    return 'get movies'

@app.route('/movies/<int:movie_id>')
def show_movie(movie_id):
    return 'show movie'

@app.route('/movies', methods=['POST'])
def create_movie():
    return 'post movie'

@app.route('/movies/<int:movie_id>', methods=['PATCH'])
def update_movie(movie_id):
    return 'update movie'

@app.route('/movies/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    return 'delete movie'


#----------------------------------------------------------------------------#
# Launch.
#----------------------------------------------------------------------------#

if __name__ == '__main__':
    app.debug = True
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
