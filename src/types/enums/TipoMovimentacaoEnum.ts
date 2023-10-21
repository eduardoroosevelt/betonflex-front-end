export enum TipoMovimentacaoEnum {
    ENTRADA = 'ENTRADA',
    SAIDA = 'SAIDA',
}


export const TipoMovimentacaoEnumOptions = Object.keys(TipoMovimentacaoEnum).map((key) => {
    const enumKey = key as keyof typeof TipoMovimentacaoEnum;
    return { label: key, code: TipoMovimentacaoEnum[enumKey] };
  });