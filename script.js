// script.js
// print + code site helpers

(function () {
  // year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // last updated (browser date; if you want manual, replace with a string)
  const lastUpdatedEl = document.getElementById("lastUpdated");
  if (lastUpdatedEl) {
    const d = new Date();
    const opts = { year: "numeric", month: "short", day: "2-digit" };
    lastUpdatedEl.textContent = d.toLocaleDateString(undefined, opts).toLowerCase();
  }

  // copy link buttons
  const btns = document.querySelectorAll("[data-copy]");
  btns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const target = btn.getAttribute("data-copy");
      if (!target) return;

      const url = new URL(window.location.href);
      url.hash = target;

      try {
        await navigator.clipboard.writeText(url.toString());
        const original = btn.textContent;
        btn.textContent = "copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove("copied");
        }, 900);
      } catch (e) {
        // fallback for older browsers / denied clipboard
        try {
          const temp = document.createElement("input");
          temp.value = url.toString();
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);

          const original = btn.textContent;
          btn.textContent = "copied!";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove("copied");
          }, 900);
        } catch (err) {
          const original = btn.textContent;
          btn.textContent = "copy failed";
          setTimeout(() => (btn.textContent = original), 900);
        }
      }
    });
  });
})();

