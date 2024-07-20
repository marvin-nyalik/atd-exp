# Express.js Learning Project

This project is a part of my journey to learn Express.js, following a general tutorial. It covers basic setup, authentication, testing, sessions, MongoDB integration, and unit testing.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [Sessions](#sessions)
- [Database](#database)
- [Testing](#testing)
- [Unit Testing](#unit-testing)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project demonstrates the core concepts and features of an Express.js application, including:

- Setting up a basic Express server
- Implementing authentication using sessions
- Connecting to a MongoDB database
- Writing unit/integration tests to ensure code quality and reliability

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (for authentication)
- Jest (for testing)
- Supertest (for HTTP assertions in tests)
- dotenv (for environment variables)

## Installation

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:marvin-nyalik/atd-exp.git
   cd atd-exp.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/express_learning
     SESSION_SECRET=your_secret_key
     ```

## Usage

To run the application in development mode, use the following command:

```bash
npm run dev
```

The server will start on the port specified in the `.env` file (default: 3000). You can access it at `http://localhost:3000`.

## Authentication

This project uses Passport.js for authentication. Users can sign up, log in, and log out. Sessions are managed using `express-session`.

## Sessions

Sessions are used to maintain user authentication state. The session data is stored in memory by default. For production use, consider using a more robust session store like `connect-mongo` to store sessions in MongoDB.

## Database

MongoDB is used as the database for this project. Mongoose is used to interact with MongoDB. Ensure you have MongoDB installed and running on your machine, or use a cloud-based MongoDB service.

## Testing

Testing is an important part of this project. Jest and Supertest are used to write and run tests.

To run the tests, use the following command:

```bash
npm test
```

## Unit Testing

Unit tests are written for various parts of the application to ensure each unit of code works as expected. Tests include:

- Model tests
- Route tests
- Controller tests

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
