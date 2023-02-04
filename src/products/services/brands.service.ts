import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDTO } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  private ID = 1;

  private brands: Brand[] = [{ id: 1, name: 'HP' }];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((brand) => {
      return brand.id === id;
    });

    if (!brand) throw new NotFoundException(`Brand ${id} not found`);

    return brand;
  }

  create(payload: CreateBrandDTO) {
    this.ID++;
    const newProduct = {
      id: this.ID,
      ...payload,
    };

    this.brands.push(newProduct);

    return newProduct;
  }

  delete(id: number) {
    const index = this.brands.findIndex((brand) => {
      brand.id === id;
    });
    if (index === -1) throw new NotFoundException(`Brand ${id} not found`);

    this.brands.splice(index, 1);

    return 'Success';
  }
}
