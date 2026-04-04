import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ImageableType {
  Product = 'Product',
  User = 'User',
  Category = 'Category',
  Tag = 'Tag',
}

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ name: 'imageable_id' })
  imageableId: string;

  @Column({ name: 'imageable_type', type: 'varchar' })
  imageableType: ImageableType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
