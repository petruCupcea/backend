import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Categories {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  name: string;


  @Column({nullable: false})
  type: 'group' | 'category';

  @Column()
  icon: string;

  @Column()
  groupId: number;

}
