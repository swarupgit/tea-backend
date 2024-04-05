import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import appConfig from './config/app.config';
import { mongooseConfig } from './config/mongoose.config';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { QuotationModule } from './quotation/quotation.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentsModule } from './payments/payment.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
      load: [appConfig],
    }),
    MongooseModule.forRootAsync(mongooseConfig),
    ProductsModule,
    OrdersModule,
    QuotationModule,
    CustomerModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
