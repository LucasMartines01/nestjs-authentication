import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Setup {
  static setupDocumentations(app: INestApplication<any>) {
    const config = new DocumentBuilder()
      .setTitle('Ecommerce - Authentication API')
      .setDescription(
        'This is the API documentation for the Ecommerce - Authentication API',
      )
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
  }
}
