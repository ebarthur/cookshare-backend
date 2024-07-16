import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as passport from 'passport'

const PORT =
  process.env.NODE_ENV === 'production'
    ? Number.parseInt(process.env.PORT)
    : 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  })
  app.enableCors({
    origin: ['http:localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: 'Content-Type,Authorization',
  })

  app.use(passport.initialize())

  const config = new DocumentBuilder()
    .setTitle('CookShare API')
    .setDescription('Share the Love, One Recipe at a Time')
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT)
}
bootstrap()
