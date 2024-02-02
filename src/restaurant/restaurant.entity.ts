import { Column,  Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity({name : 'restaurants'})

export class Restaurant{

   @PrimaryGeneratedColumn()
   id : number;

   @Column()
   city : string;

   @Column()
   address : string;

   @Column()
   latitude : number;

   @Column()
   longitude : number ;

  
}