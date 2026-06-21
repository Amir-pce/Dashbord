/* ============================================
   اسکریپت صفحه داشبورد
   چارت‌ها با Chart.js + داده‌های نمونه
   ============================================ */

(function ($) {
  "use strict";

  let salesChart, trafficChart;

  function chartColors() {
    const dark = $("body").hasClass("dark-mode");
    return {
      text: dark ? "#94a3b8" : "#64748b",
      grid: dark ? "rgba(148,163,184,0.12)" : "rgba(100,116,139,0.12)",
    };
  }

  function persianFont() {
    return "Vazirmatn, sans-serif";
  }

  /* -------- نمودار فروش -------- */
  function renderSalesChart() {
    const ctx = document.getElementById("salesChart");
    if (!ctx) return;
    const c = chartColors();
    const grad = ctx.getContext("2d").createLinearGradient(0, 0, 0, 320);
    grad.addColorStop(0, "rgba(79,70,229,0.35)");
    grad.addColorStop(1, "rgba(79,70,229,0)");

    salesChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"],
        datasets: [
          {
            label: "فروش (میلیون)",
            data: [320, 410, 380, 520, 480, 610],
            borderColor: "#4f46e5",
            backgroundColor: grad,
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: "#4f46e5",
            pointRadius: 4,
          },
          {
            label: "درآمد (میلیون)",
            data: [210, 290, 260, 380, 350, 470],
            borderColor: "#16a34a",
            backgroundColor: "transparent",
            fill: false,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: "#16a34a",
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { font: { family: persianFont() }, color: c.text, usePointStyle: true },
          },
          tooltip: { bodyFont: { family: persianFont() }, titleFont: { family: persianFont() } },
        },
        scales: {
          x: { ticks: { font: { family: persianFont() }, color: c.text }, grid: { color: c.grid } },
          y: { ticks: { font: { family: persianFont() }, color: c.text }, grid: { color: c.grid } },
        },
      },
    });
  }

  /* -------- نمودار ترافیک -------- */
  function renderTrafficChart() {
    const ctx = document.getElementById("trafficChart");
    if (!ctx) return;
    const c = chartColors();

    trafficChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["جستجوی ارگانیک", "مستقیم", "شبکه‌های اجتماعی", "ارجاع"],
        datasets: [
          {
            data: [45, 25, 20, 10],
            backgroundColor: ["#4f46e5", "#0ea5e9", "#f59e0b", "#16a34a"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "bottom",
            labels: { font: { family: persianFont() }, color: c.text, usePointStyle: true, padding: 16 },
          },
        },
      },
    });
  }

  /* -------- جدول سفارش‌های اخیر -------- */
  const orders = [
    { name: "مریم احمدی", img: 5, product: "لپ‌تاپ ایسوس", amount: "۲۴٬۵۰۰٬۰۰۰", status: "active", statusText: "تکمیل شده" },
    { name: "رضا کریمی", img: 13, product: "هدفون بی‌سیم", amount: "۱٬۲۰۰٬۰۰۰", status: "pending", statusText: "در انتظار" },
    { name: "سارا محمدی", img: 9, product: "ساعت هوشمند", amount: "۳٬۸۰۰٬۰۰۰", status: "active", statusText: "تکمیل شده" },
    { name: "امیر حسینی", img: 33, product: "موبایل سامسونگ", amount: "۱۸٬۰۰۰٬۰۰۰", status: "inactive", statusText: "لغو شده" },
    { name: "نگار رستمی", img: 21, product: "کیبورد مکانیکی", amount: "۲٬۱۰۰٬۰۰۰", status: "active", statusText: "تکمیل شده" },
  ];

  function renderOrders() {
    let html = "";
    orders.forEach((o) => {
      html += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <img src="https://i.pravatar.cc/80?img=${o.img}" class="avatar-sm" alt="">
              <span>${o.name}</span>
            </div>
          </td>
          <td>${o.product}</td>
          <td>${o.amount} ﷼</td>
          <td><span class="status-pill status-${o.status}">${o.statusText}</span></td>
        </tr>`;
    });
    $("#recent-orders").html(html);
  }

  /* -------- فید فعالیت‌ها -------- */
  const activities = [
    { icon: "fa-user-plus", color: "text-primary", text: "کاربر جدید «لیلا نوری» ثبت‌نام کرد", time: "۵ دقیقه پیش" },
    { icon: "fa-cart-shopping", color: "text-success", text: "سفارش #۱۰۲۴ ثبت شد", time: "۲۰ دقیقه پیش" },
    { icon: "fa-star", color: "text-warning", text: "نظر جدید برای محصول ثبت شد", time: "۱ ساعت پیش" },
    { icon: "fa-box", color: "text-info", text: "محصول «مانیتور ال‌جی» اضافه شد", time: "۳ ساعت پیش" },
    { icon: "fa-triangle-exclamation", color: "text-danger", text: "موجودی «شارژر فست» رو به اتمام است", time: "دیروز" },
  ];

  function renderActivity() {
    let html = "";
    activities.forEach((a) => {
      html += `
        <li class="d-flex gap-3 mb-3">
          <span class="${a.color}" style="font-size:18px; padding-top:2px;"><i class="fa-solid ${a.icon}"></i></span>
          <div>
            <div style="font-size:14px;">${a.text}</div>
            <small class="text-muted">${a.time}</small>
          </div>
        </li>`;
    });
    $("#activity-feed").html(html);
  }

  /* -------- بازسازی چارت‌ها هنگام تغییر تم -------- */
  $(document).on("themeChanged", function () {
    if (salesChart) salesChart.destroy();
    if (trafficChart) trafficChart.destroy();
    renderSalesChart();
    renderTrafficChart();
  });

  $(function () {
    renderSalesChart();
    renderTrafficChart();
    renderOrders();
    renderActivity();
  });
})(jQuery);
