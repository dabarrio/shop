import { PartialType } from '@nestjs/mapped-types';
import {
  IsBtcAddress,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly tel: number;

  @IsBtcAddress()
  @IsNotEmpty()
  readonly adress: string;

  @IsNumber()
  @IsNotEmpty()
  readonly purchase: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
