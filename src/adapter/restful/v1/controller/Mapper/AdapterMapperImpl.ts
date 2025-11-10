import { DomainOrderEntity, DomainOrderProduct } from '../../../../../domain/Entities/DomainOrderEntity';
import { DomainPaymentEntity } from '../../../../../domain/Entities/DomainPaymentEntity';
import { AdapterOrderEntity, AdapterOrderProduct } from '../Entity/AdapterOrderEntity';
import { AdapterPaymentEntity } from '../Entity/AdapterPaymentEntity';
import { IAdapterMapper } from './IAdapterMapper';

export class AdapterMapperImpl implements IAdapterMapper {
  toDomain(adapterEntity: AdapterPaymentEntity): DomainPaymentEntity {
    return {
      id: adapterEntity.id,
      order: this.toDomainOrder(adapterEntity.orden),
      paymentMethod: adapterEntity.metodoPago,
      amount: adapterEntity.cantidad,
      status: adapterEntity.estado as any,
      userId: adapterEntity.usuarioId,
      createdAt: adapterEntity.fechaCreacion,
      updatedAt: adapterEntity.fechaActualizacion,
      createdBy: adapterEntity.creadoPor,
      updatedBy: adapterEntity.actualizadoPor,
    };
  }

  toAdapter(domainEntity: DomainPaymentEntity): AdapterPaymentEntity {
    return {
      id: domainEntity.id,
      orden: {
        id: domainEntity.order.id,
        mesa: domainEntity.order.mesa,
        cliente: domainEntity.order.cliente,
        productos: domainEntity.order.productos?.map((producto) => ({
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          categoria: producto.categoria,
          subcategoria: producto.subcategoria,
        })),
        impuesto: domainEntity.order.impuesto,
        descuento: domainEntity.order.descuento,
        propina: domainEntity.order.propina,
        subtotal: domainEntity.order.subtotal,
        total: domainEntity.order.total,
        estado: domainEntity.order.estado,
        fechaCreacion: domainEntity.order.fechaCreacion,
        fechaActualizacion: domainEntity.order.fechaActualizacion,
        creadoPor: domainEntity.order.creadoPor,
        actualizadoPor: domainEntity.order.actualizadoPor,
      },
      metodoPago: domainEntity.paymentMethod,
      cantidad: domainEntity.amount,
      estado: domainEntity.status as any,
      usuarioId: domainEntity.userId,
      fechaCreacion: domainEntity.createdAt,
      fechaActualizacion: domainEntity.updatedAt,
      creadoPor: domainEntity.createdBy,
      actualizadoPor: domainEntity.updatedBy,
    };
  }

  toDomainOrder(adapterOrder: AdapterOrderEntity): DomainOrderEntity {
    return {
      id: adapterOrder.id,
      mesa: adapterOrder.mesa,
      cliente: adapterOrder.cliente,
      productos: adapterOrder.productos?.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoria,
        subcategoria: producto.subcategoria,
      })),
    } as DomainOrderEntity;
  }

  toDomainProductList(adapterProducts: AdapterOrderProduct[]): DomainOrderProduct[] {
    return adapterProducts.map((producto) => ({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      subcategoria: producto.subcategoria,
    }));
  }

  toAdapterProductList(domainProducts: DomainOrderProduct[]): AdapterOrderProduct[] {
    return domainProducts.map((producto: DomainOrderProduct) => ({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      categoria: producto.categoria,
      subcategoria: producto.subcategoria,
    }));
  }

  toDomainList(adapterList: AdapterPaymentEntity[]): DomainPaymentEntity[] {
    return adapterList.map(this.toDomain);
  }

  toAdapterList(domainList: DomainPaymentEntity[]): AdapterPaymentEntity[] {
    return domainList.map(this.toAdapter);
  }
}
