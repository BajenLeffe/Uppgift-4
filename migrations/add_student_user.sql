-- Add student record for the "student" user account
-- The user account has name "Student User", so we need to match that
INSERT INTO students (name) 
VALUES ('Student User')
ON CONFLICT DO NOTHING;
