import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurant } from "./restaurant.entity";
import { RestaurantController } from "./restaurants.controller";
import { RestaurantService } from "./restaurants.service";

@Module({
   imports : [TypeOrmModule.forFeature([Restaurant])],
   controllers : [RestaurantController],
   providers : [RestaurantService]
})
export class RestaurantModule{

}