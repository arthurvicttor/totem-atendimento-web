import { cn } from "@/utils/cn";
import type { Category } from "@/types";

interface CategoryNavProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function CategoryNav({
  categories,
  activeId,
  onSelect,
}: CategoryNavProps) {
  return (
    <aside className="w-44 shrink-0 flex flex-col gap-1 py-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm text-left transition-all duration-200 w-full",
            activeId === cat.id
              ? "bg-brand-active text-white"
              : "bg-transparent text-brand-dark hover:bg-gray-100",
          )}
        >
          <span className="text-lg">{cat.icon}</span>
          <span className="leading-tight">{cat.name}</span>
        </button>
      ))}
    </aside>
  );
}
