from src.app import create_app
from src.models import setup_db, Actor, Movie
from src.auth import AuthError, requires_auth

app = create_app()

if __name__ == '__main__':
    app.run()