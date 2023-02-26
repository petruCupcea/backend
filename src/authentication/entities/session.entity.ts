import { Column, Entity } from 'typeorm';


@Entity()
export class Session {

  @Column()
  id: number;

  @Column({
    nullable: false,
  })
  userId: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createTime: string;

}
