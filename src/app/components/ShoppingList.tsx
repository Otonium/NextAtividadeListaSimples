// Recebe a lista de itens e exibe na tela
"use client";

import { ShoppingItem } from "../page";

import { ShoppingItemCard } from "./ShoppingItemcard";

interface ShoppingListProps { 
    itens: ShoppingItem[];
    onRemove: (id: number) => void;
    onEdit: (id: number, newnome: string) => void;
    onToggle: (id: number) => void;
}

export function ShoppingList({ itens, onRemove, onEdit, onToggle }: ShoppingListProps) {
    if (itens.length === 0) {
        return (
            <div className="text-gray-400 text-center mt-4">
                <p className="text-5x1 mb-3">ADD</p>
                <p>Lista vazia. Adicione um item acima</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md flex flex-col gap-2">
            {/* Pequeno contador mostrando quantos itens faltam comprar */}
            <p className="text-sm text-gray-500 text-right">
                {/* Filtrar itens comprados === false e contamos quantos são*/}
                {itens.filter((item) => !item.comprado).length} item(s) restante(s)
            </p>

            {/* .map() percorre cada item do array e retorna um componente para cada*/}
            {itens.map((item) => (
                <ShoppingItemCard
                    key={item.id}
                    item={item}
                    onRemove={onRemove}
                    onEdit={onEdit}
                    onToggle={onToggle}
                />
            ))}
        </div>
    )
}