import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../../products/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;

    @ApiProperty({
                        default: "Bimbo"
                    })
    @Column('text')
    providerName: string;

    @ApiProperty({
                    default: "bimbo@gmail.com"
                })
    @Column('text', {
        unique: true
    })
    providerEmail: string;

    @ApiProperty({
                    default: "4427584391"
                })
    @Column({
        type: "text",
        nullable: true,
    })
    providerPhoneNumber: string;
    @OneToMany(() => Product, (photo) => photo.provider)
    products: Product[]
}
