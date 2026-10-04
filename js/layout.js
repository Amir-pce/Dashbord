/* ============================================
   رندر سایدبار و topbar مشترک در همه صفحات
   صفحه فعال با data-page روی <body> مشخص می‌شود
   ============================================ */

(function ($) {
  "use strict";

  const menuItems = [
    { type: "title", label: "اصلی" },
    { key: "dashboard", label: "داشبورد", icon: "fa-gauge-high", href: "dashboard.html" },
    { key: "analytics", label: "تحلیل و آمار", icon: "fa-chart-pie", href: "analytics.html" },
    { type: "title", label: "مدیریت" },
    { key: "users", label: "کاربران", icon: "fa-users", href: "users.html", badge: "12" },
    { key: "products", label: "محصولات", icon: "fa-box", href: "products.html" },
    { key: "orders", label: "سفارش‌ها", icon: "fa-cart-shopping", href: "orders.html", badge: "نو", badgeClass: "bg-success" },
    { type: "title", label: "حساب" },
    { key: "profile", label: "پروفایل", icon: "fa-user", href: "profile.html" },
    { key: "settings", label: "تنظیمات", icon: "fa-gear", href: "settings.html" },
  ];

  function buildSidebar(active) {
    let html = `
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo-icon"><i class="fa-solid fa-layer-group"></i></div>
          <div class="logo-text">پنل مدیریت</div>
        </div>
        <ul class="sidebar-menu">`;

    menuItems.forEach((item) => {
      if (item.type === "title") {
        html += `<li class="menu-title">${item.label}</li>`;
      } else {
        const isActive = item.key === active ? "active" : "";
        const badge = item.badge
          ? `<span class="badge ${item.badgeClass || "bg-primary"} rounded-pill">${item.badge}</span>`
          : "";
        html += `
          <li>
            <a href="${item.href}" class="${isActive}">
              <i class="fa-solid ${item.icon}"></i>
              <span>${item.label}</span>
              ${badge}
            </a>
          </li>`;
      }
    });

    const user = (window.DashAuth && window.DashAuth.getUser()) || {
      name: "علی رضایی",
      role: "مدیر سیستم",
    };

    html += `
        </ul>
        <div class="sidebar-footer">
          <div class="user-mini">
            <img src="https://i.pravatar.cc/100?img=12" alt="آواتار کاربر">
            <div>
              <div class="name">${user.name || "علی رضایی"}</div>
              <div class="role">${user.role || "مدیر سیستم"}</div>
            </div>
          </div>
        </div>
      </aside>
      <div class="sidebar-overlay"></div>`;
    return html;
  }

  function buildTopbar(title) {
    return `
      <header class="topbar">
        <button class="btn-toggle" aria-label="باز و بسته کردن منو">
          <i class="fa-solid fa-bars"></i>
        </button>
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="جستجو...">
        </div>
        <div class="topbar-actions">
          <button class="icon-btn theme-toggle" title="تغییر تم" aria-label="تغییر تم">
            <i class="fa-solid fa-moon"></i>
          </button>
          <button class="icon-btn" title="پیام‌ها" aria-label="پیام‌ها">
            <i class="fa-solid fa-envelope"></i><span class="dot"></span>
          </button>
          <button class="icon-btn" title="اعلان‌ها" aria-label="اعلان‌ها"
                  data-bs-toggle="dropdown">
            <i class="fa-solid fa-bell"></i><span class="dot"></span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-2" style="min-width:300px;">
            <li class="px-2 py-1 fw-bold">اعلان‌ها</li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item rounded py-2" href="#"><i class="fa-solid fa-user-plus text-primary ms-2"></i> کاربر جدید ثبت‌نام کرد</a></li>
            <li><a class="dropdown-item rounded py-2" href="#"><i class="fa-solid fa-cart-shopping text-success ms-2"></i> سفارش جدید دریافت شد</a></li>
            <li><a class="dropdown-item rounded py-2" href="#"><i class="fa-solid fa-triangle-exclamation text-warning ms-2"></i> موجودی محصول کم شد</a></li>
          </ul>
          <div class="user-dropdown dropdown">
            <img src="https://i.pravatar.cc/100?img=12" alt="پروفایل" data-bs-toggle="dropdown">
            <ul class="dropdown-menu dropdown-menu-end shadow border-0 p-2">
              <li class="px-3 py-2">
                <div class="fw-bold user-display-name">علی رضایی</div>
                <small class="text-muted">admin@panel.ir</small>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item rounded py-2" href="profile.html"><i class="fa-solid fa-user ms-2"></i> پروفایل من</a></li>
              <li><a class="dropdown-item rounded py-2" href="settings.html"><i class="fa-solid fa-gear ms-2"></i> تنظیمات</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item rounded py-2 text-danger logout-btn" href="#"><i class="fa-solid fa-right-from-bracket ms-2"></i> خروج</a></li>
            </ul>
          </div>
        </div>
      </header>`;
  }

  // اجرای رندر هنگام بارگذاری
  $(function () {
    const active = $("body").data("page");
    if ($("#sidebar-mount").length) {
      $("#sidebar-mount").html(buildSidebar(active));
    }
    if ($("#topbar-mount").length) {
      $("#topbar-mount").html(buildTopbar());
    }
    // بعد از رندر، نام کاربر را به‌روزرسانی کن
    const user = window.DashAuth && window.DashAuth.getUser();
    if (user) {
      $(".user-display-name").text(user.name || "کاربر");
    }
  });
})(jQuery);
