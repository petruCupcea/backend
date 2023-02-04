import { StatusResponse } from '../types';


export class ResponseStructure {

  status: StatusResponse;
  payload: {[key: string]: any};


  constructor(status: StatusResponse, payload?: {[key: string]: any}) {
    this.status = status;
    this.payload = (payload || {});
  }

}
