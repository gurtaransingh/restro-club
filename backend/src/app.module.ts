import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LocationsModule } from './modules/locations/locations.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { RolesModule } from './modules/roles/roles.module';
import { TiersModule } from './modules/tiers/tiers.module';
import { FacilitiesModule } from './modules/facilities/facilities.module';
import { MenuModule } from './modules/menu/menu.module';
import { TablesModule } from './modules/tables/tables.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrdersModule } from './modules/orders/orders.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { EventsModule } from './modules/events/events.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { MasterStoreModule } from './modules/master-store/master-store.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    LocationsModule,
    DepartmentsModule,
    RolesModule,
    TiersModule,
    FacilitiesModule,
    MenuModule,
    TablesModule,
    RoomsModule,
    EmployeesModule,
    InventoryModule,
    OrdersModule,
    BookingsModule,
    EventsModule,
    ReviewsModule,
    MasterStoreModule,
  ],
})
export class AppModule {}
