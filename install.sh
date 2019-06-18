#!/bin/bash
pip install django
pip install pillow
python manage.py makemigrations
python manage.py migrate --fake-initial
python manage.py createsuperuser
python manage.py runserver