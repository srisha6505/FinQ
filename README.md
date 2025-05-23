# FinQ


FinQ is a financial dashboard application that provides users with real-time market news, portfolio management tools, and authentication via Google and GitHub. The project is structured as a full-stack application using a React + TypeScript frontend (with Vite) and a Node.js/Express backend. 

## Features

- **Authentication:** OAuth integration with Google and GitHub, JWT-based session management, and secure cookie handling.
- **Dashboard:** Displays real-time financial news, cryptocurrency data, and mock market data (for demonstration).
- **Portfolio Management:** Tools to manage user investments and track performance.
- **Modern Frontend:** Built with React, TypeScript, Vite, and Redux for state management.
- **Backend API:** Express.js server with RESTful endpoints for authentication, user management, and data aggregation.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Redux Toolkit, Radix UI, ESlint
- **Backend:** Node.js, Express.js, Passport.js (with Google & GitHub OAuth), JWT
- **Database:** (Configure your preferred database, e.g., PostgreSQL, MongoDB, etc.)
- **Other:** Axios, dotenv, various financial APIs (mocked in current version)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- (Optional) PostgreSQL or your preferred DB

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/srisha6505/FinQ.git
   cd FinQ
   ```

2. **Install dependencies:**
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Setup environment variables:**
   - Copy `.env.example` to `.env` in both `client` and `server` directories and fill in required values (Google/GitHub OAuth credentials, JWT secrets, DB connection, etc.).

4. **Run the development servers:**
   - Start the backend server:
     ```sh
     cd server
     npm run dev
     ```
   - Start the frontend:
     ```sh
     cd ../client
     npm run dev
     ```

5. **Access the app:**
   - The frontend will run on `http://localhost:5173`
   - The backend API will run on `http://localhost:5050`

## Folder Structure

```
FinQ/
├── client/    # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── ...
│   └── ...
├── server/    # Express backend
│   ├── src/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── helpers/
│   │   └── ...
│   └── ...
└── README.md
```

## Authentication

- Google and GitHub login are implemented using Passport.js strategies.
- JWT is used for access token management; refresh tokens are stored as HTTP-only cookies.

## News and Data

- The dashboard displays mocked financial news and cryptocurrency data.
- Replace mock data functions with actual API calls as needed.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

## License

This project does not currently specify a license.

## Contact

For questions or support, contact [srisha6505](https://github.com/srisha6505).
