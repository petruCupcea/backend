import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: 'car_brands'})
export class CarBrand {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'markName', length: 50})
  markName: string;

}
