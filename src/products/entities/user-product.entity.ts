import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';


@Entity({name: 'user_products'})
export class UserProductEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'userId'})
  userId: number;

  @Column({name: 'productId'})
  productId: number;

}
