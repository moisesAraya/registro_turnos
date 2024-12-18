import { EntitySchema } from "typeorm";

const Shift = new EntitySchema({
  name: "Shift",
  tableName: "shifts",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    startDate: {
      type: "timestamp",
      nullable: false,
      default: () => "CURRENT_TIMESTAMP",
    },
    startTime: {
      type: "timestamp",
      nullable: false,
    },
    endDate: {
      type: "timestamp",
      nullable: true,
    },
    endTime: {
      type: "timestamp",
      nullable: true,
    },
  },
  relations: {
    startedBy: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "startedBy",
        referencedColumnName: "id",
      },
      nullable: false,
    },
    endedBy: {
      target: "User",
      type: "many-to-one",
      joinColumn: {
        name: "endedBy",
        referencedColumnName: "id",
      },
      nullable: true,
    },
  },
});

export default Shift;
