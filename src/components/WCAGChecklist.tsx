import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "../css/wcag-checklist.css";

interface ChecklistItem {
  id: string;
  label: string;
  level: "A" | "AA" | "AAA";
  description: string;
  checked?: boolean;
}

interface WCAGChecklistProps {
  items: ChecklistItem[];
}

export default function WCAGChecklist({ items }: WCAGChecklistProps) {
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

  const itemsByLevel = {
    A: items.filter((item) => item.level === "A"),
    AA: items.filter((item) => item.level === "AA"),
    AAA: items.filter((item) => item.level === "AAA"),
  };

  const getProgress = (level: "A" | "AA" | "AAA") => {
    const levelItems = itemsByLevel[level];
    const checkedCount = levelItems.filter((item) =>
      checked.has(item.id),
    ).length;
    return {
      total: levelItems.length,
      checked: checkedCount,
      percentage:
        levelItems.length > 0 ? (checkedCount / levelItems.length) * 100 : 0,
    };
  };

  const progress = {
    A: getProgress("A"),
    AA: getProgress("AA"),
    AAA: getProgress("AAA"),
  };

  const levelLabels = { A: "Fundamental", AA: "Essencial", AAA: "Avançado" };
  const levelDescriptions = {
    A: "Requisitos indispensáveis para o sistema ser acessível.",
    AA: "Conformidade robusta e alinhada às normas brasileiras.",
    AAA: "Excelência em acessibilidade e refinamento da experiência.",
  };

  const COLORS = {
    A: ["#c35050", "#ffe0e0"],
    AA: ["#2e7e78", "#d4f4f1"],
    AAA: ["#1f3a93", "#d4d9e8"],
  };

  const renderChart = (
    prog: { total: number; checked: number; percentage: number },
    colors: string[],
  ) => (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart aria-hidden="true" style={{ pointerEvents: "none" }}>
          <Pie
            data={[
              { name: "Concluído", value: prog.checked },
              { name: "Pendente", value: prog.total - prog.checked },
            ]}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            animationDuration={300}
          >
            {[
              { name: "Concluído", value: prog.checked },
              { name: "Pendente", value: prog.total - prog.checked },
            ].map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index]}
                focusable="false"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div
        className="chart-stats"
        role="img"
        aria-label={`Progresso: ${prog.checked} de ${prog.total} itens concluídos (${Math.round(prog.percentage)}%)`}
      >
        <div className="stat-number">{prog.checked}</div>
        <div className="stat-label">de {prog.total}</div>
        <div className="stat-percentage">{Math.round(prog.percentage)}%</div>
      </div>
    </div>
  );

  const renderSection = (level: "A" | "AA" | "AAA") => (
    <div key={level} className="checklist-section">
      <h3>
        <span className={`criteria-badge level-${level.toLowerCase()}`}>
          {levelLabels[level]}
        </span>
        {levelDescriptions[level]}
      </h3>
      <div className="section-content">
        <div className="checklist-items">
          {itemsByLevel[level].map((item) => (
            <div
              key={item.id}
              className={`checklist-item ${checked.has(item.id) ? "checked" : ""}`}
            >
              <input
                type="checkbox"
                id={item.id}
                checked={checked.has(item.id)}
                onChange={() => toggleItem(item.id)}
              />
              <label htmlFor={item.id}>
                <strong>{item.label}</strong>
                <p
                  className="item-description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </label>
            </div>
          ))}
        </div>
        <div className="chart-container">
          {renderChart(progress[level], COLORS[level])}
        </div>
      </div>
    </div>
  );

  return (
    <div className="wcag-checklist">
      <div className="checklist-header">
        <div className="progress-summary">
          {(["A", "AA", "AAA"] as const).map((lvl) => (
            <div key={lvl} className="summary-item">
              <span className={`summary-badge level-${lvl.toLowerCase()}`}>
                {levelLabels[lvl]}
              </span>
              <span className="summary-text">
                {progress[lvl].checked}/{progress[lvl].total} (
                {Math.round(progress[lvl].percentage)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="checklist-content">
        {renderSection("A")}
        {renderSection("AA")}
        {renderSection("AAA")}
      </div>
    </div>
  );
}
