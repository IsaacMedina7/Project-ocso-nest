import {Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn, EntityNotFoundError, IsNull, Generated} from "typeorm";
import { Provider } from "../../providers/entities/provider.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product {
        @PrimaryGeneratedColumn("uuid")
        productId: string;

        @ApiProperty({
                    default: "Coca Cola"
                })
        @Column({type: "text"})
        productName: string;

        @ApiProperty({
                    default: "$50.50 MXM"
                })
        @Column({type: "float"})
        price: number;

        @ApiProperty({
                    default: "100"
                })
        @Column({type: "int"})
        countSeal: number;
        
        @ManyToOne(() => Provider, (provider) => provider.products, {
                eager:true,
        })
        @JoinColumn({
                name: "providerId"
            })
        provider: Provider
} 
