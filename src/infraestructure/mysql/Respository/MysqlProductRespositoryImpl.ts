import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';

import { TYPES } from '../../../ioc/Types';
import { Payment } from '../Entity/Payment';
import { MysqlPaymentRespository } from './MysqlPaymentRespository';

@injectable()
export class MysqlPaymentRespositoryImpl implements MysqlPaymentRespository {
  constructor(
    @inject(TYPES.RepositoryPayment)
    private readonly paymentRepository: Repository<Payment>
  ) {}

  async findById(id: number): Promise<Payment | null> {
    return (await this.paymentRepository.findOne({ where: { id } })) ?? null;
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find();
  }

  async create(payment: Payment): Promise<Payment> {
    return await this.paymentRepository.save(payment);
  }
}
