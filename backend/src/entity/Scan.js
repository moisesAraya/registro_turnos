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
    scanStartTime: {
      type: "timestamp",
      nullable: false,
    },
    scanEndTime: {
      type: "timestamp",
      nullable: true,
    },
  },
});
