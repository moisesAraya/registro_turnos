import { EntitySchema } from "typeorm";

const Event = new EntitySchema({
  name: "Event",
  tableName: "events",
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
      nullable: true, 
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
        referencedColumnName: "id", 
      },
    },
  },
});

export default Event;
