import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Categories {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column()
  type: 'group' | 'category';


  @Column()
  groupId: number;

}
