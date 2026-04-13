import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
    constructor(private aiService: AiService) {}

    @Get('insights/:babyId')
    getInsights(@Param('babyId') babyId: number) {
        return this.aiService.getInsights(+babyId);
    }
}
