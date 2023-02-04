export class EntityErrorHandler {

  private readonly errors: {[key: string]: string};


  constructor() {
    this.errors = {};
  }


  registerError(name: string, message: string) {
    this.errors[name] = message;
  }


  hasErrors(): boolean {
    return (Object.keys(this.errors).length > 0);
  }


  getAllErrors(): {[key: string]: string} {
    return {...this.errors};
  }
}
