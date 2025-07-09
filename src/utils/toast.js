// src/utils/toast.js

export const showToast = (message, type = "success") => {
  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast align-items-center text-white bg-${type} border-0 show`;
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.style.minWidth = "250px";
  toast.style.marginBottom = "0.75rem";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  toast.style.borderRadius = "0.5rem";
  toast.style.zIndex = "9999";

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body fw-medium">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  // Find or create toast container
  let toastRoot = document.getElementById("toast-root");
  if (!toastRoot) {
    toastRoot = document.createElement("div");
    toastRoot.id = "toast-root";
    toastRoot.className = "position-fixed bottom-0 end-0 p-3";
    toastRoot.style.zIndex = "1060";
    document.body.appendChild(toastRoot);
  }

  toastRoot.appendChild(toast);

  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};
