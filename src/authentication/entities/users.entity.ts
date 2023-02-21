import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as crypto from 'crypto';


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


  @BeforeInsert()
  hashPassword() {
    if (this.password) {
      try {
        this.password = crypto.createHash('sha256').update(this.password).digest('hex');
      } catch (e) {
        console.log(e);
      }
    }
  }

}
