import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimelineModule } from './timeline/timeline.module';
import { EventModule } from './event/event.module';
import { RedirectMiddleware } from './redirect.middleware';

@Module({
  imports: [TimelineModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RedirectMiddleware)
      .forRoutes('*');
  }
}
