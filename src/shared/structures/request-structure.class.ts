export class RequestStructure<T = {[key: string]: any}> {

  operation: string;
  payload: T;

}
