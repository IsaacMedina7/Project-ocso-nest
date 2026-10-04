import { Column, Entity, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Manager } from "../../managers/entities/manager.entity";
import { Region } from "../../regions/entities/region.entity";
import { Employee } from "../../employees/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "Ocso Juriquila"
    })
    @Column("text")
    locationName: string;

    @ApiProperty({
        default: "Avenita Tal, S/N, 76200"
    })
    @Column("text")
    locationAddress: string;

    @ApiProperty({
        default: [12,12]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne(() => Manager, {
        eager: true
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager;

    @ManyToOne(() => Region, (region) => region.locations)
     @JoinColumn({
        name: "regionId"
    })
    region: Region;

    @OneToMany(() => Employee, (employeee) => employeee.location )
    employees: Employee[];
}
