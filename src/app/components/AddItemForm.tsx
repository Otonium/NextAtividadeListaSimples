//Formulario onde o usuário digita o nome do item
"use client";

import { useState, FormEvent } from "react";

interface AddItemFormProps {
    onAdd: (nome: string) => void;
}

export function AddItemForm({ onAdd }: AddItemFormProps) {

    const [inputValue, monstaInputValue] = useState<string>("");

    const lidarSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedValue = inputValue.trim();

        if (trimmedValue === "") {
            alert("Por favor, digite o nome do item!");
            return; // Sai da função sem fazer nada
        }

        onAdd(trimmedValue);

        monstaInputValue("");
    };

    return (
        <form onSubmit={lidarSubmit} className="flex gap-2 w-full max-w-md mb-6">
            {/* Input de texto onde o usuário digita o nome do item */}
            <input type="text" value={inputValue} onChange={(event) => monstaInputValue(event.target.value)}
            placeholder="Ex: Arroz, Feijão..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus border-green-500"
            />

            {/* Botão de submit */}
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Adicionar
            </button>
        </form>
    );
}