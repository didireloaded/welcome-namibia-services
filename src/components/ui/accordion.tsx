import type { ReactNode } from "react";
import { Minus, Plus } from "lucide-react";
export function Accordion({
  items,
  activeIndex,
  onChange,
}: {
  items: Array<{ title: string; content: ReactNode }>;
  activeIndex: number | null;
  onChange: (index: number | null) => void;
}) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <div className="faq-item" key={item.title}>
          <button
            aria-expanded={activeIndex === index}
            aria-controls={`faq-answer-${index}`}
            onClick={() => onChange(activeIndex === index ? null : index)}
          >
            <span>{item.title}</span>
            {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
          </button>
          <div id={`faq-answer-${index}`} hidden={activeIndex !== index}>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
