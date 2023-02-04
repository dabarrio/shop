import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  private ID = 1;

  private categories: Category[] = [{ id: 1, name: 'Impresora' }];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((category) => {
      return category.id === id;
    });
    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return category;
  }

  create(payload: CreateCategoryDto) {
    this.ID++;
    const newCategory = {
      id: this.ID,
      ...payload,
    };
    this.categories.push(newCategory);

    return newCategory;
  }

  delete(id: number) {
    const index = this.categories.findIndex((category) => {
      return category.id === id;
    });

    if (index === -1) throw new NotFoundException(`Category ${id} not found`);

    this.categories.splice(index, 1);

    return 'Success';
  }
}
