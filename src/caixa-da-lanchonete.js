import * as cardapio from './cardapio';

console.table(cardapio.dados);

class CaixaDaLanchonete {

    constructor() {
        this.dadosCardapio = cardapio.CodigoValor;
    }

    validaMetodoPagamento(metodoDePagamento) {
        if (metodoDePagamento === 'dinheiro' || metodoDePagamento === 'debito' || metodoDePagamento === 'credito') {
            return true;
        }
        else {
            return false;
        }
    }

    porcentagemDePagamento(metodoDePagamento) {
        let desconto = 0;
        switch (metodoDePagamento) {
            case 'dinheiro':
                desconto = 0.95;
                break;
            case 'debito':
                desconto = 1;
                break;
            case 'credito':
                desconto = 1.03;
                break;
        }

        return desconto;
    }

    verificaPedido(metodoDePagamento, itens) {
        let valorPedido = 0;
        let itemExiste = 0;
        let regexMultiplicador = /\d+$/g;
        let verificaChantily = false;
        let verificaQueijo = false;
        itens.forEach(element => {
            this.dadosCardapio.forEach(elementoCardapio => {
                if (element.includes(elementoCardapio.codigo)) {
                    valorPedido += elementoCardapio.valor * Number(...element.match(regexMultiplicador));
                    itemExiste++;
                    if (elementoCardapio.codigo == 'chantily') {
                        verificaChantily = true;
                    }
                    if (elementoCardapio.codigo == 'queijo') {
                        verificaQueijo = true;
                    }
                }

            });
        });

        if (verificaChantily) {
            let aux = true;
            itens.forEach(element => {
                if (element.includes('cafe')) {
                    aux = false;
                }
            });

            if (aux) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (verificaQueijo) {
            let aux = true;
            itens.forEach(element => {
                if (element.includes('sanduiche')) {
                    aux = false;
                }
            });

            if (aux) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (this.validaMetodoPagamento(metodoDePagamento) && valorPedido.toFixed(0) == 0 && itemExiste === itens.length) {
            return "Quantidade inválida!";
        }

        if (itemExiste === itens.length) {
            return `R$ ${(valorPedido * this.porcentagemDePagamento(metodoDePagamento)).toFixed(2)}`.replace('.', ',');
        }
        else {
            return "Item inválido!";
        }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {

        if (itens == "" && this.validaMetodoPagamento(metodoDePagamento)) {
            return "Não há itens no carrinho de compra!";
        }

        if (this.validaMetodoPagamento(metodoDePagamento) === false) {
            return "Forma de pagamento inválida!";
        }

        return this.verificaPedido(metodoDePagamento, itens);
    }

}

export { CaixaDaLanchonete };
