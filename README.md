# hngX-stage-2-task
Task for stage 2 simple CRUD operation

This README.md file will guide you through setting up, running, and using a simple CRUD (Create, Read, Update, Delete) API using Node.js. This API will serve as a basic example and can be extended for more complex applications.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Database Setup](#database-setup)
  - [Environment Variables](#environment-variables)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
  - [Create a New Item](#create-a-new-item)
  - [Read All Items](#read-all-items)
  - [Update an Item](#update-an-item)
  - [Delete an Item](#delete-an-item)
- [UML Design](#uml-design)
- [Testing](#testing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (https://nodejs.org/)
- NPM (Node Package Manager) installed (usually comes with Node.js)
- A text editor or an IDE of your choice (e.g., Visual Studio Code, Sublime Text, or Atom)
- A database system (e.g., MongoDB, MySQL, PostgreSQL) installed and running

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Trilvid/hngX-stage-2-task.git
cd hngX-stage-2-task
```

### Install Dependencies

Install the required dependencies using NPM:

```bash
npm install
```

### Database Setup

You need to configure your database connection in the `config.js` file. Depending on your choice of database, you'll need to install the corresponding Node.js package (e.g., `mongoose` for MongoDB, `mysql` for MySQL, `pg` for PostgreSQL) and configure it accordingly.

### Environment Variables

Create a `.env` file in the root directory to store sensitive information like database credentials and API secrets. Here's an example `.env` file:

```env
DB_URI=mongodb://localhost/your-database-name
PORT=8000
```

Replace the placeholders with your actual database connection URL, desired port, and a strong secret key for JWT (JSON Web Tokens) authentication.

## Running the API

Start the Node.js server:

```bash
npm start
```

Your API should now be running and accessible at `http://localhost:8000` (or the port you specified in your `.env` file).

## API Endpoints

### Create a New Item

**Endpoint:** `POST /api`

**Request Body:**
```json
{
  "name": "John Deo"
}
```

**Response:**
```json
{
  "id": "123",
  "name": "John Deo"
}
```

### Read All Items

**Endpoint:** `GET /api`

**Response:**
```json
[
  {
    "id": "1",
    "name": "John Deo",
    "description": "Description of Item 1"
  },
  {
    "id": "2",
    "name": "Jane Deo"
  }
]

```

### Update an Item

**Endpoint:** `PUT /api/:user_id`

**Request Body:**
```json
{
  "name": "New Name"
}
```

**Response:**
```json
{
  "id": "1",
  "name": "New Name"
}
```

### Delete an Item

**Endpoint:** `DELETE /api/:user_id`

**Response:**
```json
{
  null
}
```

## Testing

To run tests, use the following command:

```bash
npm test
```

You can test your endpoint with postman

## UML Design

You can view this design [Here](https://app.creately.com/d/wTEzBbC5m62/view)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

That's it! You now have a basic understanding of how to set up, run, and use a simple CRUD API with Node.js. Happy coding!
