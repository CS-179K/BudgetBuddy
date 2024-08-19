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
- Password recovery.
- Profile management.
- Add incomes or expenses.
- Categorize incomes and expenses.
- Add recurring transactions.
- Set and track budgets.
- Alerts and notifications.
- Set and track savings goals.
- Generate visual financial reports as a bar graph.
- Export data in consistent format.
- List real-time balances from imported linked bank accounts.
- Track debts, schedule payments, and create debt reduction plans.
- Customizable dashboard with widgets.
- Responsive design for desktop, tablet, or mobile devices.
- Two-factor authentication, data encryption, and access control.
- Customer support and help center.

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
- Saving goals requires a form.

Data Security.
- As a user, I want to secure my financial data and ensure confidential information is safe.
- As a user, I want to use two-factor authentication so I can add an extra layer of security to my account.
- Points: 3.
- Requires API, extra layer of security.

Integration with Bank Accounts.
- As a user, I want to connect my bank accounts to import transactions to the system.
- As a user, I want to see my real-time bank account balances so I can have an up-to-date view of my finances.
- Points: 7.
- Requires API, potential security flaws.

Financial Reports.
- As a user, I want to generate monthly and yearly financial reports detailing financial performance.
- As a user, I want to see visualizations of different spending categories based on percentages.
- Points: 4.
- Some complex math and data aggregation.

Debt Management.
- As a user, I want to track debt so I know how much I owe.
- As a user, I want to create a plan to pay off debt.
- Points: 2.
- Debt management requires a form and database.

Recurring Transactions.
- As a user, I want to set up recurring payments so I do not need to manually enter them.
- As a user, I want to receive reminders for upcoming recurring payments.
- Points: 2.
- Recurring transactions requires a form and database.

## Non-Functional Requirements
Performance.
- Fast response times to user actions.
- Large scalability and throughput.

Reliability.
- Good uptime and good error messages.
- Backup and recover data.

Security.
- Data encryption, user authentication and authorization.

Usability.
- Intuitive UI, accessible, and detailed documentation.

Maintainability.
- Follow best code practices, modularity, and logging.

Compliance.
- System follows legal and ethical practices regarding user data and auditing.

Interoperability.
- System allows API integration and exports data in standard formats.

Localization.
- Support for other languages and currencies.

Efficiency.
- Reduce server resources and operational costs, minimize power consumption.

Portability.
- Accessible via web browsers, easy to export data.

## Architecture

Development Tools.
- We use gitHub to do the version control and collaboration.
- If possible we use CircleCI to build the CI/CD pipeline to integrate our project from dev, test, staging and prod environment. 
- Depending on self preference we use IDEA or VS-Code. Npm will be used to build and pack the project.

Frontend
- HTML provides the skeletal structure, while CSS offers the visual styles and layout.
- React: This JavaScript library will be employed for building user interfaces, specifically for handling dynamic user interactions and rendering complex UI elements. React's component-based architecture allows for reusable UI components, enhancing maintainability and scalability.

Backend
- Node.js: The backend will be powered by Node.js, an efficient and scalable platform for building server-side applications. Node.js will handle server-side logic, business operations, and database interactions. The asynchronous nature of Node.js will support high throughput and fast response times.
- Forms will be used to collect user data for debt management and recurring transactions. This data will be stored securely in our MongoDB database. MySQL is also considered but it depends on our practise.

![image](https://github.com/user-attachments/assets/83f2e669-8640-4892-8956-0c8cb15d84e0)

## Techniques
Tools.
- IDEA or VS-Code
- GitHub.
- Postman.
- npm

Frontend.
- HTML.
- CSS.
- React

Backend.
- Node.js.
- Express.js.

Database.
- MongoDB.
- MySQL(elective)



## Week 1 Burndown Chart

![Burndown Chart](https://github.com/user-attachments/assets/8f2bd26e-f784-4939-a3d5-3c8d8f672bc1)

## Week 2 Wireframe

![BudgetBuddy](https://github.com/user-attachments/assets/ecad76fb-b135-4e10-a2de-7cb614b35c30)

## Week 2 MongoDB Schema

![image](https://github.com/user-attachments/assets/ef7b556f-a1e6-4cec-b948-36743991fdda)

## Week 3 Burndown Chart Sprint 1

<img width="895" alt="Screenshot 2024-08-12 at 9 32 38 AM" src="https://github.com/user-attachments/assets/a1ee4cd8-e30f-4551-9e3b-91d7ad27d614">

## Week 3 Sprint 2 Wireframe

<img width="931" alt="Screenshot 2024-08-12 at 3 28 11 PM" src="https://github.com/user-attachments/assets/e63c1d37-2d7c-4034-97d2-1f66c92718a6">

## Week 3 Sprint 2 Schema and Architecture

![CS179K BudgetBuddy](https://github.com/user-attachments/assets/afae1ae9-7c96-470a-bb11-458f4a8e94a5)

## Week 4 Sprint 2 Schema and Architecture

<img width="903" alt="Screenshot 2024-08-19 at 9 56 39 AM" src="https://github.com/user-attachments/assets/59cca289-34ca-49e6-a74f-52d70720dc3a">



