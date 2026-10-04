import {Entity, Column, PrimaryGeneratedColumn, EntityNotFoundError, IsNull, Generated, OneToOne, ManyToOne, JoinColumn} from "typeorm";
import { Location } from "../../locations/entities/location.entity";
import { User } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()

export class Employee {
        @PrimaryGeneratedColumn("uuid")
        employeeId: string;

        @ApiProperty({
                            default: "Isaac"
                        })
        @Column({type: "text"})
        employeeName: string;

        @ApiProperty({
                    default: "Cisneros"
                })
        @Column({type: "text"})
        employeeLastName: string;

        @ApiProperty({
                    default: "4427856742"
                })
        @Column({type: "text"})
        employeePhoneNumber: string;

        @ApiProperty({
                    default: "isaac@gmail.com"
                })
        @Column("text", {
         unique: true
        })
        employeeEmail: string;
        @Column({
                type: "text",
                nullable: true
        })
        employeePhoto: string;
        @ManyToOne(() => Location, (location) => location.employees)
        @JoinColumn({
                name:"locationId"
        })
        location: Location

        @OneToOne(() => User)
        @JoinColumn({
                name:"userId"
        })
            user: User;
} 
