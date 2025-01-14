# User API

This project is a user management API built with TypeScript, Express, MySQL, and Knex. It provides endpoints for user registration, login, and profile management, utilizing JWT for authentication.

## Features

- User registration
- User login
- User profile management
- JWT authentication
- MySQL database integration

## Technologies Used

- TypeScript
- Express
- MySQL
- Knex
- JSON Web Tokens (JWT)

## Project Structure

```
user-api
├── src
│   ├── controllers          # Contains controllers for handling requests
│   │   ├── authController.ts
│   │   └── userController.ts
│   ├── middlewares          # Contains middleware functions
│   │   └── authMiddleware.ts
│   ├── models               # Contains database models
│   │   └── User.ts
│   ├── routes               # Contains route definitions
│   │   ├── authRoutes.ts
│   │   └── userRoutes.ts
│   ├── services             # Contains business logic
│   │   ├── authService.ts
│   │   └── userService.ts
│   ├── utils                # Contains utility functions and database connection
│   │   ├── db.ts
│   │   └── helpers.ts
│   ├── app.ts               # Entry point of the application
│   └── types                # Contains TypeScript types and interfaces
│       └── index.ts
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd user-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database connection in `src/utils/db.ts`.

4. Set up environment variables for JWT secret and database credentials.

5. Run the application:
   ```
   npm start
   ```

## API Usage

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.

### User Management

- **GET /api/user/profile**: Retrieve the logged-in user's profile.
- **PUT /api/user/profile**: Update the logged-in user's profile.

## License

This project is licensed under the MIT License.