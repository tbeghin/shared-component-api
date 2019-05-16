import {ApiModel, ApiModelProperty} from "swagger-express-ts";

@ApiModel( {
    description : "User description" ,
    name : "User",
} )
export class User {
    @ApiModelProperty( {
        type: "string",
        description : "The firstName" ,
        required : true
    } )
    firstName : string;
    @ApiModelProperty( {
        type: "string",
        description : "The lastName" ,
        required : true
    } )
    lastName : string;
    @ApiModelProperty( {
        type: "string",
        description : "The username" ,
        required : true
    } )
    username : string;
    @ApiModelProperty( {
        type: "string",
        description : "Password" ,
        required : false
    } )
    password? : string;
    @ApiModelProperty( {
        type: "string",
        description : "authentication token" ,
        required : false
    } )
    token? : string;
}