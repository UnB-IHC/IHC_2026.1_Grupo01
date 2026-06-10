import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
  title?: string;
}

export default function WCAGChecklist({
  items,
  title = "WCAG Checklist",
}: WCAGChecklistProps) {
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

  // Agrupar itens por nível
  const itemsByLevel = {
    A: items.filter((item) => item.level === "A"),
    AA: items.filter((item) => item.level === "AA"),
    AAA: items.filter((item) => item.level === "AAA"),
  };

  // Calcular progresso para cada nível
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

  const progressA = getProgress("A");
  const progressAA = getProgress("AA");
  const progressAAA = getProgress("AAA");

  // Dados para os gráficos de donut
  const createChartData = (progress: { total: number; checked: number }) => {
    return [
      { name: "Concluído", value: progress.checked },
      { name: "Pendente", value: progress.total - progress.checked },
    ];
  };

  const COLORS_A = ["#ff6b6b", "#ffe0e0"];
  const COLORS_AA = ["#4ecdc4", "#d4f4f1"];
  const COLORS_AAA = ["#1f3a93", "#d4d9e8"];

  const renderChart = (
    progress: { total: number; checked: number; percentage: number },
    colors: string[],
  ) => {
    return (
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={createChartData(progress)}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              animationDuration={300}
            >
              {createChartData(progress).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-stats">
          <div className="stat-number">{progress.checked}</div>
          <div className="stat-label">de {progress.total}</div>
          <div className="stat-percentage">
            {Math.round(progress.percentage)}%
          </div>
        </div>
      </div>
    );
  };

  const renderChecklistSection = (
    level: "A" | "AA" | "AAA",
    progress: typeof progressA,
  ) => {
    const items = itemsByLevel[level];
    const levelLabel = `WCAG 2.2 ${level}`;
    const levelDescription = {
      A: "Nível A - Requisitos essenciais de acessibilidade",
      AA: "Nível AA - Acessibilidade melhorada (recomendado)",
      AAA: "Nível AAA - Acessibilidade aprimorada",
    };

    return (
      <div key={level} className="checklist-section">
        <h3>
          <span className={`criteria-badge level-${level.toLowerCase()}`}>
            {levelLabel}
          </span>
          {levelDescription[level]}
        </h3>

        <div className="section-content">
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
                  <strong>{item.label}</strong>
                  <p className="item-description">{item.description}</p>
                </label>
              </div>
            ))}
          </div>

          <div className="chart-container">
            {renderChart(
              progress,
              {
                A: COLORS_A,
                AA: COLORS_AA,
                AAA: COLORS_AAA,
              }[level] as string[],
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="wcag-checklist">
      <div className="checklist-header">
        <h2>{title}</h2>
        <div className="progress-summary">
          <div className="summary-item">
            <span className="summary-badge level-a">A</span>
            <span className="summary-text">
              {progressA.checked}/{progressA.total} (
              {Math.round(progressA.percentage)}%)
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-badge level-aa">AA</span>
            <span className="summary-text">
              {progressAA.checked}/{progressAA.total} (
              {Math.round(progressAA.percentage)}%)
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-badge level-aaa">AAA</span>
            <span className="summary-text">
              {progressAAA.checked}/{progressAAA.total} (
              {Math.round(progressAAA.percentage)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="checklist-content">
        {renderChecklistSection("A", progressA)}
        {renderChecklistSection("AA", progressAA)}
        {renderChecklistSection("AAA", progressAAA)}
      </div>
    </div>
  );
}
