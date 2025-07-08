// src/utils/toast.js
export const showToast = (message, type = "success") => {
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${type} border-0 show`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.style.minWidth = "250px";
  toast.style.marginBottom = "0.75rem";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;

  const root = document.getElementById("toast-root");
  root.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
};
