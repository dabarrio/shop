import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';


@Injectable()
export class ProductsService {
  private ID = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'lorem asgsdes',
      price: 100,
      stock: 10,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((e) => {
      return e.id === id;
    });

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return product;
  }

  create(payload: CreateProductDto) {
    this.ID++;
    const newProduct = {
      id: this.ID,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const updateProduct = this.findOne(id);

    if (updateProduct) {
      const index = this.products.findIndex((i) => i.id === id);
      this.products[index] = { ...updateProduct, ...payload };
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) throw new NotFoundException(`Product ${id} not found`);

    this.products.splice(index, 1);

    return 'Success';
  }
}
