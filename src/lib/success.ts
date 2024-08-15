class SuccessResponse<T = unknown> {
  status: true;
  code: number;
  additional?: T;
  message: string;
  constructor(message: string, code: number, additional?: T) {
    this.message = message;
    this.status = true;
    this.code = code;
    this.additional = additional;
  }
  serialize() {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      additional: this.additional as T,
    };
  }
}
export type SuccessResponseType<T = unknown> = {
  status: true;
  code: number;
  message: string;
  additional?: T;
};
export { SuccessResponse };
