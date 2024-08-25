import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private productService: ProductsService,
    private customerService: CustomersService,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id, {
      relations: ['customer'],
    });
    if (!user) {
      throw new NotFoundException('This user does not exist');
    }
    return user;
  }

  async create(data: CreateUserDto) {
    const existingUser = await this.userRepo.findOne({ email: data.email });

    if (existingUser) {
      throw new ConflictException('This email is already in use');
    }
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const existingUser = await this.userRepo.findOne({ email: changes.email });

    if (existingUser) {
      throw new ConflictException('This email is already in use');
    }
    const userToUpdate = await this.findOne(id);
    this.userRepo.merge(userToUpdate, changes);
    return this.userRepo.save(userToUpdate);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      id,
      date: new Date(),
      user,
      products: await this.productService.findAll(),
    };
    return id;
  }
}
