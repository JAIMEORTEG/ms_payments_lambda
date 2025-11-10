import { DomainPaymentEntity } from '../../../../../domain/Entities/DomainPaymentEntity';
import { AdapterPaymentEntity } from '../Entity/AdapterPaymentEntity';

export interface IAdapterMapper {
  toDomain(adapterEntity: AdapterPaymentEntity): DomainPaymentEntity;
  toAdapter(domainEntity: DomainPaymentEntity): AdapterPaymentEntity;
  toDomainList(adapterList: AdapterPaymentEntity[]): DomainPaymentEntity[];
  toAdapterList(domainList: DomainPaymentEntity[]): AdapterPaymentEntity[];
}
