web: daphne myProject.asgi:application --port $PORT --bind 0.0.0.0 -v2
web2: gunicorn myProject.wsgi --log-file -
worker: python manage.py runworker channel_layer -v2
