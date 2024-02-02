import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class createRestaurantDto{

   @IsString({ message: 'City must be a string' })
   @IsNotEmpty({ message: 'City is required' })
   city : string;

   @IsString({ message: 'Address must be a string' })
   @IsNotEmpty({ message: 'Address is required' })
   address : string;

   // @IsNumber({ message: 'Laitude must be an integer' })
   @IsNotEmpty({ message: 'Latitude is required' })
   latitude : number;

   // @IsNumber({ message: 'Longitude must be an integer' })
   @IsNotEmpty({ message: 'Longitde is required' })
   longitude : number ;
}