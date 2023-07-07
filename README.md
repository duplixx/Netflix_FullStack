# Project Name

Netflix Fullstack

## Description

This is a fullstack web application that utilizes the TMDB (The Movie Database) API to display movie information. It is built using the Express.js framework for the backend, Firebase for authentication and database management, and React for the frontend.

## Features

- User authentication using Firebase
- Movie search functionality
- Displaying movie details including title, overview, release date, and poster image
- Saving favorite movies to user's profile
- User profile management

## Technologies Used

- TMDB API: The Movie Database API provides access to a wide range of movie information including titles, descriptions, release dates, and images.
- Express.js: A fast and minimalist web application framework for Node.js, used to build the backend server and handle API requests.
- Firebase: A comprehensive platform for building web and mobile applications, used for user authentication and database management.
- React: A JavaScript library for building user interfaces, used for the frontend development of the web application.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/repository-name.git
   ```

2. Install the required dependencies for both the backend and frontend:

   ```bash
   cd netflix_ui
   npm install

   cd ../netflix_api
   npm install
   ```

3. Create a Firebase project and obtain the necessary API keys.

4. Configure the Firebase credentials in the backend by creating a `.env` file in the `backend` directory and adding the following information:

   ```
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-auth-domain
   FIREBASE_DATABASE_URL=your-database-url
   ```

5. Start the backend server:

   ```bash
   cd netflix_api
   npm start
   ```

6. Start the frontend development server:

   ```bash
   cd netflix_ui
   npm start
   ```

7. Open your browser and navigate to `http://localhost:3000` to access the web application.

## Usage

1. Create an account or sign in using your Firebase credentials.

2. Use the search bar to search for movies by title.

3. Click on a movie to view more details.

4. Click the "Add to Favorites" button to save a movie to your profile.

5. Manage your profile and favorite movies using the provided interface.

## Contribution

Contributions to this project are welcome. Here are a few ways you can help:

- Report bugs and issues
- Suggest new features
- Improve the documentation
- Submit pull requests

When contributing to this repository, please first discuss the change you wish to make via issues or email before making a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- TMDB API: https://www.themoviedb.org/documentation/api
- Express.js: https://expressjs.com/
- Firebase: https://firebase.google.com/
- React: https://reactjs.org/

## Contact

For any questions or inquiries, please contact [email protected]
