import { Container } from 'inversify';
import { Repository } from 'typeorm';

import { AdapterMapperImpl } from '../adapter/restful/v1/controller/Mapper/AdapterMapperImpl';
import { IAdapterMapper } from '../adapter/restful/v1/controller/Mapper/IAdapterMapper';
import { PaymentController } from '../adapter/restful/v1/controller/PaymentController';
import { PaymentControllerImpl } from '../adapter/restful/v1/controller/PaymentControllerImpl';
import { OrderService } from '../application/services/OrderService';
import { PaymentService } from '../application/services/PaymentService';
import { ExternalOrderMapperImpl, IExternalOrderMapper } from '../domain/external/mapper/ExternalOrderMapper';
import { OrderServiceImpl } from '../domain/OrderServiceImpl';
import { PaymentServiceImpl } from '../domain/PaymentServiceImpl';
import { AppDataSource } from '../infraestructure/mysql/data-source';
import { Payment } from '../infraestructure/mysql/Entity/Payment';
import { IInfraestructureMapper } from '../infraestructure/mysql/Mapper/IIfraestructureMapper';
import { InfraestructureMapperImpl } from '../infraestructure/mysql/Mapper/InfraestructureMapperImpl';
import { MysqlPaymentRespository } from '../infraestructure/mysql/Respository/MysqlPaymentRespository';
import { MysqlPaymentRespositoryImpl } from '../infraestructure/mysql/Respository/MysqlProductRespositoryImpl';
import { TYPES } from './Types';

const container = new Container();

// Función factory para el Repository
const createPaymentRepository = (): Repository<Payment> => {
  return AppDataSource.getRepository(Payment);
};

// Configurar DataSource
container.bind(TYPES.DataSource).toConstantValue(AppDataSource);

// Configurar Repository<Product>
container.bind<Repository<Payment>>(TYPES.RepositoryPayment).toDynamicValue(createPaymentRepository);

container.bind<PaymentService>(TYPES.PaymentService).to(PaymentServiceImpl);
container.bind<OrderService>(TYPES.OrderService).to(OrderServiceImpl);
container.bind<IExternalOrderMapper>(TYPES.IExternalOrderMapper).to(ExternalOrderMapperImpl);
container.bind<MysqlPaymentRespository>(TYPES.MysqlPaymentRespository).to(MysqlPaymentRespositoryImpl);
container.bind<IInfraestructureMapper>(TYPES.IInfraestructureMapper).to(InfraestructureMapperImpl);
container.bind<IAdapterMapper>(TYPES.IAdapterMapper).to(AdapterMapperImpl);
container.bind<PaymentController>(TYPES.PaymentController).to(PaymentControllerImpl);

export { container };
