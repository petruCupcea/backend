import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class ProductImages {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  image: string;

}
