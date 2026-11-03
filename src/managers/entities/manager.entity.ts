import { Entity, Column, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Location } from "../../locations/entities/location.entity";
import { User } from "../../auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Manager {

    @PrimaryGeneratedColumn('uuid')
    managerId: string;

    @ApiProperty({
            default: "Isaac Cisneros"
        })
    @Column("text")
    managerFullName: string;

    @ApiProperty({
            default: "$10,000 MXN"
        })
    @Column("float")
    managerSalary: number;

    @ApiProperty({
            default: "isaac@gmail.com"
        })
    @Column("text", {
        unique: true
    })
    managerEmail: string;

    @ApiProperty({
            default: "4427654521"
        })
    @Column("text")
    managerPhoneNumber: string;
    
    @OneToOne(() => Location)
    @JoinColumn({
        name: "locationId"
    })
    location: Location | null;

    @OneToOne(() => User)
    @JoinColumn({
        name:"userId"
    })
    user: User;
    
}
