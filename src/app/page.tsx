//Limpando a pagina principal
//Demarca que este componente roda no navegador do usuario
"use client";

// Importa o react e o hook useState.
// React é a base de tudo 
// useState é como uma variavel especial
// O painel
import { useState } from "react";

// Importa o componente da lista (vai ser criado)
import { ShoppingList } from "./components/ShoppingList";

// Importamos o componente do formulário de adicionar itens.
import { AddItemForm } from "./components/AddItemForm";

// Define o "formato" de um item da lista usando TypeScript.
// "Todo item PRECISA ter essas informações, nesse formato!.
export interface ShoppingItem {
  id: number;       // Núero de identificação
  nome: string;
  comprado: boolean; // true = já comprou, false = ainda não comprou
}

// Função PRINCIPAL da página. Next = funções --> Retornam uma pagina html
export default function Home() {

  // useState cria uma variavel para a tela
  const [itens, montaItens] = useState<ShoppingItem[]>([]);
  // itens = a lista de compras atual (começa vazia [])
  // montaItens = a função que atualiza a lista 
  // <ShoppingItem[]> = TypeScript dizendo "isso é uma LISTA de Shoppingitens"

  //nextID controla qual será o próximo ID a ser atribuido.
  // Começa em 1, e vai aumentando (1, 2, 3...) a cada novo item.
  const [nextId, montaNextId] = useState<number>(1);

  //Função adiciona um novo item á lista.
  // Ela recebe o nome do item (uma string) como parâmetro.
  const lidarAddItem = (nome: string) => {
    // Criamos um novo objeto com as informações do item.
    const novoItem: ShoppingItem = {
      id: nextId,
      nome: nome,
      comprado: false,
    };

    // montaItens atualiza a lista.
    // O [...itens, novoItem] significa: "pegue todos os itens antigos"
    // E adicione o novo no final".
    // O ... (spread operator) é como deerramar uma caixa de peças no chão e adicionar uma peça nova em cima.
    montaItens([...itens, novoItem]);

    montaNextId(nextId + 1);
  };

  //Função que remove um item da lista pelo ID.
  const lidarRemoveItem= (id: number) => {
    // filter cria uma NOVA lista contendo apenas os itens
    // cujo ID é DIFERENTE do ID que queremos remover.
    // É como separar as peças de Lego: você pega só as que 
    // NÃO são aquela cor.
    montaItens(itens.filter((item) => item.id !== id));
  };

  // Esta função edita o nome de um item existente.
  const lidarEditaItem= (id: number, newnome: string) => {
    // map percorre cada item da lista e retorna uma nova lista.
    // Para o item com o ID certo, troca o nome. Para os outros, deixa igual.
    // É como uma linha de montagem: cada peça passa pelo robô
    montaItens(
      itens.map((item) =>
        item.id === id 
          ? { ...item, nome: newnome } // Se for item certo: cria cópia com nome novo
          : item // Se não for: devolve o item sem mudança
      ) 
    );
  };

  const lidarMudaComprado= (id: number) => {
    montaItens(
      itens.map((item) =>
        item.id === id
          ? { ...item, comprado: !item.comprado }
          : item
      )
    );
  };
  const lidarRemonta = () => {
    if (confirm("Tem certeza que quer apagar toda a lista?")) {
      montaItens([]);
      montaNextId(1);
    }
  };

  return (
    //div principal com classes do Tailwind CSS para centralizar e estilizar
    <div className="min-h-screen bg-gray-100 flex flex-col itens-center py-10 px-4">
      {/* Titulo da pagina */}
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Lista de compras NEXT
      </h1>

      {/* Componente do formulário para adicionar itens. */}
      <AddItemForm onAdd={lidarAddItem} />

      {/* Componente da lista de itens.*/}
      <ShoppingList
        itens={itens}
        onRemove={lidarRemoveItem}
        onEdit={lidarEditaItem}
        onToggle={lidarMudaComprado}
      />

      {/*Botão de remonta*/}
      {itens.length > 0 && (
        <button 
          onClick={lidarRemonta}
          className="mt-6 py-2 bg-red-500 text-while rounded-lg hover:bg-red-600 transition"
        >
          Remontar lista
        </button>
      )}
      
    </div>
  );
}
