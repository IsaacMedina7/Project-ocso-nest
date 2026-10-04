import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @ApiProperty({
                        default: "user@gmail.com"
                    })
    @Column("text", {
        unique: true
    })
    userEmail: string;

    @ApiProperty({
                    default: "47yhhdybdy2dg7374y"
                })
    @Column("text")
    userPassword: string;

    @ApiProperty({
                    default: "Employee"
                })
    @Column("simple-array", {
        default: "Employee"
    })
    userRoles: string[];
    
    @OneToOne(() => Manager)
    manager: Manager;

    @OneToOne(() => Employee)
    employee: Employee;

}
