import axios, { AxiosInstance } from 'axios';
import { inject, injectable } from 'inversify';

import { OrderService } from '../application/services/OrderService';
import { TYPES } from '../ioc/Types';
import { DomainOrderEntity } from './Entities/DomainOrderEntity';
import { ExternalOrderEntity } from './external/entities/ExternalOrderEntity';
import { IExternalOrderMapper } from './external/mapper/ExternalOrderMapper';

@injectable()
export class OrderServiceImpl implements OrderService {
  private readonly httpClient: AxiosInstance;
  private readonly ordersApiUrl: string;

  constructor(
    @inject(TYPES.IExternalOrderMapper)
    private readonly mapper: IExternalOrderMapper
  ) {
    this.ordersApiUrl = process.env.ORDERS_API_URL;
    this.httpClient = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.JWT_SECRET_KEY}`,
      },
    });
  }

  async getOrderById(orderId: number): Promise<DomainOrderEntity> {
    try {
      const url = `${this.ordersApiUrl}/${orderId}`;
      const response = await this.httpClient.get<ExternalOrderEntity>(url);

      if (!response.data) {
        throw new Error(`Order with id ${orderId} not found`);
      }
      console.log('service order by id', this.mapper.toDomain(response.data));
      return this.mapper.toDomain(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Order with id ${orderId} not found`);
        }
        throw new Error(`Error fetching order: ${error.message}`);
      }
      throw new Error(`Unexpected error fetching order: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
