export interface AdapterOrderEntity {
  id: number;
  mesa?: number;
  cliente?: string;
  productos?: AdapterOrderProduct[];
  impuesto?: string;
  descuento?: string;
  propina?: string;
  subtotal?: string;
  total?: string;
  estado?: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
  creadoPor?: string;
  actualizadoPor?: string;
}

export interface AdapterOrderProduct {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  categoria: string;
  subcategoria: string;
}
