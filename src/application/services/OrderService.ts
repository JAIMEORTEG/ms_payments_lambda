import { DomainOrderEntity } from '../../domain/Entities/DomainOrderEntity';

export interface OrderService {
  getOrderById(orderId: number): Promise<DomainOrderEntity>;
}
