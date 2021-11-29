type RequestException = {
  message: string;
};

class Exceptions {
  get bodyInvalid(): RequestException {
    return { message: "Request body is invalid" };
  }
}

export const exceptions = new Exceptions();
