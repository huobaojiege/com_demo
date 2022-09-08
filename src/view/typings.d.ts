declare namespace API {
  type ResponseOptions = {
    code?: string;
    msg?: string;
    data?: any;
    success?: string;
    [propName: string]: any;
  };
}
