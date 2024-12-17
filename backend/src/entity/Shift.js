import { EntitySchema } from "typeorm";

const Shift = new EntitySchema({
  name: "Shift",
  tableName: "shifts",
  columns: {
    id: { type: "int", primary: true, generated: true },
    startDate: { type: "date", nullable: false },
    startTime: { type: "time", nullable: false },
    endDate: { type: "date", nullable: true },
    endTime: { type: "time", nullable: true },
    startedBy: { type: "int", nullable: false }, 
    endedBy: { type: "int", nullable: true },  
  },
  relations: {
    attendance: {
      target: "Attendance",
      type: "one-to-many",
      inverseSide: "shift",
    },
  }
});

export default Shift;
