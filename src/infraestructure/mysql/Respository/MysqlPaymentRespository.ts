import { Payment } from '../Entity/Payment';

export interface MysqlPaymentRespository {
  findById(id: number): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
  create(payment: Payment): Promise<Payment>;
}
