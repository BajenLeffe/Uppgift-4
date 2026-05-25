# Student Account Setup

To enable the "student" user to view their own attendance, you need to create a student record in your Supabase database that matches the student user account's name.

## Steps:

1. Go to https://app.supabase.com
2. Open your project
3. Click **SQL Editor**
4. Create a new query
5. Run this SQL:

```sql
-- Create student record for the "student" user account
-- The user account name is "Student User", so we match that
INSERT INTO students (name) 
VALUES ('Student User')
ON CONFLICT DO NOTHING;
```

## What This Does:

- Creates a student record with name "Student User" in the students table
- This matches the name of the "student" user account in the users table
- Now when "student" logs in, they can see attendance records assigned to their student record
- Students can ONLY see their own attendance, not other students' records

## Accounts:

- **Admin**: username: `admin`, password: `123`
  - Can add students, register attendance, view all attendance history
  
- **Student**: username: `student`, password: `321` (Name in system: "Student User")
  - Can only view their own attendance records

## Checklist - All Requirements Met:

✅ **En startsida** - Homepage at `/` showing welcome message
✅ **En sida med elevlista** - Student list at `/students` (admin only)
✅ **Ett formulär för att lägga till elever** - Add student form at `/students/new` (admin only)
✅ **En sida för att registrera närvaro** - Register attendance at `/attendance/register` (admin only)
✅ **En sida för att visa närvarohistorik** - View attendance history at `/attendance/history` (admin only)
✅ **Student attendance viewing** - Student can view only their own attendance at `/attendance/my-attendance`
✅ **Role-based navigation** - Different menu items for admin vs student roles

## Features:

- JWT-based authentication with secure HTTP-only cookies
- Role-based access control (admin vs student)
- Attendance tracking with 3 Swedish statuses:
  - Närvarande (Present)
  - Frånvarande (Absent)
  - Försenad (Delayed) - with optional delay duration tracking
- Admin navigation menu with quick links to all functions
- Student navigation menu with link to personal attendance only
