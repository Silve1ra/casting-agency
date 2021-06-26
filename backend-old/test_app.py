#----------------------------------------------------------------------------#
# Imports
#----------------------------------------------------------------------------#

import os
import unittest
import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from app import create_app
from models import setup_db, db_drop_and_create_all, Actor, Movie

#----------------------------------------------------------------------------#
# Auth Roles.
#----------------------------------------------------------------------------#
JWT_CASTING_ASSISTANT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBtRXg1YzJ2TmVyaE15RHB4VFB5NiJ9.eyJpc3MiOiJodHRwczovL3NpbHZlMXJhLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MGQ0OTY4NDAzYTZlYTAwNzAxNTYyMzgiLCJhdWQiOiJjYXN0aW5nLWFnZW5jeSIsImlhdCI6MTYyNDU0NTExMSwiZXhwIjoxNjI0NjMxNTExLCJhenAiOiJtN3hqVE00WTJTcUdmTFJrOVk3aFRjcjhCYnhjaWZiVSIsInNjb3BlIjoiIiwicGVybWlzc2lvbnMiOlsiZ2V0OmFjdG9ycyIsImdldDptb3ZpZXMiXX0.qBoZC5nJueierlgD309-7_PGn1TnZjCqssjKdBCyMd3ZQzGNim9d-OQZqXy-I14y5yhKLBtTXfAU_DaUPn1Qm1T0fBbzPiHGlaLGDUOln2dzC17jSmv1tbpiwUUCuYJ2OshseaPsV7rXO5fPQkewXlhkj7Fg1dPssfLW4pH_4vjF9vnUL3CU2znjOkmPCQrhAeZ5QXxRjqTmDCOkIerCqgiQrdqp0cM8CRqcVdtilQVU8Gdwz2eNySKL5ns0lMIc58nYPbJjOVcNkAQsXFQ0KBmOEgfGTyh0alfWoc-KjtqKOcFHcV9gt8rbo9HmO5xtDu2q-bpxruOnOVEhWKFy0w'

JWT_CASTING_DIRECTOR = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBtRXg1YzJ2TmVyaE15RHB4VFB5NiJ9.eyJpc3MiOiJodHRwczovL3NpbHZlMXJhLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MDlkNjUxNzM4NzJiYjAwNjhlNWVlN2MiLCJhdWQiOiJjYXN0aW5nLWFnZW5jeSIsImlhdCI6MTYyNDU0NTE2MywiZXhwIjoxNjI0NjMxNTYzLCJhenAiOiJtN3hqVE00WTJTcUdmTFJrOVk3aFRjcjhCYnhjaWZiVSIsInNjb3BlIjoiIiwicGVybWlzc2lvbnMiOlsiZGVsZXRlOmFjdG9ycyIsImdldDphY3RvcnMiLCJnZXQ6bW92aWVzIiwicGF0Y2g6YWN0b3JzIiwicGF0Y2g6bW92aWVzIiwicG9zdDphY3RvcnMiXX0.a8cPqZqAYPLfst68RO8W7cxDcXpgnuJ1KTPNaQshPke20eB8zxAVjHLgM0OUt91Xt0Tx-ieAiWKzyKv7qspUOAROExTRPPdjGGRG9vRBctS4oRABZkd63wjQWOqUPi_nQiExukqZyRy2FfybRqtA_tLg2zgn_Ryo1rzqgZHBWpY5RWqiX4OLVUmarfsmNM65UD0g669-v3BfrcHayvkmNGAuO4sGoqxWqdf_yrmsPacayX6dP_tMrS0sZ9SWrbbKEitVyym8F575_iuFhVM2Igfbyi2MWrIW4ICKTirSnLBh7kZpmblItOYcTV3FoMXHvDvz5K9PxaET2Nqc2kPucQ'

JWT_EXECUTIVE_PRODUCER = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBtRXg1YzJ2TmVyaE15RHB4VFB5NiJ9.eyJpc3MiOiJodHRwczovL3NpbHZlMXJhLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MDk0MjIzNzVmMjE2ODAwNmI1YmQ5ODAiLCJhdWQiOiJjYXN0aW5nLWFnZW5jeSIsImlhdCI6MTYyNDU0NTIzMSwiZXhwIjoxNjI0NjMxNjMxLCJhenAiOiJtN3hqVE00WTJTcUdmTFJrOVk3aFRjcjhCYnhjaWZiVSIsInNjb3BlIjoiIiwicGVybWlzc2lvbnMiOlsiZGVsZXRlOmFjdG9ycyIsImRlbGV0ZTptb3ZpZXMiLCJnZXQ6YWN0b3JzIiwiZ2V0Om1vdmllcyIsInBhdGNoOmFjdG9ycyIsInBhdGNoOm1vdmllcyIsInBvc3Q6YWN0b3JzIiwicG9zdDptb3ZpZXMiXX0.o608rqo-OpTn4Sqmr5QELHGrbiRExVSlBQHuQ1eG7e8-BYeI0jGQ09HLu3O9_WZw--VF3zFUwjmKe2pQpq9_RcX6XNYEsTkxN5Z5RRQLMQZVjs8TQSZ3qxpuLcI2JKCMKX0zaA01ojdCG9WGTQsCmTzBJ3DDWFkOrpq-xQUip__RICK-yqUlaMhrziwT1v_4S6GEPAoD0b7SC5zSEvgm-gqW0QHzO-uSyM6RKIZuwNAcERjevs2Q0qcdaz5oJPAd0LUp0Quq-CDyxdjh-Tu-s01AIl9a187mM4wo5TisKXtPxPVQX1800V95cNP4EPKQYNfoUT8RQwNXTJiZxkSkCQ'


class CastingAgencyTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    #----------------------------------------------------------------------------#
    # Db Config.
    #----------------------------------------------------------------------------#

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "postgres"
        self.database_path = "postgresql://{}:{}@{}/{}".format(
            'postgres', 'postgres', 'localhost:5432', self.database_name)

        setup_db(self.app, self.database_path)
        db_drop_and_create_all()

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)

            # create all tables
            self.db.create_all()

    def tearDown(self):
        """Executed after reach test"""
        pass

    #----------------------------------------------------------------------------#
    # Unit tests.
    #----------------------------------------------------------------------------#

    #  Actor
    #  ----------------------------------------------------------------

    def test_get_actors(self):
        res = self.client().get('/actors',
                                headers={
                                    "Authorization": "Bearer " +
                                    JWT_CASTING_ASSISTANT}
                                )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)

    def test_show_actor(self):
        res = self.client().get('/actors/1',
                                headers={
                                    "Authorization": "Bearer " +
                                    JWT_CASTING_ASSISTANT}
                                )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)

    def test_404_show_actor(self):
        res = self.client().get('/actors/999',
                                headers={
                                    "Authorization": "Bearer " +
                                    JWT_CASTING_ASSISTANT}
                                )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)

    def test_create_actor(self):
        new_actor = {
            "name": "test",
            "age": 20,
            "gender": "female"
        }

        res = self.client().post('/actors', json=new_actor,
                                 headers={
                                     "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                 )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)

    def test_404_create_actor(self):
        new_actor = {
            "age": 20,
            "gender": "female"
        }

        res = self.client().post('/actors', json=new_actor,
                                 headers={
                                     "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                 )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertEqual(data['success'], False)

    def test_update_actor(self):
        actor_id = 1
        updated_actor = {
            "name": "test update",
            "age": 20,
            "gender": "female"
        }

        url = '/actors/' + str(actor_id)
        res = self.client().patch(url, json=updated_actor,
                                  headers={
                                      "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                  )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)

    def test_404_update_actor(self):
        actor_id = 999
        updated_actor = {
            "name": "test update",
            "age": 20,
            "gender": "female"
        }

        url = '/actors/' + str(actor_id)
        res = self.client().patch(url, json=updated_actor,
                                  headers={
                                      "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                  )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)

    def test_delete_actor(self):
        actor_id = 1
        url = '/actors/' + str(actor_id)
        res = self.client().delete(url,
                                   headers={
                                       "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                   )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)
        self.assertEqual(data['deleted'], actor_id)

    def test_404_delete_actor(self):
        actor_id = 999
        url = '/actors/' + str(actor_id)
        res = self.client().delete(url,
                                   headers={
                                       "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                   )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)

    #  Movie
    #  ----------------------------------------------------------------

    def test_get_movies(self):
        res = self.client().get('/movies',
                                headers={
                                    "Authorization": "Bearer " +
                                    JWT_CASTING_ASSISTANT}
                                )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)

    def test_show_movie(self):
        res = self.client().get('/movies/1',
                                headers={
                                    "Authorization": "Bearer " +
                                    JWT_CASTING_ASSISTANT}
                                )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)

    def test_404_show_movie(self):
        res = self.client().get('/movies/999',
                                headers={
                                    "Authorization": "Bearer " +
                                    JWT_CASTING_ASSISTANT}
                                )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)

    def test_create_movie(self):
        new_movie = {
            "title": "test",
            "release_date": "2000-01-20"
        }

        res = self.client().post('/movies', json=new_movie,
                                 headers={
                                     "Authorization": "Bearer " +
                                     JWT_EXECUTIVE_PRODUCER}
                                 )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)

    def test_404_create_movie(self):
        new_movie = {
            "age": 20,
            "gender": "female"
        }

        res = self.client().post('/movies', json=new_movie,
                                 headers={
                                     "Authorization": "Bearer " +
                                     JWT_EXECUTIVE_PRODUCER}
                                 )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertEqual(data['success'], False)

    def test_update_movie(self):
        movie_id = 1
        updated_movie = {
            "name": "test update",
            "age": 20,
            "gender": "female"
        }

        url = '/movies/' + str(movie_id)
        res = self.client().patch(url, json=updated_movie,
                                  headers={
                                      "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                  )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)

    def test_404_update_movie(self):
        movie_id = 999
        updated_movie = {
            "name": "test update",
            "age": 20,
            "gender": "female"
        }

        url = '/movies/' + str(movie_id)
        res = self.client().patch(url, json=updated_movie,
                                  headers={
                                      "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                  )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)

    def test_delete_movie(self):
        movie_id = 1
        url = '/movies/' + str(movie_id)
        res = self.client().delete(url,
                                   headers={
                                       "Authorization": "Bearer " + JWT_EXECUTIVE_PRODUCER}
                                   )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['error'], False)
        self.assertEqual(data['deleted'], movie_id)

    def test_404_delete_movie(self):
        movie_id = 999
        url = '/movies/' + str(movie_id)
        res = self.client().delete(url,
                                   headers={
                                       "Authorization": "Bearer " + JWT_EXECUTIVE_PRODUCER}
                                   )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)

    #  RBAC
    #  ----------------------------------------------------------------

    '''
        Casting Assistant cannot create, update or delete actors and/or movies
    '''

    def test_401_assistant_create_actor(self):
        new_actor = {
            "name": "test",
            "age": 20,
            "gender": "female"
        }

        res = self.client().post('/actors', json=new_actor,
                                 headers={
                                     "Authorization": "Bearer " + JWT_CASTING_ASSISTANT}
                                 )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['message'], "Unathorized.")
        self.assertEqual(data['success'], False)

    def test_401_assistant_create_movie(self):
        new_movie = {
            "title": "test",
            "release_date": "2000-01-20"
        }

        res = self.client().post('/movies', json=new_movie,
                                 headers={
                                     "Authorization": "Bearer " + JWT_CASTING_ASSISTANT}
                                 )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['message'], "Unathorized.")
        self.assertEqual(data['success'], False)

    def test_401_assistant_update_actor(self):
        actor_id = 1
        updated_actor = {
            "name": "test update",
            "age": 20,
            "gender": "female"
        }

        url = '/actors/' + str(actor_id)
        res = self.client().patch(url, json=updated_actor,
                                  headers={
                                      "Authorization": "Bearer " + JWT_CASTING_ASSISTANT}
                                  )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['message'], "Unathorized.")
        self.assertEqual(data['success'], False)

    def test_401_assistant_update_movie(self):
        movie_id = 1
        updated_movie = {
            "name": "test update",
            "age": 20,
            "gender": "female"
        }

        url = '/movies/' + str(movie_id)
        res = self.client().patch(url, json=updated_movie,
                                  headers={
                                      "Authorization": "Bearer " + JWT_CASTING_ASSISTANT}
                                  )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['message'], "Unathorized.")
        self.assertEqual(data['success'], False)

    def test_401_assistant_delete_actor(self):
        actor_id = 1
        url = '/actors/' + str(actor_id)
        res = self.client().delete(url,
                                   headers={
                                       "Authorization": "Bearer " + JWT_CASTING_ASSISTANT}
                                   )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['message'], "Unathorized.")
        self.assertEqual(data['success'], False)

    def test_401_assistant_delete_movie(self):
        movie_id = 1
        url = '/movies/' + str(movie_id)
        res = self.client().delete(url,
                                   headers={
                                       "Authorization": "Bearer " + JWT_CASTING_ASSISTANT}
                                   )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['message'], "Unathorized.")
        self.assertEqual(data['success'], False)

    '''
        Casting Director cannot create or delete movies
    '''

    def test_401_director_create_movie(self):
        new_movie = {
            "title": "test",
            "release_date": "2000-01-20"
        }

        res = self.client().post('/movies', json=new_movie,
                                 headers={
                                     "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                 )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['message'], "Unathorized.")
        self.assertEqual(data['success'], False)

    def test_401_director_delete_movie(self):
        movie_id = 1
        url = '/movies/' + str(movie_id)
        res = self.client().delete(url,
                                   headers={
                                       "Authorization": "Bearer " + JWT_CASTING_DIRECTOR}
                                   )
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data['message'], "Unathorized.")
        self.assertEqual(data['success'], False)


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
