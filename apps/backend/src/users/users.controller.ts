import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/role.enum';
import { UserService } from 'src/users/user.service';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private userService: UserService) {}

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: number) {
    await this.userService.deleteUser(+id);
    return { message: 'User deleted.' };
  }
}
