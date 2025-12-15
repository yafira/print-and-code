// small helpers only

const byId = (id) => document.getElementById(id);

(function setFooterYear() {
  const y = byId("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();

(function setLastUpdated() {
  const el = byId("lastUpdated");
  if (!el) return;
  // local-friendly; you can hardcode a date later if you prefer
  el.textContent = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
})();

(function copyLinkButtons() {
  const buttons = document.querySelectorAll("[data-copy]");
  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const hash = btn.getAttribute("data-copy");
      const url = `${window.location.origin}${window.location.pathname}${hash}`;
      try {
        await navigator.clipboard.writeText(url);
        btn.textContent = "copied!";
        setTimeout(() => (btn.textContent = "copy link"), 900);
      } catch (e) {
        // fallback if clipboard blocked
        window.location.hash = hash;
      }
    });
  });
})();
