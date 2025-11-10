import { DomainOrderEntity, DomainOrderProduct } from '../../Entities/DomainOrderEntity';
import { ExternalOrderEntity, ExternalOrderProduct } from '../entities/ExternalOrderEntity';

export interface IExternalOrderMapper {
  toDomain(externalEntity: ExternalOrderEntity): DomainOrderEntity;
  toDomainProductList(externalProducts: ExternalOrderProduct[]): DomainOrderProduct[];
}

export class ExternalOrderMapperImpl implements IExternalOrderMapper {
  toDomain(externalEntity: ExternalOrderEntity): DomainOrderEntity {
    return {
      id: externalEntity.id,
      mesa: externalEntity.mesa,
      cliente: externalEntity.cliente,
      productos: this.toDomainProductList(externalEntity.productos),
      impuesto: externalEntity.impuesto,
      descuento: externalEntity.descuento,
      propina: externalEntity.propina,
      subtotal: externalEntity.subtotal,
      total: externalEntity.total,
      estado: externalEntity.estado,
      fechaCreacion: externalEntity.fechaCreacion,
      fechaActualizacion: externalEntity.fechaActualizacion,
      creadoPor: externalEntity.creadoPor,
      actualizadoPor: externalEntity.actualizadoPor,
    };
  }

  toDomainProductList(externalProducts: ExternalOrderProduct[]): DomainOrderProduct[] {
    return externalProducts.map((product) => ({
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      categoria: product.categoria,
      subcategoria: product.subcategoria,
    }));
  }
}
