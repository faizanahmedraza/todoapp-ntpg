import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { generateHash } from '../../common/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly i18n: I18nService
  ) { }

  async create(createUserInput: CreateUserInput): Promise<String> {
    const user = this.userRepository.create({
      name: createUserInput?.name,
      email: createUserInput?.email,
      phone: createUserInput?.phone,
      address: createUserInput?.address,
      password: createUserInput.password ? generateHash(createUserInput?.password) : null
    });
    await this.userRepository.save(user);
    return await this.i18n.translate('general.CREATE', { args: { name: 'User' } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        userSchedules: true,
        todos: true
      }
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: { userSchedules: true, todos: true } });
    if (!user) {
      throw new BadRequestException(await this.i18n.t('general.NOT_FOUND', { args: { name: 'User', value: '#' + id } }));
    }
    return user;
  }

  async update(
    id: number,
    input: UpdateUserInput,
  ): Promise<String> {
    const user = await this.findOne(id);
    await this.userRepository.update({
      id: user.id
    }, {
      name: input?.name,
      email: input?.email,
      phone: input?.phone,
      address: input?.address
    });
    return await this.i18n.t('general.UPDATE', { args: { name: 'User' } });;
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.userRepository.delete(id);
    return await this.i18n.t('general.DELETE', { args: { name: 'User' } });;
  }

  async findByUserName(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findByUserNameAndId(params: any): Promise<User[]> {
    return await this.userRepository.findBy({
      email: params.email,
      id: Not(params.id)
    });
  }
}
