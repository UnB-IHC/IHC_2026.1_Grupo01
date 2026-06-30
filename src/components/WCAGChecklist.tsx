import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "../css/wcag-checklist.css";

interface ChecklistItem {
  id: string;
  label: string;
  level: "A" | "AA" | "AAA";
  description: string;
}

interface WCAGChecklistProps {
  items: ChecklistItem[];
  checklistId: string;
}

export default function WCAGChecklist({
  items,
  checklistId,
}: WCAGChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`checklist-${checklistId}`);
      if (saved) return new Set(JSON.parse(saved));
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem(
      `checklist-${checklistId}`,
      JSON.stringify(Array.from(checked)),
    );
  }, [checked, checklistId]);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checked);
    newChecked.has(id) ? newChecked.delete(id) : newChecked.add(id);
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

  const scrollToSection = (level: string) => {
    document
      .getElementById(`section-${level}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const itemsByLevel = {
    A: items.filter((i) => i.level === "A"),
    AA: items.filter((i) => i.level === "AA"),
    AAA: items.filter((i) => i.level === "AAA"),
  };

  const getProgress = (level: "A" | "AA" | "AAA") => {
    const levelItems = itemsByLevel[level];
    const checkedCount = levelItems.filter((i) => checked.has(i.id)).length;
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

  const renderChart = (prog: any, colors: string[]) => (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={[
              { value: prog.checked },
              { value: prog.total - prog.checked },
            ]}
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
          >
            {[
              { value: prog.checked },
              { value: prog.total - prog.checked },
            ].map((_, i) => (
              <Cell key={`cell-${i}`} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="chart-stats">
        <div className="stat-number">{prog.checked}</div>
        <div className="stat-label">de {prog.total}</div>
        <div className="stat-percentage">{Math.round(prog.percentage)}%</div>
      </div>
    </div>
  );

  return (
    <div className="wcag-checklist">
      <div className="checklist-header">
        <div className="progress-summary">
          {(["A", "AA", "AAA"] as const).map((lvl) => (
            <button
              key={lvl}
              className="summary-item"
              onClick={() => scrollToSection(lvl)}
            >
              <span>{levelLabels[lvl]}</span>
              <span>
                {progress[lvl].checked}/{progress[lvl].total} (
                {Math.round(progress[lvl].percentage)}%)
              </span>
            </button>
          ))}
        </div>
        <div className="actions-bar">
          <button
            onClick={resetChecklist}
            className="reset-button"
            disabled={checked.size === 0}
          >
            Resetar todas as marcações
          </button>
        </div>
      </div>

      <div className="checklist-content">
        {(["A", "AA", "AAA"] as const).map((lvl) => (
          <div key={lvl} id={`section-${lvl}`} className="checklist-section">
            <h3>
              <span className={`criteria-badge level-${lvl.toLowerCase()}`}>
                {levelLabels[lvl]}
              </span>
              {levelDescriptions[lvl]}
            </h3>
            <div className="section-content">
              <div className="checklist-items">
                {itemsByLevel[lvl].map((item) => (
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
                {renderChart(progress[lvl], COLORS[lvl])}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
