How to Run Laravel and React.js with Docker
This guide explains how to run a Laravel backend and React.js frontend Dockerized application on your local machine.

Prerequisites
Before you begin, ensure you have the following installed:

Docker (including Docker Compose)
Docker installation guide
Git (to clone the repository)
Git installation guide
Node.js (for React.js dependencies, if you plan to manually build the frontend)
Node.js installation guide


Step 1: Clone the Repository
Clone the GitHub repository for both the Laravel backend and React.js frontend.
git clone https://github.com/zeeyan23/news_aggregator_frontend
git clone https://github.com/zeeyan23/news_aggregator_backend


Step 2: Navigate to the Project Directory
After cloning the repositories, navigate to the backend and frontend directories.
cd test-backend
cd test-frontend

Step 3: Set Up Docker Containers

3.1. Laravel Backend

Inside the test-backend directory, ensure you have the Dockerfile and docker-compose.yml file.

Build the Docker containers for the backend by running the following command

docker-compose up --build

3.2. React.js Frontend

Inside the test-frontend directory, ensure you have the Dockerfile and docker-compose.yml file.

Build the Docker containers for the frontend:
docker-compose up --build


Step 4: Configuration
Ensure that your .env file in the Laravel backend directory contains the correct database credentials and other environment settings.
If using a MySQL container, make sure it matches the settings in the Laravel .env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=test-backend
DB_USERNAME=root
DB_PASSWORD=

Step 5: Running the Application
Start both backend and frontend containers by running
docker-compose up

The backend should now be running on http://localhost:8080.

The frontend should be running on http://localhost:3000.

Step 6: Accessing the Application
Open your browser and navigate to http://localhost:3000 for the React.js frontend.

Step 7: Running Migrations
For the backend, ensure your database is properly set up and the migrations are run:
docker exec -it laravel-app php artisan migrate

Step 8: Additional Commands
If you need to stop the application, you can run:
docker-compose down



