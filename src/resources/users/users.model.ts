import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IUserParams {
  id?: string;
  name: string;
  login: string;
  password: string;
}

@Entity('Users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  /**
   * Returns `User` without password object
   * @param user `User` to make `User` without password
   * @return `User` without password object
   */
  static toResponse(user: User): Omit<User, 'password'> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export { User };
