import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  title: string;

  @Column({ nullable: true, type: 'varchar' })
  path: string;

  @Column({ nullable: true, type: 'real' })
  taskDuration: number;

  @Column({ nullable: true, type: 'integer' })
  numberOfLinks: number;

  @Column({ nullable: true, type: 'integer' })
  idRootPage: number;

  @Column({ nullable: true, type: 'boolean', default: 'false' })
  isChecked: boolean;
}

export default Link;
