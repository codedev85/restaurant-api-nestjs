import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "./restaurant.entity";
import { Repository } from "typeorm";
import { createRestaurantDto} from "./dtos/create-restaurant.dto";
import { RestaurantResponseDto } from "./dtos/restaurant-response.dto";


@Injectable()
export class RestaurantService{

   constructor(@InjectRepository(Restaurant)  private readonly  restaurantRepository : Repository <Restaurant>){}

   async create(dto : createRestaurantDto){

              const restaurant =  this.restaurantRepository.create(dto);
              return await this.restaurantRepository.save(restaurant);
   }

   getAllRestaurants(){
     const  restaurants =  this.restaurantRepository.find();
     return restaurants;
   }


   viewRestaurant(id :number){
    return  this.restaurantRepository.findOne({where:{id}});
   }


 async updateRestaurant(id : number , dto : createRestaurantDto){
    
      const restaurant = await this.restaurantRepository.findOne({where :{id}})

      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }

      if (dto.city) {restaurant.city = dto.city;}
      if (dto.address) { restaurant.address = dto.address;}
      if (dto.latitude) { restaurant.latitude = dto.latitude;}
      if (dto.longitude) { restaurant.longitude = dto.longitude;}
  
      return this.restaurantRepository.save(restaurant);
   }


   delete(id : number){
    return  this.restaurantRepository.delete(id)
   }
   
}