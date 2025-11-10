import { DomainPaymentEntity } from '../../domain/Entities/DomainPaymentEntity';

export interface PaymentService {
  getPaymentById(id: number): Promise<DomainPaymentEntity>;
  getPayments(): Promise<DomainPaymentEntity[]>;
  createPayment(payment: DomainPaymentEntity): Promise<DomainPaymentEntity>;
}
