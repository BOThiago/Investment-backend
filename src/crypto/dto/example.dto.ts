export class GerarAcordoCCParcelaDto {
  parcela: string;
  diasAtraso: string;
  descontoPrincipal: string;
}

export class GerarAcordoCCDto {
  parcelas: GerarAcordoCCParcelaDto[];
}
