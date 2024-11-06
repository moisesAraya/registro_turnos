// src/entity/QRCode.js

import { EntitySchema } from 'typeorm';

export const QRCode = new EntitySchema({
  name: 'QRCode',
  tableName: 'qrcodes',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    codeData: {
      type: 'text',
    },
    data: {
      type: 'text',
      nullable: true, // Permitir valores nulos si es necesario
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
});
