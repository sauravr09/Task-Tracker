class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);  // Call the parent class (Error's) constructor with the error message
        this.statusCode = statusCode;  // Store the HTTP status code
    }
    }

export default CustomError;