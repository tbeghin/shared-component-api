import {BaseHttpController, controller, httpPost, requestBody} from "inversify-express-utils";
import {ApiOperationPost, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import {inject} from "inversify";
import TYPES from "../../utils/constant/types";
import {AuthenticateService} from "./authenticate.service";
import {Authenticate} from "./authenticate";
import JsonResult from "inversify-express-utils/dts/results/JsonResult";

@ApiPath({
    path: "/authenticate",
    name: "Authenticate",
    security: {basicAuth: []}
})
@controller('/authenticate')
export class AuthenticateController extends BaseHttpController {
    @inject(TYPES.AuthenticateService) private authenticateService: AuthenticateService;

    @ApiOperationPost({
        description: "Post user to receive JWT",
        summary: "Authentication of user",
        parameters: {
            body: {description: "New version", required: true, model: "Authenticate"},
        },
        responses: {
            200: {description: "Success", type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: "User"}
        },
        security: {
            apiKeyHeader: []
        }
    })
    @httpPost('/authenticate')
    public async post(@requestBody() request: Authenticate): Promise<JsonResult> {
        return this.json(await this.authenticateService.authenticate(request));
    }
}