import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import BasicAuth from 'express-basic-auth';

class SwaggerTag {
  name: string;
  description: string | undefined;
}

class SwaggerDocumentParams {
  path: string;
  app: INestApplication<any>;
  name: string;
  version: string;
  tags: SwaggerTag[];
}

export class SwaggerConfig {
  private static readonly config = (params: SwaggerDocumentParams) => {
    const builder = new DocumentBuilder()
      .setTitle(`${params.name} API Docs`)
      .setVersion(params.version);

    params.tags.forEach((tag) => {
      builder.addTag(tag.name, tag.description);
    });

    return builder.build();
  };

  static readonly document = (params: SwaggerDocumentParams) =>
    SwaggerModule.createDocument(params.app, SwaggerConfig.config(params));

  static readonly setup = (params: SwaggerDocumentParams) => {
    params.app.use(
      [params.path, `${params.path}-json`, `${params}-async-api`],
      BasicAuth({
        challenge: true,
        users: {
          test: 'test',
        },
      }),
    );

    SwaggerModule.setup(
      params.path,
      params.app,
      SwaggerConfig.document(params),
    );
  };
}
