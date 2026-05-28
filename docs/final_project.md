# Final Project

## Personal Productivity Dashboard



# Project Overview

For the final project, you will build a **Personal Productivity Dashboard** — a web application inspired by the task manager application we developed in class, but expanded with additional features and improved architecture.

The goal of this project is to demonstrate your understanding of:

- React fundamentals
- Component-based architecture
- State management
- Hooks
- Routing
- Forms
- API communication
- Reusable UI design
- Data persistence
- Clean project structure

This project is intentionally open-ended enough to allow creativity while still covering all concepts covered in class.

# General Description

The application helps users organize their productivity by managing:

- Tasks
- Notes
- Categories
- Priorities
- Daily progress

Users should be able to:

- Create, edit, delete, and filter data
- Navigate between multiple pages
- Save/Load data
- Make use of external API's


# Technical Requirements

## 1. React Application Setup

The project must:

- Use React
- Use functional components only
- Use hooks instead of class components
- Use Vite


# Core Features

## 2. Authentication Simulation

Implement a simple authentication system.

### Requirements

- Login page
- Logout functionality
- Protected routes
- Store login state
- Redirect unauthorized users

### Notes

You do NOT need a real backend authentication server.

You may use:

- localStorage
- mock users
- fake API


## 3. Dashboard Page

The dashboard should display productivity information.

### Must Include

- Welcome section
- Statistics cards
- Recent tasks
- Completion progress
- Productivity summary

### Example Statistics

- Total tasks
- Completed tasks
- Pending tasks
- High priority tasks

## 4. Task Management System

This is the main feature of the application.

### Users Must Be Able To

- Add tasks
- Edit tasks
- Delete tasks
- Mark tasks complete/incomplete
- Set priority
- Assign categories
- Add due dates

### Each Task Should Include

- Title
- Description
- Status
- Priority
- Due date
- Category

---

## 5. Filtering and Search

Implement advanced filtering functionality.

### Required Filters

- By status
- By category
- By priority
- By due date

### Search

Users should be able to search tasks by:

- Title
- Description


## 6. Notes Section

Create a notes management feature.

### Requirements

- Create notes
- Edit notes
- Delete notes
- Search notes


## 7. Routing

Use React Router.

### Required Pages

- Login
- Dashboard
- Tasks
- Notes
- Settings
- 404 Page

### Requirements

- Navigation bar
- Nested routes (optional bonus)
- Protected routes

---

## 8. Forms and Validation

All forms must include validation.

### Requirements

- Required fields
- Error messages
- Controlled components
- Form reset behavior

### Bonus

Use:

- React Hook Form
- Yup/Zod validation


## 9. State Management

Your application must demonstrate proper state management.

### Must Include

- useState
- useEffect
- useContext

### Optional Bonus

- useReducer
- Custom hooks


## 10. Data Persistence

Application data must persist after refresh.

### Acceptable Options

- localStorage
- sessionStorage
- mock API
- JSON server


## 11. API Integration

Use at least one external API.

### Possible Examples

- Weather API
- Quote API
- Productivity tips API
- Public holidays API

### Requirements

- Fetch data asynchronously
- Loading states
- Error handling


## 12. Reusable Components

Create at least one reusable UI component.

### Examples

- Button
- Modal
- Card
- Input
- Select
- Loader
- Confirmation dialog

---

## 13. Styling

The project is not focusing on styling but application should have consistent styling

### Requirements

- Responsive design
- Proper spacing/alignment
- Consistent colors/fonts


### Acceptable Approaches

- CSS 
- Tailwind


# React Concepts That Must Be Demonstrated Checklist

| Topic | Required |
|---|---|
| Components |  |
| Props |  |
| State |  |
| Event handling |  |
| Conditional rendering |  |
| Lists & keys |  |
| Forms |  |
| Hooks |  |
| useEffect |  |
| Context API |  |
| Routing |  |
| API calls |  |
| Reusable components |  |
| Component composition |  |

---

# Suggested Folder Structure

```txt
src/
│
├── components/
├── pages/
├── hooks/
├── context/
├── services/
├── layouts/
├── assets/
├── styles/
├── utils/
└── App.jsx
```

---

# Minimum Technical Expectations

Your project must:

- Run without errors
- Avoid duplicated code
- Use meaningful component names
- Use proper React practices
- Keep components reasonably small
- Avoid excessive prop drilling
- Handle loading and error states properly


# Optional Bonus Features

You may implement additional features for bonus marks.

## Possible Ideas

- Dark/light mode
- Drag-and-drop task organization
- Charts and analytics
- Calendar integration
- Notifications
- User profile page
- Animations
- Theme customization
- Real backend integration
- Firebase integration
- Unit testing


# Submission Requirements

Students must submit GitHub repository link. The repository must contain

## 1. Source Code

Include:

- Entire React project
- package.json (please do not commit node_modules folder, use .gitignore file)
- All source files
- All assets if any (images, fonts, etc.)


## 2. README File

The README should include:

- Project title
- Description
- Features
- Technologies used
- Installation instructions
- Screenshots
- Known limitations



# Grading Breakdown

| Category | Weight |
|---|---|
| React architecture & component structure | 15% |
| Task management functionality | 15% |
| State management | 10% |
| Routing implementation | 10% |
| Forms & validation | 10% |
| API integration | 10% |
| Reusable components | 10% |
| Styling & responsiveness | 10% |
| Code quality & organization | 5% |
| Documentation(README) | 5% |

---

# Bonus Marks

| Feature | Bonus |
|---|---|
| useReducer implementation | +2% |
| Custom hooks | +2% |
| Advanced UI/UX | +2% |
| Firebase/backend integration | +3% |
| Unit testing | +3% |

**Maximum bonus: 10%**


# Academic Integrity

Students may:

- Use online documentation
- Use tutorials for learning
- Use component libraries

Students may NOT:

- Copy another student's project
- Submit copied code
- Use AI-generated code without understanding it
- Submit projects they cannot explain


# Final Notes

This project is intended to simulate a real-world React application.

Focus on:

- Clean architecture
- Reusable code
- Maintainability
- User experience
- Proper React practices

The objective is not only to make the application work, but also to demonstrate your understanding of modern React development principles.