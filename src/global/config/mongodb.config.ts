import { ConfigModule, ConfigService } from '@nestjs/config';

export const MongoConfigAsync = {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONNECTION'),
    }),
    inject: [ConfigService],
};
