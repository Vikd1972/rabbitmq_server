import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Domain from './domains';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'varchar' })
  title: string;

  @Column({ nullable: false, type: 'varchar' })
  path: string;

  @Column({ nullable: true, type: 'real' })
  taskDuration: number;

  @Column({ nullable: true, type: 'integer' })
  numberOfLinks: number;

  @Column({ nullable: false, type: 'boolean', default: 'false' })
  isChecked: boolean;

  @ManyToOne(() => Domain, (domain) => domain.id, { cascade: true })
  @JoinColumn()
  idDomain: Domain;
}

export default Link;
