import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RestaurantService} from "./restaurants.service";
import { createRestaurantDto } from "./dtos/create-restaurant.dto";

@Controller('v1/restaurant')

export class RestaurantController{


   constructor(private readonly restaurantService : RestaurantService){}

   @Post()
   create(@Body()  dto : createRestaurantDto){
      return this.restaurantService.create(dto)
   }

   @Get()
   getAllRestaurants(){
      return this.restaurantService.getAllRestaurants();
   }

   @Get(':id')
   viewrestaurant(@Param('id') id : number){
      return this.restaurantService.viewRestaurant(id);
   }

   @Put(':id')
   updateRestaurant(@Param('id') id  :number, @Body() dto : createRestaurantDto ){
      return this.restaurantService.updateRestaurant(id ,dto);
   }

   @Delete(':id')
   deleteRestaurant(@Param('id') id : number){
      return this.restaurantService.delete(id);
   }

}