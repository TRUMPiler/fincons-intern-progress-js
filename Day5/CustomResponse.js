/**
 * Represents a custom response object for API responses.
 */
class CustomResponse {
    #date;
    status;
    #data;

    /**
     * Creates a new CustomResponse instance.
     * @param {string} date - The date of the response.
     * @param {number} status - The HTTP status code.
     * @param {any} data - The response data.
     */
    constructor(date, status, data) {
        this.date = date;
        this.status = status;
        this.data = data;
    }

    /**
     * Converts the CustomResponse instance to a JSON object.
     * @returns {object} The JSON representation of the response.
     */
    toJson() {
        return {
            date: this.date,
            status: this.status,
            data: this.data
        };
    }
}

module.exports = CustomResponse;