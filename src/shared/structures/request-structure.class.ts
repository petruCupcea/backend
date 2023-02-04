export class RequestStructure<T = {[key: string]: any}> {

  app_version: number;
  device_manufacturer: string;
  device_model: string;
  device_os_name: string;
  device_os_version: string;
  device_os_uuid: string;
  is_browser: string;
  operation: string;
  payload: T;

}
