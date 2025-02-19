import { User } from '@/core/domain/entities/user.entity';

export interface UserRepository {
  create(user: CreateUser): Promise<User>;
}

export type CreateUser = {
  clerkUserId: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
};
