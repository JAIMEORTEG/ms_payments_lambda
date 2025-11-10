import { DomainOrderEntity } from './DomainOrderEntity';

export interface DomainPaymentEntity {
  id?: number;
  order: DomainOrderEntity;
  paymentMethod: string;
  amount: number;
  status: Status;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: string;
  updatedBy: string;
}

export enum Status {
  PENDIENTE = 'PENDIENTE',
  PAGADO = 'PAGADO',
  CANCELADO = 'CANCELADO',
}
