import { Module } from '@nestjs/common';
import { MasterStoreController } from './master-store.controller';
import { MasterStoreService } from './master-store.service';

@Module({
  controllers: [MasterStoreController],
  providers: [MasterStoreService],
  exports: [MasterStoreService],
})
export class MasterStoreModule {}
