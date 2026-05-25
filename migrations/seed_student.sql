-- Insert the student user as a student record if not already exists
INSERT INTO students (name) 
VALUES ('student')
ON CONFLICT DO NOTHING;
