import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async findAll() {
    const products = await this.productRepo.find();

    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepo.find({ where: { id: id } });

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = await this.productRepo.create(payload);

    return newProduct;
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepo.find({ where: { id: id } });

    this.productRepo.merge(product, payload);

    return this.productRepo.save(product);
  }

  // delete(id: number) {
  //   const index = this.products.findIndex((product) => product.id === id);

  //   if (index === -1) throw new NotFoundException(`Product ${id} not found`);

  //   this.products.splice(index, 1);

  //   return 'Success';
  // }
}
