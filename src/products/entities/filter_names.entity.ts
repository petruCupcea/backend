import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity({name: 'filter_names'})
export class FilterNames {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'markName', length: 50})
  markName: string;

  @Column({name: 'categoryId'})
  categoryId: number;

}
