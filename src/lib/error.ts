import { ERROR_CODE, ERROR_NAME } from "@/config/error.config";
import { ZodError } from "zod";
import { generateErrorMessage } from "zod-error";
export type ErrorResponseType = {
  name: string;
  message: string;
  code: number;
  status: false;
};
class ErrorHandler extends Error {
  status: false;
  error?: any;
  code: number;
  constructor(message: string, code: keyof typeof ERROR_CODE, error?: any) {
    super(message);
    this.status = false;
    this.error = error;
    this.code = ERROR_CODE[code];
    this.name = ERROR_NAME[code];
  }
}

function standardizeApiError(error: unknown): ErrorResponseType {
  if (error instanceof ErrorHandler) {
    return {
      name: error.name,
      message: error.message,
      code: error.code,
      status: false,
    };
  }
  if (error instanceof ZodError) {
    return {
      name: error.name,
      message: generateErrorMessage(error.issues, {
        maxErrors: 2,
        delimiter: {
          component: ": ",
        },
        message: {
          enabled: true,
          label: "",
        },
        path: {
          enabled: false,
        },
        code: {
          enabled: false,
        },
      }),
      code: ERROR_CODE.UNPROCESSABLE_ENTITY,
      status: false,
    };
  }
  return {
    name: ERROR_NAME.INTERNAL_SERVER_ERROR,
    message:
      "We're sorry for the inconvenience. Please report this issue to our support team ",
    code: ERROR_CODE.INTERNAL_SERVER_ERROR,
    status: false,
  };
}
export { ErrorHandler, standardizeApiError };
