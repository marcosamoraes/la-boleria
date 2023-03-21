const getCodeByErrorType = (type) => {
  let code;

  switch (type) {
    default:
      code = 400;
      break;
  }

  return code;
};

const validator = (schema) => (payload) => {
  const result = schema.validate(payload, { abortEarly: false });

  if (result.error) {
    const error = result.error.details[0];

    return {
      error: {
        code: getCodeByErrorType(error.type),
        message: error.message,
      },
    };
  }

  return payload;
};

export default validator;
