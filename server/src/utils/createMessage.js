export const createError = (res, status, message) => {
  if (!res || typeof res.status !== "function") {
    console.error("Invalid response object passed to createError");
    return { error: "Internal Server Error" };
  }

  const err = new Error(message || "Something went wrong");
  err.status = status || 500;

  return res.status(err.status).json({
    success: false,
    status: err.status,
    message: err.message,
  });
};

export const createMessage = (res, status, message) => {
  if (!res || typeof res.status !== "function") {
    console.error("Invalid response object passed to createMessage");
    return { message: "Operation completed" };
  }

  const statusCode = status || 200;
  const responseMessage = message || "Successfully";

  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message: responseMessage,
  });
};
