# Habit Hero

Habit Hero is a full-stack habit tracker app built using **Django** (backend) and **ReactJS** (frontend). It allows users to create, track, and analyze daily or weekly habits with features like streaks, success rate, and visual charts.

---

## 🚀 Features

* 📅 Habit creation with daily/weekly frequency
* 📈 Success rate calculation and current streak tracking
* 📊 Calendar view with habit check-ins
* 📉 Recharts-powered analytics for habit trends

---

## 🏗 Project Structure

```
habit hero 2/
├── habit_hero/
│   ├── manage.py
│   ├── tracker/          # Django app for habit logic
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│      ├── components/
│      └── App.jsx
│   
└── README.md
```

---

## 🧪 Backend Setup (Django)

### 1. Create virtual environment and install dependencies

```bash
git clone https://github.com/kakarotgokuuuiiuiu/tracker-project.git
cd tracker-project
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```


### 2. Run migrations and start server

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 3. Required Python Packages (`requirements.txt`)

```
Django>=4.2,<5.0
djangorestframework
django-cors-headers

```

---

## 🎨 Frontend Setup (ReactJS)

### 1. Navigate and install dependencies

```bash
cd frontend
npm install
```

### 2. Start Frontend Server

```bash
npm run dev  # or npm start
```

### 4. Required NPM Packages

```
axios
react-router-dom
recharts
```

---

## 🔗 API Endpoints Summary

| Method | Endpoint              | Description      |
| ------ | --------------------- | ---------------- |
| GET    | `/api/habits/`        | List all habits  |
| POST   | `/api/habits/`        | Create new habit |
| PUT    | `/api/habits/<id>/`   | Update a habit   |
| DELETE | `/api/habits/<id>/`   | Delete a habit   |
| POST   | `/api/checkin/`       | Log a check-in   |

[API documentation, click here](https://documenter.getpostman.com/view/47231714/2sB3BALXjt#a8cf846d-bf76-4104-bb6a-e3a512bf639d)

---
