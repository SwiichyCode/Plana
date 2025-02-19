import { DI_SYMBOLS } from '#di/types';
import { UserService } from '@/core/domain/services/user.service';
import { PrismaUserRepository } from '@/core/infrastructure/repositories/prisma/user.repository';
import { createModule } from '@evyweb/ioctopus';

export function createUserModule() {
  const userModule = createModule();

  userModule.bind(DI_SYMBOLS.UserRepository).toClass(PrismaUserRepository, [DI_SYMBOLS.CrashReporterService]);
  userModule.bind(DI_SYMBOLS.UserService).toClass(UserService, [DI_SYMBOLS.UserRepository]);

  return userModule;
}
