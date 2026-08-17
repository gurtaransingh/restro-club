import { Controller, Get } from '@nestjs/common';
import { MasterStoreService } from './master-store.service';

@Controller('api')
export class MasterStoreController {
  constructor(private readonly masterStoreService: MasterStoreService) {}

  @Get('master-store')
  getMasterStore() {
    return this.masterStoreService.getMasterStore();
  }
}
