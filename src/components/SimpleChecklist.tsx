import React, { useState } from "react";
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
}

export default function SimpleChecklist({ items }: SimpleChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(
    new Set(items.filter((item) => item.checked).map((item) => item.id)),
  );

  const toggleItem = (id: string) => {
    const newChecked = new Set(checked);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setChecked(newChecked);
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
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart aria-hidden="true" style={{ pointerEvents: "none" }}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              animationDuration={300}
              focusable="false"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  focusable="false"
                />
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
