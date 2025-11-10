import { DomainPaymentEntity } from '../../../domain/Entities/DomainPaymentEntity';
import { Payment } from '../Entity/Payment';
import { IInfraestructureMapper } from './IIfraestructureMapper';

export class InfraestructureMapperImpl implements IInfraestructureMapper {
  toDomain(entity: Payment): DomainPaymentEntity {
    return {
      id: entity.id,
      order: {
        id: entity.order_id,
        mesa: 0,
        cliente: '',
        productos: [],
        impuesto: '',
        descuento: '',
        propina: '',
        subtotal: '',
        total: '',
        estado: '',
        fechaCreacion: '',
        fechaActualizacion: '',
        creadoPor: '',
        actualizadoPor: '',
      },
      paymentMethod: entity.method,
      amount: entity.amount,
      status: entity.status as any,
      userId: entity.user_id,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
      createdBy: entity.created_by,
      updatedBy: entity.updated_by,
    };
  }
  toEntity(domain: DomainPaymentEntity): Payment {
    return {
      id: domain.id,
      order_id: domain.order.id,
      method: domain.paymentMethod,
      amount: domain.amount,
      status: domain.status as any,
      user_id: domain.userId,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
      created_by: domain.createdBy,
      updated_by: domain.updatedBy,
    } as Payment;
  }
  toDomainList(entityList: Payment[]): DomainPaymentEntity[] {
    return entityList.map(this.toDomain);
  }
  toEntityList(domainList: DomainPaymentEntity[]): Payment[] {
    return domainList.map(this.toEntity);
  }
}
