import {Address} from "./address";

export class Client {
  id: number = 0;
  name: string = '';
  dateBirth: string = '';
  email: string = '';
  phone: string = '';
  address: Address = new Address();
}

