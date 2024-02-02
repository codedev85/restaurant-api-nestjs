import { IsNotEmpty, IsString } from "class-validator";


export class createRestaurantDto{

   @IsString()
   @IsNotEmpty()
   city : string;

   @IsString()
   @IsNotEmpty()
   address : string;

   @IsString()
   @IsNotEmpty()
   latitude : number;

   @IsString()
   @IsNotEmpty()
   longitude : number ;
}