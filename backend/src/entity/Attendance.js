import { EntitySchema } from "typeorm";

const Attendance = new EntitySchema({
  name: "Attendance",
  tableName: "attendance",
  columns: {
    id: { type: "int", primary: true, generated: true }, // ID único
    latitude: { type: "decimal", precision: 10, scale: 7, nullable: false }, // Latitud con precisión decimal
    longitude: { type: "decimal", precision: 10, scale: 7, nullable: false }, // Longitud con precisión decimal
    userId: { type: "int", nullable: false }, // ID del usuario (puede ser email o rut)
    timestamp: { type: "timestamp", default: () => "CURRENT_TIMESTAMP" }, // Marca de tiempo
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "userId",
        referencedColumnName: "id",
      },
    },
  },
});

export default Attendance;
