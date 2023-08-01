# Backend

## Features

- The backend consists of Car APIs a user can update any fields, add new cars,
- Delete cars based on Reg. No. or by any category
- The APIs are validated for the duplicate entries
- A user can look through all the cars data
- A user can filter through the data by either color, or category or directly by Reg. No.

## CAR API Endpoints

### Create

- `POST /api/cars/addCar`: Add a new car to the system.

### Read

- `GET /api/cars/getCarByCategory`: Get cars filtered by category.
- `GET /api/cars/getCarByColor`: Get cars filtered by color.
- `GET /api/cars/getAllCars`: Get all cars data.
- `GET /api/cars/getCarByReg`: Get a car by its registration number.

### Update

- `POST /api/cars/updateCar/:registrationNo`: Update a car's fields by its registration number.

### Delete

- `DELETE /api/cars/deleteCar/:registrationNo`: Delete a car by its registration number.
- `DELETE /api/cars/deleteCategory/:category`: Delete cars by category.

- For the users APIs login and signup endpoints are created



## USER API Endpoints

### User Authentication

Video Walkthrough: https://www.loom.com/share/be51dd3277a54be0bc828623924ed500?sid=53573b1a-a30d-4bc7-bfb7-f9a9d09f3e89


- `POST /api/users/signup`: Create a new user account.
- `POST /api/users/login`: Authenticate and login a user.

### User Verification

- `POST /api/users/verifySignature`: Verify the signature of a message to ensure the authenticity of the user.
- `GET /api/users/getMessage`: Get the message for signing to verify the user's signature.
- `POST /api/users/verifyToken`: Verify the user's token to ensure their session is valid.
