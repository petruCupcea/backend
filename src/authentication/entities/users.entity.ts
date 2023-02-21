import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 32,
    nullable: false,
  })
  name: string;

  @Column({
    length: 32,
    nullable: false,
  })
  surname: string;

  @Column({
    length: 32,
    nullable: false,
  })
  email: string;

  @Column({
    length: 16,
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    length: 64,
    nullable: false,
  })
  password: string;

}
