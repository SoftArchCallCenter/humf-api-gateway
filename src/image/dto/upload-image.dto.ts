import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDto } from './create-image.dto';

export class UploadimageDto extends PartialType(CreateImageDto) {
    image: Blob;
}
