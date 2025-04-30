const trycatcher = async <T>(
  promise: Promise<T>,
): Promise<{ error?: any; response?: T }> => {
  try {
    const response = await promise;
    return { error: undefined, response };
  } catch (error) {
    return { error, response: undefined };
  }
};

export default trycatcher;
