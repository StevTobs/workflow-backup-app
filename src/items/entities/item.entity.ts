import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// export enum ItemStatus {
//   PENDING = 'PENDING',
//   APPROVED = 'APPROVED',
//   REJECTED = 'REJECTED'
// }

@Entity()
export class Item {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 }) // Optional: Specify length for the title
  title: string;

  @Column()
  amount: number;

  @Column()
  quantity: number;

  @Column()
  status: string;


  @Column({ nullable: true }) // Optional: Make user_id nullable
  user_id: number;
}
