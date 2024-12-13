# Complaint Management System

This web application allows users to raise complaints, and administrators can view, address, and manage them. It is built using Node.js for the backend, React.js for the frontend, and MongoDB for data storage. The system also includes email notifications for new complaint submissions and status updates.

## Features

1. **Complaint Submission (User Interface)**:
   - Users can submit complaints with the following fields:
     - Complaint Title (Text input)
     - Description (Text area)
     - Category (Dropdown selection with options like "Product", "Service", and "Support")
     - Priority (Radio buttons with options: "Low", "Medium", "High")
     - Submit Button to submit complaints.

2. **Complaint Management (Admin Interface)**:
   - Admins can view and manage complaints in a table with:
     - Complaint Title, Category, Priority, Date Submitted, and Status.
     - Admins can filter complaints by status or priority.
     - Admins can view complaint details and update the status (e.g., mark as "Resolved").
     - Admins can delete complaints.

3. **Backend & Database (MongoDB)**:
   - MongoDB stores complaints with the following schema:
     - `title`: String
     - `description`: String
     - `category`: String
     - `priority`: String
     - `status`: String ("Pending", "In Progress", "Resolved")
     - `dateSubmitted`: Date
   - The backend handles CRUD operations for complaints:
     - `POST /complaints`: Users create new complaints.
     - `GET /complaints`: Admins retrieve all complaints.
     - `PUT /complaints/:id`: Admins update complaint status.
     - `DELETE /complaints/:id`: Admins delete complaints.

4. **Email Notification Functionality**:
   - Integrated email notifications using Nodemailer or SendGrid:
     - **New Complaint Submission:** Admin is notified when a new complaint is submitted.
     - **Status Update:** Admin receives an email when a complaint's status is updated.

5. **Frontend (React)**:
   - A responsive UI for:
     - Submitting complaints (for users).
     - Viewing and managing complaints (for admins).
     - Filtering complaints by status or priority.

## Demo Links

- **Frontend Demo:** [Live Demo](https://resolve-hub-frontend.vercel.app/)
- **Admin Demo:** [Live Demo](https://resolve-hub-admin.vercel.app/)
- **Backend Demo:** [Live API](https://resolve-hub-backend.vercel.app/)


# Complaint Management System

## How to Use the Application

### 1. User Interface (Complaint Submission)

As a user, you need to register first to submit complaints. Follow these steps:

#### Step 1: User Registration
- Navigate to the **Registration Page**.
- Fill in the registration form with the following details:
  - **Email** – A valid email address.
  - **Password** – A secure password (minimum length, e.g., 8 characters).
  - **Confirm Password** – Re-enter the password to confirm.
- After filling in the form, click the **Register** button to create your account.
- Upon successful registration, you'll be logged in automatically and redirected to the complaint submission page.

#### Step 2: Login (if not registered)
- If you've already registered but logged out, go to the **Login page**.
- Enter your **Email** and **Password**, and click **Login** to proceed.

#### Step 3: Submit a Complaint
Once logged in, you will have access to the complaint submission form:
- **Complaint Title** – Enter a brief title for your complaint.
- **Description** – Provide a detailed description of your complaint.
- **Category** – Choose from a predefined list (e.g., "Product", "Service", "Support").
- **Priority** – Select "Low", "Medium", or "High".
- After filling out the form, click the **Submit** button to create a complaint.
- Upon successful submission, you'll see a confirmation message.
- An email notification will be sent to the admin about the new complaint.

### 2. Admin Interface (Complaint Management)

As an admin, you can view and manage complaints. Follow these steps:

#### Step 1: Admin Login
- Navigate to the **Login page** and enter your admin credentials to log in.

#### Step 2: View Complaints
- Once logged in, you will be directed to the **Complaints Dashboard**, where you can view all complaints.
- The complaints will be displayed in a table with:
  - **Complaint Title**
  - **Category**
  - **Priority**
  - **Date Submitted**
  - **Status** (Pending, In Progress, Resolved)
- Use the **Search** and **Filter** options to search for complaints by status or priority.

#### Step 3: Update Complaint Status
- **View Complaint Details**: Click on any complaint to see the full details, including the description and current status.
- **Change Status**: As an admin, you can update the status of complaints (e.g., from "Pending" to "Resolved").
- After updating the status, an email notification will be sent to confirm the status change.

#### Step 4: Delete Complaints
- **Delete Complaint**: Admins can delete a complaint by selecting the **Delete** option next to the complaint entry.

### 3. Backend API (with User Authentication)

The backend exposes several API endpoints that allow users to register, log in, and admins to manage complaints:

#### User Registration (POST /auth/register)
- **Route**: `POST /api/auth/register`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }

