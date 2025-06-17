import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoalsModule } from './goals/goals.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [GoalsModule, AuthModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
