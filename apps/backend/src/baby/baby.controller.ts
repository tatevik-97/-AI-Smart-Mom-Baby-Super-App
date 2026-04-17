import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateBabyDto } from 'src/baby/dto/create-baby.dto';
import { UpdateBabyDto } from 'src/baby/dto/update-baby.dto';
import { BabyService } from 'src/baby/baby.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from 'src/users/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('babies')
@UseGuards(JwtAuthGuard)
export class BabyController {
  constructor(private babyService: BabyService) {}

  @Post()
  create(@Body() dto: CreateBabyDto, @Req() req: Request & { user: User }) {
    return this.babyService.create(dto, req.user);
  }

  @Get()
  findAll(@Req() req: Request & { user: User }) {
    return this.babyService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req: Request & { user: User }) {
    return this.babyService.findOne(+id, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateBabyDto,
    @Req() req: Request & { user: User },
  ) {
    return this.babyService.update(+id, dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req: Request & { user: User }) {
    return this.babyService.remove(+id, req.user);
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.babyService.updatePhoto(id, file.filename);
  }
}
