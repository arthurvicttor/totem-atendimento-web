import { cn } from "@/utils/cn";
import type { Category } from "@/types";

interface CategoryNavProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
  onCancel: () => void;
}

export function CategoryNav({
  categories,
  activeId,
  onSelect,
  onCancel,
}: CategoryNavProps) {
  return (
    <nav className="bg-surface-container h-full w-64 border-r-4 border-on-surface flex flex-col shrink-0">
      {/* Título fixo no topo */}
      <div className="px-6 py-8 border-b border-on-surface/10 shrink-0">
        <h2 className="font-bold text-2xl text-primary">Cardápio</h2>
        <p className="text-sm text-on-surface-variant">Selecione a categoria</p>
      </div>

      {/* Lista de categorias com scroll */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelect(category.id)}
            className={cn(
              "w-full flex flex-col items-center py-8 gap-2 transition-all duration-150 active:translate-x-1 border-l-4 cursor-pointer",
              activeId === category.id
                ? "bg-primary text-on-primary border-l-secondary-container"
                : "text-on-surface-variant hover:bg-surface-variant border-l-transparent",
            )}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "2rem",
                fontVariationSettings:
                  activeId === category.id ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              {category.icon}
            </span>
            <span className="text-xs font-bold uppercase text-center px-2 leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Botão cancelar fixo no rodapé */}
      <div className="px-4 py-4 shrink-0 border-t border-on-surface/10">
        <button
          onClick={onCancel}
          className="w-full py-4 border-4 border-primary text-primary font-bold text-sm active:scale-95 transition-transform uppercase"
        >
          Cancelar Pedido
        </button>
      </div>
    </nav>
  );
}
