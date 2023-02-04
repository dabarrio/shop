import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomersService {
  // constructor (private)

  private ID = 1;

  private custumers: Customer[] = [
    {
      id: 1,
      name: 'David',
      lastName: 'Barrios',
      email: 'dav@david.com',
      tel: 2235598044,
      adress: '220 bis 453',
      purchase: 1,
    },
  ];

  findAll() {
    return this.custumers;
  }
  findOne(id: number) {
    const customer = this.custumers.find((customer) => {
      return customer.id === id;
    });

    if (!customer) throw new NotFoundException(`Customer ${id} not found`);

    return customer;
  }
  create(payload: CreateCustomerDto) {
    this.ID++;
    const newCustomer = {
      id: this.ID,
      ...payload,
    };

    this.custumers.push(newCustomer);

    return newCustomer;
  }
  update(id: number, payload: UpdateCustomerDto) {
    const updateCustomer = this.findOne(id);
    if (!updateCustomer) return null;

    const index = this.custumers.findIndex((customer) => {
      return customer.id === id;
    });
    this.custumers[index] = { ...updateCustomer, ...payload };

    return this.custumers;
  }
  delete(id: number) {
    const index = this.custumers.findIndex((customer) => {
      return customer.id === id;
    });
    if (index === -1) throw new NotFoundException(`Customer ${id} not found`);

    this.custumers.splice(index, 1);

    return 'Success';
  }
}
