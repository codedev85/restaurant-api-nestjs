import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { RestaurantService} from "./restaurants.service";
import { createRestaurantDto } from "./dtos/create-restaurant.dto";
import { ThrottlerGuard } from "@nestjs/throttler";

@Controller('restaurant')

@UseGuards(ThrottlerGuard)

export class RestaurantController{


   constructor(private readonly restaurantService : RestaurantService){}

   @Post()
   create(@Body()  dto : createRestaurantDto){

      try {

          return this.restaurantService.create(dto);

       } catch (error) {
    
         if (error instanceof HttpException && error.getStatus() === HttpStatus.BAD_REQUEST) {
           throw new HttpException({ message: error.message }, HttpStatus.BAD_REQUEST);
         }
         throw new HttpException('Internal Server Errorsss', HttpStatus.INTERNAL_SERVER_ERROR);
       }
      
   }

   @Get('all')
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


   @Get()
   getNearbyRestaurants(
    @Query('latitude', new ParseFloatPipe()) latitude: number,
    @Query('longitude', new ParseFloatPipe()) longitude: number,
    @Query('distance', new ParseIntPipe()) distance: number,
    @Query('city') city : string
   ) {
 

     return this.restaurantService.getNearbyRestaurants(
       latitude,
       longitude,
       Math.abs(distance),
       city,
     );
   }

}