// ShoppingItemCard.tsx
"use client";

import { useState } from "react";
import { ShoppingItem } from "../page";

interface ShoppingItemCardProps {
    item: ShoppingItem;     //O item a ser exibido
    onRemove: (id: number) => void;     //Função de remover do ancestral
    onEdit: (id: number, novonome: string) => void;
    onToggle: (id: number) => void;
}

export function ShoppingItemCard({ item, onRemove, onEdit, onToggle }: 
    ShoppingItemCardProps) {
        const [EstaEditando, montaEstaEditando] = useState<boolean>(false);
        const [EditaValor, montaEditaValor] = useState<string>(item.nome);

        const lidarConfirmaEdit = () => {
            const trimmed = EditaValor.trim();

            if (trimmed === "") {
                alert("O nome do item não pode ser vazio");
                return;
            }

            onEdit(item.id, trimmed);

            montaEstaEditando(false);
        };

        const lidarBotaoPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                lidarConfirmaEdit();
            }
            if (event.key === "Escape") {
                montaEditaValor(item.nome);
                montaEstaEditando(false);
            }
        };

        return (
            <div className={`flex itens-center gap-2 p-3 bg-white rounded-lg shadow-sm border
                ${item.comprado ? "opacity-50 border-gray-200" : "border-gray-300"}`}>
                    {/* Checkbox para marcar como comprado. */}
                    <input type="checkbox" checked={item.comprado} onChange={() => onToggle(item.id)}
                    className="w-5 h-5 cursor-pointer accent-green-600"
                    />

                    {/* Área do nome */}
                    <div className="flex-1">
                        {EstaEditando ? (
                            <input type="text" value={EditaValor} onChange={(e) => montaEditaValor(e.target.value)}
                            onKeyDown={lidarBotaoPress}
                            autoFocus className="w-full px-2 py-1 border border-blue-400 rounded focus:outline-none"/>
                        ) : (
                            <span className={`text-base ${item.comprado ? "line-through text-gray-400" : "text-gray-700"}`}
                            >
                                {item.nome}
                            </span>
                        )}
                        </div>

                        {/* Área dos botoes*/}
                        <div className="flex gap-1">
                            {EstaEditando ? (
                                <>
                                <button onClick={lidarConfirmaEdit}
                                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                >
                                Confirmar
                                </button>
                                <button onClick={() => {
                                    montaEditaValor(item.nome);
                                    montaEstaEditando(false);
                                }}
                                className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition" 
                                title="Confirmar edição"
                                >
                                    Confirmar
                                </button>
                                <button onClick={() => {
                                    montaEditaValor(item.nome);
                                    montaEstaEditando(false);
                                }}
                                className="px-2 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:gb-gray-400 transition"
                                title="Cancelar edição"
                                >
                                    Cancelar
                                </button>
                                </>
                            ) : (
                                <>
                                <button onClick={() => montaEstaEditando(true)}
                                disabled={item.comprado}
                                className="px-2 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500 transition disabled:opacity-30 disabled:cursor-not-allowed" 
                                title="Editar item"
                                >
                                    Editar
                                </button>
                                <button onClick={() => onRemove(item.id)} className="px-2 py-1 text-sm bg-red-400 text-white rounded hover:bg-red-500 transition" title="Remover item"
                                >
                                Remover
                                </button>
                                </>
                            )}
                            </div>
                        </div>
        );
    }