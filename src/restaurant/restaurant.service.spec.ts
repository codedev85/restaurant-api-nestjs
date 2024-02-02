import { RestaurantService } from './restaurants.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { createRestaurantDto } from './dtos/create-restaurant.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

describe('RestaurantService', () => {
  let service: RestaurantService;
  let repository: Repository<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getRepositoryToken(Restaurant),
          useClass: Repository, 
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));
   
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should find a restaurant', async () => {
   
   const restaurant: Restaurant = { id: 3 } as any;
 
   jest.spyOn(repository, 'findOne').mockResolvedValue(restaurant);
 
   const result = await service.viewRestaurant(3);
 
   expect(result).toEqual(restaurant);
 });


 it('should delete a restaurant', async () => {

   const restaurantId = 3;
 
   const mockDeleteResult: DeleteResult = { affected: 1, raw: {} }; 
 
   jest.spyOn(repository, 'delete').mockResolvedValue(mockDeleteResult);
 
   const result = await service.delete(restaurantId);
 
   expect(result).toEqual({ "response": "Restaurant deleted" });
 });


describe('updateRestaurant', () => {

   it('should update a restaurant', async () => {
     
     const restaurantId = 1;
     const updateDto: createRestaurantDto = {
       city: 'New City',
       address: 'New Address',
       latitude: 40.0,
       longitude: -74.0,
     };

     const mockFindOne = jest
       .spyOn(repository, 'findOne')
       .mockResolvedValue({ id: restaurantId, ...updateDto } as Restaurant);

     const mockSave = jest
       .spyOn(repository, 'save')
       .mockResolvedValue({ id: restaurantId, ...updateDto } as Restaurant);

     
     const result = await service.updateRestaurant(restaurantId, updateDto);

     
     expect(mockFindOne).toHaveBeenCalledWith({ where: { id: restaurantId } });
     expect(mockSave).toHaveBeenCalledWith({ id: restaurantId, ...updateDto });
     expect(result).toEqual({ id: restaurantId, ...updateDto });
   });

   it('should throw NotFoundException if restaurant not found', async () => {
     // Arrange
     const restaurantId = 1;
     const updateDto: createRestaurantDto = {
       city: 'New City',
       address: 'New Address',
       latitude: 40.0,
       longitude: -74.0,
     };

     const mockFindOne = jest.spyOn(repository, 'findOne').mockResolvedValue(null);

     // Act & Assert
     await expect(service.updateRestaurant(restaurantId, updateDto)).rejects.toThrowError(
       NotFoundException,
     );

     expect(mockFindOne).toHaveBeenCalledWith({ where: { id: restaurantId } });
   });
 });


 describe('getAllRestaurants', () => {

   it('should get all restaurants', async () => {
     // Arrange
     const mockRestaurants = [
       { id: 1, city: 'City1', address: 'Address1', latitude: 40.0, longitude: -74.0 },
       { id: 2, city: 'City2', address: 'Address2', latitude: 41.0, longitude: -75.0 },
     ] as Restaurant[];

     const mockFind = jest.spyOn(repository, 'find').mockResolvedValue(mockRestaurants);

     
     const result = await service.getAllRestaurants();

     expect(mockFind).toHaveBeenCalled();

     expect(result).toEqual({
       restaurants: [
         { name: 'City1', address: 'Address1', latitude: 40.0, longitude: -74.0 },
         { name: 'City2', address: 'Address2', latitude: 41.0, longitude: -75.0 },
       ],
     });
   });

   it('should return an empty array if no restaurants found', async () => {
     
     const mockFind = jest.spyOn(repository, 'find').mockResolvedValue([]);

    
     const result = await service.getAllRestaurants();

     expect(mockFind).toHaveBeenCalled();
     expect(result).toEqual({ restaurants: [] });
   });
 });

 
   describe('getNearbyRestaurants', () => {
      
      it('should get nearby restaurants', async () => {
        
        const mockRestaurants = [
          { id: 1, city: 'City1', latitude: 6.6018, longitude: 3.3515 },
          { id: 2, city: 'City2', latitude: 41.0, longitude: -75.0 },
        ] as Restaurant[];
  
        jest.spyOn(repository, 'find').mockResolvedValue(mockRestaurants);
  
        const latitude = 6.6018;
        const longitude = 3.3515;
        const maxDistance = 1000;
        const city = 'City1';
  
      
        const result = await service.getNearbyRestaurants(latitude, longitude, maxDistance, city);
  
        expect(result).toEqual([{ id: 1, city: 'City1', latitude: 6.6018, longitude:  3.3515 }]);
      });
  
      it('should throw an exception if city is not provided', async () => {
        
        const latitude = 40.5;
        const longitude = -74.5;
        const maxDistance = 10;
        const city = '';

        await expect(service.getNearbyRestaurants(latitude, longitude, maxDistance, city)).rejects.toThrowError(
          new HttpException('City is required', HttpStatus.NOT_FOUND),
        );
      });
    });

 

});

