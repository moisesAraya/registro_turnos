// entity/QRCode.js
import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'QRCode',
  tableName: 'qrcodes',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    codeData: {
      type: 'text',
    },
    codeContent: {
      type: 'text',
    },
    expiresAt: {
      type: 'timestamp',
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
  },
});
