import { inject, injectable } from 'inversify';

import { OrderService } from '../application/services/OrderService';
import { PaymentService } from '../application/services/PaymentService';
import { InfraestructureMapperImpl } from '../infraestructure/mysql/Mapper/InfraestructureMapperImpl';
import { MysqlPaymentRespository } from '../infraestructure/mysql/Respository/MysqlPaymentRespository';
import { TYPES } from '../ioc/Types';
import { DomainPaymentEntity } from './Entities/DomainPaymentEntity';

@injectable()
export class PaymentServiceImpl implements PaymentService {
  constructor(
    @inject(TYPES.OrderService)
    private readonly orderService: OrderService,
    @inject(TYPES.MysqlPaymentRespository)
    private readonly repository: MysqlPaymentRespository,
    @inject(TYPES.IInfraestructureMapper)
    private readonly mapper: InfraestructureMapperImpl
  ) {}

  async getPayments(): Promise<DomainPaymentEntity[]> {
    const payments = await this.repository.findAll();

    const domainPayments = this.mapper.toDomainList(payments);
    await Promise.all(
      domainPayments.map(async (payment) => {
        const order = await this.orderService.getOrderById(payment.order.id);
        payment.order = order;
      })
    );
    return domainPayments;
  }

  async getPaymentById(id: number): Promise<DomainPaymentEntity> {
    const payment = await this.repository.findById(id);
    if (!payment) {
      throw new Error('Payment not found');
    }
    const order = await this.orderService.getOrderById(payment.order_id);
    const domainPayment = this.mapper.toDomain(payment);
    domainPayment.order = order;
    console.log('service payment by id', domainPayment);
    return domainPayment;
  }

  async createPayment(payment: DomainPaymentEntity): Promise<DomainPaymentEntity> {
    const entity = this.mapper.toEntity(payment);
    console.log('service payment create', entity);
    const createdPayment = await this.repository.create(entity);
    const domainPayment = this.mapper.toDomain(createdPayment);
    const order = await this.orderService.getOrderById(domainPayment.order.id);
    domainPayment.order = order;
    console.log('service payment created', domainPayment);
    return domainPayment;
  }
}
