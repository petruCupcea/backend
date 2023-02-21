import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Categories {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 60,
    nullable: false,
  })
  name: string;


  @Column({
    length: 16,
    nullable: false,
  })
  type: 'group' | 'category';


  @Column()
  groupId: number;

}
