class Response {

  error(message, code, errors) {
    return {
      message: message || "",
      code: code || 1000,
      data: [],
      errors: errors || [],
    }
  }

  ok(message, data) {
    return {
      message: message || "",
      code: 200,
      data: data || [],
      errors: [],
    }
  }

}

module.exports = Response