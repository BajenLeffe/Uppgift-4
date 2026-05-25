-- Create users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMP DEFAULT now()
);

-- Create events
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT now()
);

-- Create attendance (unique per user+event)
CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  attended_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id,event_id)
);

-- Table for sessions used by connect-pg-simple
CREATE TABLE IF NOT EXISTS session (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamptz NOT NULL,
  CONSTRAINT session_pkey PRIMARY KEY (sid)
);

-- Students table for teacher-managed students
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  student_number TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);

-- Attendance records linked to students
CREATE TABLE IF NOT EXISTS student_attendance (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  taken_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  attended_at TIMESTAMP DEFAULT now(),
  notes TEXT
);
