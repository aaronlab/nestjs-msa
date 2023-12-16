import { AbstractRepository } from '@app/common/database';
import { Injectable, Logger } from '@nestjs/common';
import { UsersDocument } from './models/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
  protected readonly logger: Logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UsersDocument.name) userModel: Model<UsersDocument>,
  ) {
    super(userModel);
  }
}