@echo off
call env\Scripts\activate
cd backend
python manage.py runserver