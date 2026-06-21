/* ============================================
   مدیریت کاربران - CRUD کامل با RESTful Table API
   ============================================ */

(function ($) {
  "use strict";

  const TABLE = "users";
  let allUsers = [];
  let modal;

  const statusMap = {
    active: { text: "فعال", cls: "status-active" },
    pending: { text: "در انتظار", cls: "status-pending" },
    inactive: { text: "غیرفعال", cls: "status-inactive" },
  };

  /* -------- دریافت کاربران از API -------- */
  function loadUsers() {
    $("#users-table").html(
      '<tr><td colspan="5" class="text-center text-muted py-4"><span class="spinner-border spinner-border-sm ms-2"></span> در حال بارگذاری...</td></tr>'
    );
    $.getJSON(`tables/${TABLE}?limit=100`)
      .done(function (res) {
        allUsers = (res.data || []).filter((u) => !u.deleted);
        renderUsers();
      })
      .fail(function () {
        $("#users-table").html(
          '<tr><td colspan="5" class="text-center text-danger py-4">خطا در بارگذاری داده‌ها</td></tr>'
        );
      });
  }

  /* -------- نمایش لیست با فیلتر -------- */
  function renderUsers() {
    const q = $("#search-input").val().toLowerCase().trim();
    const status = $("#filter-status").val();

    const filtered = allUsers.filter((u) => {
      const matchQ =
        !q ||
        (u.name && u.name.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q));
      const matchS = !status || u.status === status;
      return matchQ && matchS;
    });

    $("#total-count").text(filtered.length);

    if (filtered.length === 0) {
      $("#users-table").html(
        '<tr><td colspan="5" class="text-center text-muted py-4">کاربری یافت نشد</td></tr>'
      );
      return;
    }

    let html = "";
    filtered.forEach((u) => {
      const s = statusMap[u.status] || statusMap.active;
      const avatar = u.avatar || 1;
      html += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <img src="https://i.pravatar.cc/80?img=${avatar}" class="avatar-sm" alt="">
              <div>
                <div class="fw-semibold">${escapeHtml(u.name)}</div>
                <small class="text-muted">${escapeHtml(u.email)}</small>
              </div>
            </div>
          </td>
          <td>${escapeHtml(u.role || "کاربر")}</td>
          <td dir="ltr" class="text-end">${escapeHtml(u.phone || "—")}</td>
          <td><span class="status-pill ${s.cls}">${s.text}</span></td>
          <td class="text-start">
            <button class="btn btn-sm btn-light border edit-btn" data-id="${u.id}" title="ویرایش">
              <i class="fa-solid fa-pen text-primary"></i>
            </button>
            <button class="btn btn-sm btn-light border delete-btn" data-id="${u.id}" title="حذف">
              <i class="fa-solid fa-trash text-danger"></i>
            </button>
          </td>
        </tr>`;
    });
    $("#users-table").html(html);
  }

  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* -------- باز کردن مودال افزودن -------- */
  function openAdd() {
    $("#modal-title").text("کاربر جدید");
    $("#user-id").val("");
    $("#user-form")[0].reset();
    $("#user-role").val("کاربر");
    $("#user-status").val("active");
  }

  /* -------- باز کردن مودال ویرایش -------- */
  function openEdit(id) {
    const u = allUsers.find((x) => x.id === id);
    if (!u) return;
    $("#modal-title").text("ویرایش کاربر");
    $("#user-id").val(u.id);
    $("#user-name").val(u.name);
    $("#user-email").val(u.email);
    $("#user-phone").val(u.phone || "");
    $("#user-role").val(u.role || "کاربر");
    $("#user-status").val(u.status || "active");
    modal.show();
  }

  /* -------- ذخیره (افزودن یا ویرایش) -------- */
  function saveUser(e) {
    e.preventDefault();
    const id = $("#user-id").val();
    const payload = {
      name: $("#user-name").val().trim(),
      email: $("#user-email").val().trim(),
      phone: $("#user-phone").val().trim(),
      role: $("#user-role").val(),
      status: $("#user-status").val(),
    };
    if (!payload.name || !payload.email) return;

    const btn = $("#save-user-btn");
    btn.prop("disabled", true).html('<span class="spinner-border spinner-border-sm"></span>');

    let req;
    if (id) {
      req = $.ajax({
        url: `tables/${TABLE}/${id}`,
        method: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(payload),
      });
    } else {
      payload.avatar = Math.floor(Math.random() * 60) + 1;
      req = $.ajax({
        url: `tables/${TABLE}`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
      });
    }

    req
      .done(function () {
        modal.hide();
        loadUsers();
      })
      .fail(function () {
        alert("خطا در ذخیره کاربر");
      })
      .always(function () {
        btn.prop("disabled", false).text("ذخیره");
      });
  }

  /* -------- حذف کاربر -------- */
  function deleteUser(id) {
    const u = allUsers.find((x) => x.id === id);
    if (!u) return;
    if (!confirm(`آیا از حذف «${u.name}» مطمئن هستید؟`)) return;

    $.ajax({ url: `tables/${TABLE}/${id}`, method: "DELETE" })
      .done(function () {
        loadUsers();
      })
      .fail(function () {
        alert("خطا در حذف کاربر");
      });
  }

  /* -------- مقداردهی اولیه -------- */
  $(function () {
    modal = new bootstrap.Modal(document.getElementById("userModal"));

    loadUsers();

    $("#add-user-btn").on("click", openAdd);
    $("#user-form").on("submit", saveUser);
    $("#search-input, #filter-status").on("input change", renderUsers);

    $(document).on("click", ".edit-btn", function () {
      openEdit($(this).data("id"));
    });
    $(document).on("click", ".delete-btn", function () {
      deleteUser($(this).data("id"));
    });
  });
})(jQuery);
