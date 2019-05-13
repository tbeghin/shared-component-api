const TYPES = {
    MongoDBClient: Symbol.for('MongoDBClient'),
    MongoDBConnection: Symbol.for('MongoDBConnection'),
    UserService: Symbol.for('UserService'),
    AuthenticateService: Symbol.for('AuthenticateService'),
    AuthenticationMiddleware: Symbol.for('AuthenticationMiddleware')
};

export default TYPES;