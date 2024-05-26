import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // 設置全局路徑前綴
  app.enableCors({
    // 可以換成自己的網址，或是設置為 * 來允許所有網址
    origin: [
      'https://todomvc-i2at.onrender.com',
      'https://jiahongl.github.io',
      'http://localhost:4200',
      'https://localhost:4200',
      'http://localhost:4000',
      'https://localhost:4000',
      'http://localhost:5173'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  }); // 啟用跨域請求

  const config = new DocumentBuilder()
    .setTitle('Todomvc example')
    .setDescription('這是一組用來練習前端 CRUD 操作的 APIs，使用 Nest.js 框架建立。')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();