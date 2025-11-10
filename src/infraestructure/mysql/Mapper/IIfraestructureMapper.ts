import { DomainPaymentEntity } from '../../../domain/Entities/DomainPaymentEntity';
import { Payment } from '../Entity/Payment';

export interface IInfraestructureMapper {
  toDomain(entity: Payment): DomainPaymentEntity;
  toEntity(domain: DomainPaymentEntity): Payment;
  toDomainList(entityList: Payment[]): DomainPaymentEntity[];
  toEntityList(domainList: DomainPaymentEntity[]): Payment[];
}
