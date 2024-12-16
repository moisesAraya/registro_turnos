import { EntitySchema } from "typeorm";

export const Area = new EntitySchema({
    name: "Area",
    tableName: "areas",
    columns: {
        id: {
            type: "int",
            primary: true,
        },
        name: {
            type: "varchar",
            nullable: false,
        },
    }
})