import { IsNumber, IsPositive } from 'class-validator';
import { TipoConta } from '../../../../domain/enum/tipoDeConta';

export class CreateContaCorrenteDto {
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
    chequeEspecial!: number;

  @IsNumber()
  tipo: TipoConta = TipoConta.ContaCorrente;
}