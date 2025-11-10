import { inject, injectable } from 'inversify';

import { PaymentService } from '../../../../application/services/PaymentService';
import { TYPES } from '../../../../ioc/Types';
import { AdapterPaymentEntity } from './Entity/AdapterPaymentEntity';
import { IAdapterMapper } from './Mapper/IAdapterMapper';
import { PaymentController } from './PaymentController';

@injectable()
export class PaymentControllerImpl implements PaymentController {
  constructor(
    @inject(TYPES.PaymentService)
    private readonly paymentService: PaymentService,
    @inject(TYPES.IAdapterMapper) private readonly mapper: IAdapterMapper
  ) {}

  async handleRequest(event: any): Promise<any> {
    try {
      switch (event?.requestContext?.http?.method) {
        case 'GET': {
          if (event?.pathParameters?.id) {
            const payment = await this.getPaymentById(Number.parseInt(event?.pathParameters?.id));
            return payment;
          } else {
            const payments = await this.getPayments();
            return payments;
          }
        }

        case 'POST': {
          const createdPayment = await this.createPayment(JSON.parse(event?.body));
          return createdPayment;
        }

        default:
          return {
            message: `Unsupported HTTP method: ${event?.requestContext?.http?.method}`,
          };
      }
    } catch (error) {
      return {
        message: `Error processing request: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  async getPayments(): Promise<AdapterPaymentEntity[]> {
    const payments = await this.paymentService.getPayments();
    return this.mapper.toAdapterList(payments);
  }

  async getPaymentById(id: number): Promise<AdapterPaymentEntity> {
    const payment = await this.paymentService.getPaymentById(id);
    return this.mapper.toAdapter(payment);
  }

  async createPayment(payment: AdapterPaymentEntity): Promise<AdapterPaymentEntity> {
    const paymentEntity = this.mapper.toDomain(payment);
    const createdPayment = await this.paymentService.createPayment(paymentEntity);
    return this.mapper.toAdapter(createdPayment);
  }
}
