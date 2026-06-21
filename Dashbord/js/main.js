/* ============================================
   اسکریپت مشترک داشبورد
   مدیریت sidebar، تم، احراز هویت ساده
   نیازمند jQuery
   ============================================ */

(function ($) {
  "use strict";

  /* -------- مدیریت تم (روشن/تاریک) -------- */
  function applyTheme() {
    const theme = localStorage.getItem("dash-theme") || "light";
    if (theme === "dark") {
      $("body").addClass("dark-mode");
      $(".theme-toggle i").removeClass("fa-moon").addClass("fa-sun");
    } else {
      $("body").removeClass("dark-mode");
      $(".theme-toggle i").removeClass("fa-sun").addClass("fa-moon");
    }
  }

  function toggleTheme() {
    const isDark = $("body").hasClass("dark-mode");
    localStorage.setItem("dash-theme", isDark ? "light" : "dark");
    applyTheme();
    // اطلاع‌رسانی به چارت‌ها برای رنگ‌آمیزی مجدد
    $(document).trigger("themeChanged");
  }

  /* -------- مدیریت وضعیت سایدبار -------- */
  function applySidebarState() {
    if (window.innerWidth > 991) {
      const collapsed = localStorage.getItem("dash-sidebar") === "collapsed";
      $("body").toggleClass("sidebar-collapsed", collapsed);
    }
  }

  function toggleSidebar() {
    if (window.innerWidth <= 991) {
      // موبایل: باز/بسته شدن کشویی
      $("body").toggleClass("sidebar-open");
    } else {
      // دسکتاپ: جمع/باز شدن
      $("body").toggleClass("sidebar-collapsed");
      localStorage.setItem(
        "dash-sidebar",
        $("body").hasClass("sidebar-collapsed") ? "collapsed" : "expanded"
      );
    }
  }

  /* -------- احراز هویت ساده (سمت کلاینت) -------- */
  window.DashAuth = {
    login: function (user) {
      localStorage.setItem("dash-user", JSON.stringify(user));
    },
    logout: function () {
      localStorage.removeItem("dash-user");
      window.location.href = "index.html";
    },
    getUser: function () {
      try {
        return JSON.parse(localStorage.getItem("dash-user"));
      } catch (e) {
        return null;
      }
    },
    isLoggedIn: function () {
      return !!localStorage.getItem("dash-user");
    },
    // گارد: اگر لاگین نباشد به صفحه ورود می‌فرستد
    guard: function () {
      if (!this.isLoggedIn()) {
        window.location.href = "index.html";
      }
    },
  };

  /* -------- درج تاریخ شمسی ساده در topbar -------- */
  function setGreeting() {
    const user = window.DashAuth.getUser();
    if (user && $(".welcome-name").length) {
      $(".welcome-name").text(user.name || "کاربر");
    }
    if (user && $(".user-display-name").length) {
      $(".user-display-name").text(user.name || "کاربر");
    }
  }

  /* -------- مقداردهی اولیه -------- */
  $(function () {
    applyTheme();
    applySidebarState();
    setGreeting();

    // دکمه همبرگری
    $(document).on("click", ".btn-toggle", function () {
      toggleSidebar();
    });

    // کلیک روی overlay برای بستن منوی موبایل
    $(document).on("click", ".sidebar-overlay", function () {
      $("body").removeClass("sidebar-open");
    });

    // تغییر تم
    $(document).on("click", ".theme-toggle", function (e) {
      e.preventDefault();
      toggleTheme();
    });

    // خروج
    $(document).on("click", ".logout-btn", function (e) {
      e.preventDefault();
      window.DashAuth.logout();
    });

    // واکنش به تغییر اندازه صفحه
    $(window).on("resize", function () {
      if (window.innerWidth > 991) {
        $("body").removeClass("sidebar-open");
        applySidebarState();
      }
    });

    // افزودن کلاس انیمیشن
    $(".page-area").addClass("fade-in");
  });
})(jQuery);
