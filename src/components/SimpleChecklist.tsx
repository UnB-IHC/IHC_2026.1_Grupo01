import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../css/simple-checklist.css";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  checked?: boolean;
}

interface SimpleChecklistProps {
  items: ChecklistItem[];
  title?: string;
  checklistId?: string;
}

export default function SimpleChecklist({
  items,
  title = "Checklist",
  checklistId = "default-checklist",
}: SimpleChecklistProps) {
  const storageKey = `checklist-${checklistId}`;

  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    }
    return new Set(items.filter((item) => item.checked).map((item) => item.id));
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(checked)));
  }, [checked, storageKey]);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checked);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setChecked(newChecked);
  };

  const resetChecklist = () => {
    if (
      window.confirm(
        "Tem certeza que deseja limpar todo o progresso desta página?",
      )
    ) {
      localStorage.removeItem(`checklist-${checklistId}`);
      setChecked(new Set());
    }
  };

  const total = items.length;
  const checkedCount = checked.size;
  const percentage = total > 0 ? (checkedCount / total) * 100 : 0;

  const chartData = [
    { name: "Concluído", value: checkedCount },
    { name: "Pendente", value: total - checkedCount },
  ];

  const COLORS = ["#4ecdc4", "#e8f4f3"];

  return (
    <div className="simple-checklist">
      {title && <h3>{title}</h3>}

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart aria-hidden="true" style={{ pointerEvents: "none" }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              dataKey="value"
              animationDuration={300}
              focusable="false"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div
          className="chart-stats"
          role="img"
          aria-label={`Progresso: ${checkedCount} de ${total} itens concluídos (${Math.round(percentage)}%)`}
        >
          <div className="stat-number">{checkedCount}</div>
          <div className="stat-label">de {total}</div>
          <div className="stat-percentage">{Math.round(percentage)}%</div>
        </div>
        <button
          onClick={resetChecklist}
          className="reset-button"
          disabled={checked.size === 0}
        >
          Resetar todas as marcações
        </button>
      </div>

      <div className="checklist-items">
        {items.map((item) => (
          <div
            key={item.id}
            className={`checklist-item ${checked.has(item.id) ? "checked" : ""}`}
          >
            <input
              type="checkbox"
              id={item.id}
              checked={checked.has(item.id)}
              onChange={() => toggleItem(item.id)}
              aria-label={item.label}
            />
            <label htmlFor={item.id}>
              <span className="item-label">{item.label}</span>
              {item.description && (
                <span className="item-description">{item.description}</span>
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
