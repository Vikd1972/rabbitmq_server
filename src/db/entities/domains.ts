import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import Link from './links';

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar' })
  domain: string;

  @Column({ nullable: false, type: 'boolean', default: 'false' })
  isChecked: boolean;

  @OneToMany(() => Link, (link) => link.id, { cascade: true })
  idsLinkk: Link[];
}

export default Domain;
