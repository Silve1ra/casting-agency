#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

import os
from flask import Flask, request, abort, jsonify
from flask_cors import CORS

from models import setup_db, Actor, Movie

def create_app(test_config=None):

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
        return jsonify({
            'service': 'Casting Agency API',
            'version': '1.0',
            'author': 'Felipe Silveira'
        })

    #  Actors
    #  ----------------------------------------------------------------

    @app.route('/actors')
    def get_actors():
        try:
            selection = Actor.query.all()
            actors = [actor.serialize() for actor in selection]

            return jsonify({
                'error': False,
                'data': actors
            })
        except BaseException:
            abort(500)


    @app.route('/actors/<int:actor_id>')
    def show_actor(actor_id):
        try:
            actor = Actor.query.filter(Actor.id == actor_id).one_or_none()
            return jsonify({
                'error': False,
                'data': actor.serialize(),
            })
        except BaseException:
            abort(404)


    @app.route('/actors', methods=['POST'])
    def create_actor():
        body = request.get_json()
        if 'name' not in body:
            abort(400)

        try:
            actor = Actor(name=body.get('name'), age=body.get('age'), gender=body.get('gender'))
            actor.insert()

            return jsonify({
                'error': False,
                'data': actor.serialize(),
            })
        except BaseException:
            abort(422)


    @app.route('/actors/<int:actor_id>', methods=['PATCH'])
    def update_actor(actor_id):
        actor = Actor.query.filter(Actor.id == actor_id).one_or_none()
        if actor is None:
            abort(404)

        body = request.get_json()
        if not body:
            abort(400)

        try:
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

        except BaseException:
            abort(400)

        
    @app.route('/actors/<int:actor_id>', methods=['DELETE'])
    def delete_actor(actor_id):
        actor = Actor.query.filter(Actor.id == actor_id).one_or_none()
        if actor is None:
            abort(404)

        try:
            actor.delete()
            return jsonify({
                'error': False,
                'deleted': actor_id
            })

        except BaseException:
            abort(422)


    #  Movies
    #  ----------------------------------------------------------------

    @app.route('/movies')
    def get_movies():
        try:
            selection = Movie.query.all()
            movies = [movie.serialize() for movie in selection]

            return jsonify({
                'error': False,
                'data': movies
            })
        except BaseException:
            abort(500)


    @app.route('/movies/<int:movie_id>')
    def show_movie(movie_id):
        try:
            movie = Movie.query.filter(Movie.id == movie_id).one_or_none()
            return jsonify({
                'error': False,
                'data': movie.serialize(),
            })

        except BaseException:
            abort(404)


    @app.route('/movies', methods=['POST'])
    def create_movie():
        body = request.get_json()
        if 'title' not in body:
            abort(400)

        try:
            movie = Movie(title=body.get('title'), release_date=body.get('release_date'))
            movie.insert()

            return jsonify({
                'error': False,
                'data': movie.serialize(),
            })

        except BaseException:
            abort(422)


    @app.route('/movies/<int:movie_id>', methods=['PATCH'])
    def update_movie(movie_id):
        movie = Movie.query.filter(Movie.id == movie_id).one_or_none()
        if movie is None:
            abort(404)

        body = request.get_json()
        if not body:
            abort(400)

        try:    
            if 'title' in body:
                movie.title = body.get('title')

            if 'release_date' in body:
                movie.release_date = body.get('release_date')

            movie.update()

            return jsonify({
                'error': False,
                'data': movie.serialize(),
            })

        except BaseException:
            abort(400)


    @app.route('/movies/<int:movie_id>', methods=['DELETE'])
    def delete_movie(movie_id):
        movie = Movie.query.filter(Movie.id == movie_id).one_or_none()
        if movie is None:
            abort(404)

        try:
            movie.delete()
            return jsonify({
                'error': False,
                'deleted': movie_id
            })

        except BaseException:
            abort(422)


    #----------------------------------------------------------------------------#
    # Error handlers.
    #----------------------------------------------------------------------------#

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False,
            "error": 400,
            "message": "bad request"
        }), 400


    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            "success": False,
            "error": 401,
            "message": 'unathorized'
        }), 401


    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "error": 404,
            "message": "resource not found"
        }), 404


    @app.errorhandler(405)
    def not_allowed(error):
        return jsonify({
            "success": False,
            "error": 405,
            "message": "method not allowed"
        }), 405


    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            "success": False,
            "error": 422,
            "message": "unprocessable"
        }), 422


    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({
            "success": False,
            "error": 500,
            "message": "internal server error"
        }), 500


    return app
