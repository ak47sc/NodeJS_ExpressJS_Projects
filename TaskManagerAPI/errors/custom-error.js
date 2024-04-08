class customAPIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const createCustomError = (message, status) => {
  return new customAPIError(message, status);
};

module.exports = { createCustomError, customAPIError };
