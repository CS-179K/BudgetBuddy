# BudgetBuddy
A financial tracker that allows the user to track and interact with their finances. This app aims to simplify expense tracking, budgeting, and financial planning.

## Team Members
- Srija Bhashyam
- Art Guinto / aguin005
- Tristan Cai
- Junyan Hou

## Functional Features
- User registration.
- User login and logout.
- Add incomes or expenses.
- Categorize incomes and expenses.
- Add recurring transactions.
- Set and track budgets.
- Alerts and notifications.
- Set and track savings goals.
- Generate visual financial reports as a bar graph or pie chart.
- Import data in consistent format (CSV).

## User Stories
User Registration and Login
- As a new user, I want to create an account so I can start tracking my personal finances.
- As a registered user, I want to log in to my account and access my personal finance information.
- Points: 3.
- Set up user authentication and authorization.

Income Tracking.
- As a user, I want to add my sources of income to track earnings.
- As a user, I want to categorize my sources of income to understand where money is coming from.
- Points: 2.
- Income tracking requires a form and database.

Expense Tracking.
- As a user, I want to add expenses so I can track my spending.
- As a user, I want to categorize expenses so I know where money is going.
- Points: 2.
- Expense tracking requires a form and database.

Budgeting.
- As a user, I want to set a monthly budget for different categories of spending.
- As a user, I want to receive alerts when spending reaches thresholds of 50%, 25%, and 10% of my budget.
- Points: 4.
- Requires some complex math calculations.

Saving Goals.
- As a user, I want to create savings goals for long-term future expenses.
- As a user, I want to track how many savings I have towards a saving goal.
- Points: 2.
- Saving goals requires multiple schema already completed.

CSV File Imports for Bank Statements.
- As a user, I want to import my bank statements to track real transactions.
- As a user, I want to compare my income and transactions with my ideal spending goals.
- Points: 7.
- Requires comprehensive understanding of converting CSV files to JSON.

Financial Reports.
- As a user, I want to generate monthly and yearly financial reports detailing financial performance.
- As a user, I want to see visualizations of different spending categories based on percentages.
- Points: 4.
- Some complex math and data aggregation.

Recurring Transactions.
- As a user, I want to set up recurring payments so I do not need to manually enter them.
- As a user, I want to receive reminders for upcoming recurring payments.
- Points: 2.
- Recurring transactions requires a form and database.

## Non-Functional Requirements
Performance.
- Fast response times to user actions.

Reliability.
- Good uptime and good error messages.

Usability.
- Intuitive UI, accessible, and detailed documentation.

Maintainability.
- Follow best code practices, modularity, and logging.

Compliance.
- System follows legal and ethical practices regarding user data and auditing.

Interoperability.
- System allows API integration and imports data in CSV format.

Localization.
- Support for other languages and currencies.

Efficiency.
- Reduce server resources and operational costs, minimize power consumption.

Portability.
- Accessible via web browsers.

## Architecture

Development Tools.
- We are using Github for our version control system (VCS).
- We are using VSCode as our IDE and NPM as our package manager.

Frontend
- HTML provides the skeletal structure of our project, where CSS offers the visual styles and layout.
- React allows for handling dynamic user interactions, and rendering complex UI elements. Its' component-based architecture allows for reusable UI components, enhancing maintainability and scalability.

Backend
- Node.js is an efficient and scalable platform for building server-side applications. It handles server-side logic, business operations, and database interactions. The asynchronous nature of Node.js will support high throughput and fast response times.
- Forms and file systems are integrated and tested through User Input, MongoDB, and Express.js.

## Techniques
Tools.
- VSCode.
- GitHub.
- Postman.
- npm.

Frontend.
- HTML.
- CSS.
- React.

Backend.
- Node.js.
- Express.js.

Database.
- MongoDB.

## Final MongoDB Schema

![Budget Buddy Final Schema](https://github.com/user-attachments/assets/6d1ba226-f101-40e5-8b5c-e54ab1d4e1bb)

## Final Burndown 

![image](https://github.com/user-attachments/assets/58fda103-1f6a-45a4-b2b1-f3710eb8a311)



