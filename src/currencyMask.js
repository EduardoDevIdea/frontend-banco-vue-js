//exporting currencyMask (mascara de moeda) to use in currency fields

import createNumberMask from 'text-mask-addons/dist/createNumberMask'; //importando biblioteca que configura mascara monetária


//configurando createNunberMask da maneira que quiser
const currencyMask =  createNumberMask ({
    prefix: 'R$', //se optar por vazio, colocar '' para não inserir um prefixo tipo $ (que é o padrão)
    thousandsSeparatorSymbol: '.', //separando os milhares com ponto
    allowDecimal: true, //permite que o numero tenha fração
    decimalSymbol: ',', //separando o numero com virgula nas casas decimais
});

export default currencyMask; //exportando currencyMask