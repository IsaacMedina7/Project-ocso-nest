import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../locations/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Region {

    @PrimaryGeneratedColumn('increment')
    regionId: number;

    @ApiProperty({
                        default: "Juriquilla"
                    })
    @Column({
       type: "text",
       unique: true
    })
    regionName: string;

    @ApiProperty({
                    default: "Queretaro"
                })
    @Column("simple-array")
    regionStates: string[];

    @OneToMany(() => Location, (location) => location.region)
    locations: Location[]

}
