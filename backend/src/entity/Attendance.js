import { EntitySchema } from "typeorm";

const Attendance = new EntitySchema({
  name: "Attendance",
  tableName: "attendance",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    timestamp: {
      type: "timestamp",
      createDate: true,
    },
    latitude: {
      type: "double precision",
      nullable: true, // Permitir valores NULL temporalmente
    },
    longitude: {
      type: "double precision",
      nullable: true, // Permitir valores NULL temporalmente
    },
    userId: {
      type: "int",
      nullable: true, // Permitir valores NULL temporalmente
    },
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
