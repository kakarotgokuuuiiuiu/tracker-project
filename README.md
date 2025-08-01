# Habit Hero

Habit Hero is a full-stack habit tracker app built using **Django** (backend) and **ReactJS** (frontend). It allows users to create, track, and analyze daily or weekly habits with features like streaks, success rate, and visual charts.


## 🚀 Features

* 📅 Habit creation with daily/weekly frequency
* 📈 Success rate calculation and current streak tracking
* 📊 Calendar view with habit check-ins
* 📉 Recharts-powered analytics for habit trends


## 🏗 Project Structure

habit-hero-2/
├── habit_hero/                 # Django backend root
│   ├── manage.py
│   ├── tracker/                # Habit tracking app (models, views, API)
│   ├── users/                  # User authentication and registration
│
├── frontend/                   # React frontend root
│   ├── public/
│   ├── src/
│   │   ├── components/         # React components
│   │   └── App.jsx             # Main React component
│
└── README.md                   # Project instructions and setup


##🧪 Backend Setup (Django)

### 1. Create virtual environment and install dependencies

git clone https://github.com/kakarotgokuuuiiuiu/tracker-project.git
cd tracker
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt


### 2. Run migrations and start server


python manage.py makemigrations
python manage.py migrate
python manage.py runserver

### 3. Required Python Packages (`requirements.txt`)
Django>=4.2,<5.0
djangorestframework
django-cors-headers


##  Frontend Setup (ReactJS)

### 1. Navigate and install dependencies

cd frontend
npm install

### 3. Start Frontend

npm run dev  # or npm start


### 4. Required NPM Packages

axios
react-router-dom
recharts

## 🔗 API Endpoints Summary

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| GET    | /api/habits/          | List all habits  |
| POST   | /api/habits/          | Create new habit |
| PUT    | /api/habits/<id>/     | Update a habit   |
| DELETE | /api/habits/<id>/     | Delete a habit   |
| POST   | /api/checkin/         | Log a check-in   

git remote add origin https://github.com/kakarotgokuuuiiuiu/tracker-project.git

