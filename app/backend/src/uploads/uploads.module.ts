import {Module} from '@nestjs/common';
import { UploadsController } from 'uploads/uploads.controller';

@Module({
  controllers: [UploadsController],
})
export class UploadsModule {}
