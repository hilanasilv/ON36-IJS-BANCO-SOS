import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { TipoConta } from '../../../../domain/enum/tipoDeConta';

export class UpdateContaPoupancaDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  saldo?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  rendimentoMensal?: number;

  @IsNumber()
  tipo: TipoConta = TipoConta.ContaPoupanca;
}