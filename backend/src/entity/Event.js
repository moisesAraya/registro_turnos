import { EntitySchema } from "typeorm";

const Event = new EntitySchema({
  name: "Event", // Nombre de la entidad en TypeORM
  tableName: "events", // Nombre de la tabla en la base de datos
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    description: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    createdBy: {
      type: "int",
      nullable: false,
    },
    shift: {
      type: "varchar",
      length: 50,
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      createDate: true, 
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "createdBy",
        referencedColumnName: "id",
      },
    },
  },
});

export default Event;
