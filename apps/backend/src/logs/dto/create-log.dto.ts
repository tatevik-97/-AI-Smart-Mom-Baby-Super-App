export class CreateLogDto {
    type: 'sleep' | 'feeding' | 'diaper';
    value: string;
    babyId: number;
}
