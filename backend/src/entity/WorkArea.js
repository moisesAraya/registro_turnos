import { EntitySchema } from "typeorm";

export const WorkArea = new EntitySchema({
    name: "WorkArea",
    tableName: "work_areas",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        worker_id: {
            type: "int",
            nullable: false,
        },
        work_area_id: {
            type: "int",
            nullable: false,
        },
        shift_date: {
            type: "date",
            nullable: false,
            default: () => "CURRENT_DATE",
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "worker_id",
                referencedColumnName: "id",
            },
        },
        area: {
            target: "Area",
            type: "many-to-one",
            joinColumn: {
                name: "work_area_id",
                referencedColumnName: "id",
            },
        },
    },
});