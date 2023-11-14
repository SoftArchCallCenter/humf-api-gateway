import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class GetByUserNotificationDto {
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    datetime: string;
}
