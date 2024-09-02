# BudgetBuddy
A financial tracker that allows the user to track and interact with their finances. This app aims to simplify expense tracking, budgeting, and financial planning.

## Team Members
- Srija Bhashyam
- Art Guinto / aguin005
- Tristan Cai
- Junyan Hou

## Build
- Install VSCode IDE or an IDE of your choice.
- Install Node.js.
- Create a folder, open the folder, and open a terminal on your IDE.
- Clone the repository.

## Installation
- After cloning the repository, open a new terminal.
- Run the command `cd backend` and then run `npm i`.
- Open a new separate terminal.
- Run the command `cd frontend` and then run `npm i`.
- Ensure you have a .env file in the backend.
- The .env file needs values of PORT=4000, MONGO_URI=your_uri, SECRET=your_secret_key.
- Create a MongoDB cluster and get a connection string for your URI.
- Run the command below to create a secret key.
- `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- You have successfully installed the dependencies and the app is ready to start.

## Usage
- After installing the dependencies, remain on the frontend and backend.
- Run the command `node server.js` while in the directory backend.
- You should be on PORT 4000 and connected to MongoDB successfully.
- Run the command `npm start` in the directory frontend.
- The webpage should successfully have all correct dependencies and you should be running on http://localhost:3000/
- From here, sign up and create an account. By signing up, you have access to all protected routes.
- You can now use the Budget Buddy web application.

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

Investment Tracking.
- As a user, I want to add investments so I can track my spending.
- As a user, I want to categorize investments so I know where money is going.
- Points: 2.
- Expense tracking requires a form and database.

Budgeting.
- As a user, I want to set a monthly budget for different categories of spending.
- As a user, I want to receive an alert when investments reaches a threshold of 75% of my budgets.
- Points: 4.
- Requires some complex math calculations.

Saving Goals.
- As a user, I want to create savings goals through investments for monthly expenses.
- As a user, I want to track how many savings I have left.
- Points: 2.
- Saving goals requires multiple schema already completed.

CSV File Imports for Bank Statements.
- As a user, I want to import my bank statements to track real transactions.
- As a user, I want to compare my income and transactions with my ideal spending goals.
- Points: 7.
- Requires comprehensive understanding of converting CSV files to JSON.

Financial Reports.
- As a user, I want to generate monthly financial reports detailing financial performance.
- As a user, I want to see visualizations of different spending categories based on percentages.
- Points: 4.
- Some complex math and data aggregation.

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

![CS179K BudgetBuddy](https://github.com/user-attachments/assets/fd4ab984-e38d-4185-ae46-db7be4d3905a)

## Final Burndown 

![image](https://github.com/user-attachments/assets/58fda103-1f6a-45a4-b2b1-f3710eb8a311)

## Final Presentation 

- As a new user, I want to create an account so I can start tracking my personal finances.
- https://www.youtube.com/watch?v=RP3_qrwcTfg&feature=youtu.be
- As a registered user, I want to log in to my account and access my personal finance information.
- https://youtu.be/xeT007KVBP0
- As a user, I want to add my sources of income to track earnings.
- https://youtu.be/hj9XdBTKmjg
- As a user, I want to categorize my sources of income to understand where money is coming from.
- https://youtu.be/ULhk23PTdzI
- As a user, I want to create savings goals through investments for monthly expenses.
- As a user, I want to track how many savings I have left.
- https://youtu.be/PFMAo7D2Of4
- As a user, I want to generate monthly financial reports detailing financial performance.
- As a user, I want to see visualizations of different spending categories based on percentages.
- https://youtu.be/yCBP0NrJadk
- As a user, I want to add investments so I can track my spending.
- As a user, I want to categorize investments so I know where money is going.
- https://www.youtube.com/watch?v=IR8DOv9Vb1s
- As a user, I want to set a monthly budget for different categories of spending.
- As a user, I want to receive an alert when investments reaches a threshold of 75% of my budgets.
- https://www.youtube.com/watch?v=3Ls6V3O3AVs
- As a user, I want to import my bank statements to track real transactions.
- https://youtu.be/iRzTGF1zqC4
- As a user, I want to compare my income and transactions with my ideal spending goals.
- https://youtu.be/9k9QAfhzQFI


## Design Report

[Final Design Report Budget Buddy.pdf](https://github.com/user-attachments/files/16831837/Final.Design.Report.Budget.Buddy.pdf)
