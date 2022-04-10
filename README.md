# movie-crud
## Setup
```
1. git clone https://github.com/ranjithmahadev/movie-crud.git
2. cd movie-crud
3. npm install - install all the packages
4. Create .env file in the project directory and set the values for the below keys
        a. DB_USER
        b. DB_HOST
        c. DB_NAME
        d. DB_PASSWORD
        e. DB_PORT
        f. PORT
5. Ensure postgres is installed and configured in your system
6. npm run dev - to run the application
7. npm run test - to test the application
8. npm run lint - to fix the linting errors

## API's exposed
1. POST: /api/movies    - To insert a movie. Sample request body: 
        {
            "title": "Wrong Turn",
            "year": "1997",
            "actors": "John Doe",
            "description": "Horror movie"
        }
2. GET: /api/movies     - To get all the movies
3. GET: /api/movies/1   - To get movie by Id
4. PUT: /api/movies/2   - To update a movie by Id. Sample request body:
        {
            "title": "Wrong Turn",
            "year": "2000",
            "actors": "John Doe",
            "description": "Horror movie"
        }
5. DELETE: /api/movies/1 - To delete a movie by Id
