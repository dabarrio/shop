import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { CustomersService } from '../services/costumers.service';

@Controller('customers')
export class CustomersController {
  constructor(private service: CustomersService) {}

  @Get()
  getCustomer() {
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.service.update(id, payload);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.service.create(payload);
  }

  @Post(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
