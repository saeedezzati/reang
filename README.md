


BACKEND:
- cd reang/backend
- run 'pip3 install -r requirements.txt' [If you don't have Python ^3.0 you need to install it first]
- python manage.py makemigrations
- python manage.py migrate
- python manage.py createsuperuser [create a super user account]
- run 'python manage.py runserver'
- go to http://127.0.0.1:3000/admin and login with the created account

DATABASE:


FRONTEND:
- cd reang/frontend
- npm install
- npm run dev
- go to http://127.0.0.1:3030/