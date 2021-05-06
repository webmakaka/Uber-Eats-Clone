import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import {ScheduleModule} from '@nestjs/schedule';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from 'auth/auth.module';
import {CommonModule} from 'common/common.module';
import * as Joi from 'joi';
import {JwtModule} from 'jwt/jwt.module';
import {OrderItem} from 'orders/entities/order-item.entity';
import {Order} from 'orders/entities/order.entity';
import {Payment} from 'payments/entities/payment.entity';
import {Category} from 'restaurants/entities/category.entity';
import {Dish} from 'restaurants/entities/dish.entity';
import {Restaurant} from 'restaurants/entities/restaurant.entity';
import {RestaurantsModule} from 'restaurants/restaurants.module';
import {User} from 'users/entities/user.entity';
import {Verification} from 'users/entities/verification.entity';
import {UsersModule} from 'users/users.module';
import {MailModule} from './mail/mail.module';
import {OrdersModule} from './orders/orders.module';
import {PaymentsModule} from './payments/payments.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod', 'test').required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN_NAME: Joi.string().required(),
        MAILGUN_FROM_EMAIL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging:
        process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      entities: [
        User,
        Verification,
        Restaurant,
        Category,
        Dish,
        Order,
        OrderItem,
        Payment,
      ],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        return {
          token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
        };
      },
    }),
    ScheduleModule.forRoot(),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    CommonModule,
    PaymentsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
