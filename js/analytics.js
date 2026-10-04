/* ============================================
   اسکریپت صفحه تحلیل و آمار
   ============================================ */

(function ($) {
  "use strict";

  let charts = [];
  const font = "Vazirmatn, sans-serif";

  function colors() {
    const dark = $("body").hasClass("dark-mode");
    return {
      text: dark ? "#94a3b8" : "#64748b",
      grid: dark ? "rgba(148,163,184,0.12)" : "rgba(100,116,139,0.12)",
    };
  }

  function baseOptions(extra) {
    const c = colors();
    return Object.assign(
      {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { font: { family: font }, color: c.text, usePointStyle: true, padding: 14 },
          },
        },
        scales: {
          x: { ticks: { font: { family: font }, color: c.text }, grid: { color: c.grid } },
          y: { ticks: { font: { family: font }, color: c.text }, grid: { color: c.grid } },
        },
      },
      extra || {}
    );
  }

  function render() {
    charts.forEach((c) => c.destroy());
    charts = [];
    const c = colors();

    // بازدید هفتگی (میله‌ای)
    charts.push(
      new Chart(document.getElementById("visitsChart"), {
        type: "bar",
        data: {
          labels: ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
          datasets: [
            {
              label: "بازدید",
              data: [1200, 1900, 1500, 2100, 2400, 1800, 2600],
              backgroundColor: "#4f46e5",
              borderRadius: 8,
            },
          ],
        },
        options: baseOptions(),
      })
    );

    // دستگاه‌ها (pie)
    charts.push(
      new Chart(document.getElementById("devicesChart"), {
        type: "pie",
        data: {
          labels: ["موبایل", "دسکتاپ", "تبلت"],
          datasets: [{ data: [58, 32, 10], backgroundColor: ["#4f46e5", "#0ea5e9", "#f59e0b"], borderWidth: 0 }],
        },
        options: baseOptions({
          plugins: { legend: { position: "bottom", labels: { font: { family: font }, color: c.text, usePointStyle: true, padding: 16 } } },
          scales: {},
        }),
      })
    );

    // درآمد بر اساس دسته (افقی)
    charts.push(
      new Chart(document.getElementById("categoryChart"), {
        type: "bar",
        data: {
          labels: ["الکترونیک", "پوشاک", "خانه", "زیبایی", "ورزش"],
          datasets: [{ label: "درآمد (میلیون)", data: [320, 210, 180, 140, 90], backgroundColor: ["#4f46e5", "#16a34a", "#0ea5e9", "#f59e0b", "#dc2626"], borderRadius: 8 }],
        },
        options: baseOptions({ indexAxis: "y" }),
      })
    );

    // رادار
    charts.push(
      new Chart(document.getElementById("radarChart"), {
        type: "radar",
        data: {
          labels: ["کیفیت", "سرعت", "قیمت", "پشتیبانی", "تنوع"],
          datasets: [
            { label: "امسال", data: [90, 75, 60, 85, 70], backgroundColor: "rgba(79,70,229,0.2)", borderColor: "#4f46e5", borderWidth: 2 },
            { label: "پارسال", data: [70, 65, 55, 70, 60], backgroundColor: "rgba(16,185,129,0.15)", borderColor: "#16a34a", borderWidth: 2 },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { font: { family: font }, color: c.text, usePointStyle: true } } },
          scales: { r: { ticks: { font: { family: font }, color: c.text, backdropColor: "transparent" }, grid: { color: c.grid }, angleLines: { color: c.grid }, pointLabels: { font: { family: font }, color: c.text } } },
        },
      })
    );
  }

  $(document).on("themeChanged", render);
  $(function () {
    render();
  });
})(jQuery);
