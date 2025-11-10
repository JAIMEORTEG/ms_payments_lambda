import { AdapterPaymentEntity } from './Entity/AdapterPaymentEntity';

export interface PaymentController {
  handleRequest(event: any): Promise<any>;
  getPayments(): Promise<AdapterPaymentEntity[]>;
  getPaymentById(id: number): Promise<AdapterPaymentEntity>;
  createPayment(payment: AdapterPaymentEntity): Promise<AdapterPaymentEntity>;
}
