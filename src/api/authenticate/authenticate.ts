import {ApiModel, ApiModelProperty} from "swagger-express-ts";

@ApiModel( {
    description : "Model d'authentification avec user et mot de passe" ,
    name : "Authenticate",
} )
export class Authenticate {
    @ApiModelProperty( {
        type: "string",
        description : "The username" ,
        required : true
    } )
    username : string;
    @ApiModelProperty( {
        type: "string",
        description : "Password" ,
        required : true
    } )
    password : string;
}