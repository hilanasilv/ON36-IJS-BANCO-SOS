import { IsEnum, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { TipoConta } from '../../../domain/enum/tipoDeConta';

export class UpdateContaDto {
  @IsNumber()
    @IsPositive()
    id!: number;

  @IsEnum(TipoConta)
    tipo!: TipoConta;

  @IsNumber()
    @IsPositive()
    saldo!: number;

  @IsNumber()
    @IsPositive()
    clienteId!: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  chequeEspecial?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  rendimentoMensal?: number;
}