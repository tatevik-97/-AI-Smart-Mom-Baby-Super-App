import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/role.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
