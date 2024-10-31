// src/entity/QRCode.js
import { EntitySchema } from 'typeorm';

const QRCode = new EntitySchema({
  name: "QRCode",
  tableName: "qrcodes",  // Nombre de la tabla en la base de datos
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    codeData: {
      type: "varchar",
    },
    scheduledAt: {
      type: "timestamp",
    },
    expiresAt: {
      type: "timestamp",
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});

export default QRCode;
