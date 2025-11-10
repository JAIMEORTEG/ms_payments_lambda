import { AdapterOrderEntity } from './AdapterOrderEntity';

export interface AdapterPaymentEntity {
  id?: number;
  orden: AdapterOrderEntity;
  metodoPago: string;
  cantidad: number;
  estado: Status;
  usuarioId: number;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  creadoPor: string;
  actualizadoPor: string;
}

export enum Status {
  PENDIENTE = 'PENDIENTE',
  PAGO = 'PAGO',
  CANCELADO = 'CANCELADO',
}
