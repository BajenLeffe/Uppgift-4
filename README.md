# Attendance MVC Webserver

Simple server-rendered attendance system using Express (MVC) and PostgreSQL.

Login Credentials
- **Admin**: username `admin`, password `123`
- **Student**: username `student`, password `321`

Requirements
- Node.js 16+
- PostgreSQL database
- A `.env` file with `DATABASE_URL` and `SESSION_SECRET`

Setup
1. Copy `.env.example` to `.env` and set:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: A random secret string for sessions
   - `PORT`: (optional) Server port, defaults to 3000

2. Install dependencies:

```bash
npm install
```

3. Run migrations to create database tables:

```bash
npm run migrate
```

4. Seed the database with default accounts:

```bash
npm run seed
```

This creates:
- Admin account: `admin` / `123`
- Student account: `student` / `321`

5. Start server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

Teacher features
- Add and list students (`/students`, `/students/new`)
- Register attendance (`/attendance/register`)
- View recent attendance history (`/attendance/history`)

Security
- For production, set a strong `SESSION_SECRET`, use HTTPS, and use a persistent session store.
- Change the default passwords after initial setup.


