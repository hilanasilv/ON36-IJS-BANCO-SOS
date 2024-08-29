import { IsNumber, IsPositive } from 'class-validator';
import { TipoConta } from '../../../../domain/enum/tipoDeConta';

export class CreateContaPoupancaDto {
  @IsNumber()
    @IsPositive()
    id!: number;

  @IsNumber()
    @IsPositive()
    saldo!: number;

  @IsNumber()
    @IsPositive()
    clienteId!: number;

  @IsNumber()
    @IsPositive()
    rendimentoMensal!: number;

  @IsNumber()
  tipo: TipoConta = TipoConta.ContaPoupanca;
}