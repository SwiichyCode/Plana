import { User } from '@/core/domain/entities/user.entity';
import { CreateUser, UserRepository } from '@/core/domain/repositories/user.repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUser): Promise<User> {
    return this.userRepository.create(user);
  }
}
