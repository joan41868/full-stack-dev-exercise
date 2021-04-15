import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const rootMongooseTest = (options: MongooseModuleOptions = {}) => MongooseModule.forRootAsync({
  useFactory: async () => {
    mongod = new MongoMemoryServer();
    const mongoUri = await mongod.getUri();
    return {
      uri: mongoUri,
      ...options,
    }
  },
});

export const closeMongod = async () => {
  if (mongod) {
    await mongod.stop();
  }
}