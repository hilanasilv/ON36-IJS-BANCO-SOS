
import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { TipoConta } from '../../../../domain/enum/tipoDeConta';

export class UpdateContaCorrenteDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  chequeEspecial?: number;
  tipo: TipoConta = TipoConta.ContaCorrente;
}