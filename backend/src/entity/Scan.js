// src/entity/Scan.js
import { EntitySchema } from "typeorm";

export const Scan = new EntitySchema({
  name: "Scan",
  tableName: "scans",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    qrContent: {
      type: "text",
    },
    name: {
      type: "text",
    },
    email: {
      type: "text",
    },
    scanTime: {
      type: "timestamp",
    },
  },
});
