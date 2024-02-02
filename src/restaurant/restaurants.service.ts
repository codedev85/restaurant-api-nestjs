import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "./restaurant.entity";
import { Repository } from "typeorm";
import { createRestaurantDto} from "./dtos/create-restaurant.dto";
import { RestaurantResponseDto } from "./dtos/restaurant-response.dto";
import { plainToClass } from "class-transformer";
import { DeleteRestaurantResponseDto } from "./dtos/delete-restaurant-response.dto";


@Injectable()
export class RestaurantService{

   private restaurantIds: number[] = [];

   constructor(@InjectRepository(Restaurant)  private readonly  restaurantRepository : Repository <Restaurant>){}

   async create(dto : createRestaurantDto){

            if (!dto.city) {
               throw new HttpException('City is required', HttpStatus.NOT_FOUND);
            }

         const restaurant =  this.restaurantRepository.create(dto);
         return await this.restaurantRepository.save(restaurant);
   }

  async getAllRestaurants(){
   
     const  restaurants =  await this.restaurantRepository.find();

     const restaurantDtos = plainToClass(RestaurantResponseDto, {
      restaurants: restaurants.map((entity) => ({
        name: entity.city,
        address: entity.address,
        latitude: entity.latitude,
        longitude: entity.longitude,
      })),
    });

    return restaurantDtos;
    

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

     this.restaurantRepository.delete(id)

    const responseDto: DeleteRestaurantResponseDto= {
      response: 'Restaurant deleted',
    };

    return responseDto;
   }


   
   calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
       const R = 6371; 

       const dLat = this.toRadians(lat2 - lat1);

       const dLon = this.toRadians(lon2 - lon1);
   
       const a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
   
       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
   
       const distance = R * c; 
   
       return distance;
    }
   
   private toRadians(degrees: number): number {
            return degrees * (Math.PI / 180);
   }
    
  

   async getNearbyRestaurants(latitude: number ,longitude : number, maxDistance : number){


    const restaurants  = await this.restaurantRepository.find(); 


    const nearbyRestaurants = [];

    for (const restaurant of restaurants) {
      const distance = this.calculateDistance(latitude, longitude, restaurant.latitude, restaurant.longitude);

      if (distance <= maxDistance) {
        nearbyRestaurants.push(restaurant);
      }
    }

    return nearbyRestaurants;
   

   }

}