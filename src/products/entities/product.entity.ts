import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Products {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  currency: string;

  @Column()
  groupId: number;

  @Column()
  subcategoryId: string;

}
