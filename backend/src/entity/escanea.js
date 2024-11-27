import { EntitySchema } from "typeorm";

export const Escanea = new EntitySchema({
    name: "Escanea",
    tableName: "escanea",
    columns: {
        id: {
        primary: true,
        type: "uuid",
        generated: "uuid",
        },
        userId: {
        type: "int",
        },
        qrCodeid: {
        type: "uuid",
        },
        scannedAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
        },
    },
    });