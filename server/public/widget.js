(function() {
  // 1. Find the script tag and retrieve widget ID
  const scriptTag = document.currentScript || document.querySelector('script[data-widget-id]');
  if (!scriptTag) {
    console.error("Pingback error: Script tag not found or missing 'data-widget-id'.");
    return;
  }
  const widgetId = scriptTag.getAttribute('data-widget-id');
  if (!widgetId) {
    console.error("Pingback error: 'data-widget-id' is required.");
    return;
  }

  const API_BASE = "http://localhost:8080/api";

  // Fetch widget configuration from API
  fetch(`${API_BASE}/widgets/${widgetId}`)
    .then(res => {
      if (!res.ok) throw new Error("Widget configuration failed to load");
      return res.json();
    })
    .then(config => {
      initWidget(config);
    })
    .catch(err => {
      console.error("Pingback load error:", err);
    });

  function initWidget(config) {
    const primaryColor = config.primaryColor || "#B8FF00";
    const theme = config.theme || "dark";
    const isDark = theme === "dark";

    // Create Container
    const container = document.createElement("div");
    container.id = "pingback-widget-container";
    
    // Inject Styles
    const style = document.createElement("style");
    style.textContent = `
      #pingback-widget-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .pingback-trigger {
        width: 56px;
        height: 56px;
        border-radius: 28px;
        background-color: ${primaryColor};
        color: ${isDark ? "#0A0A23" : "#FFFFFF"};
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        border: none;
        outline: none;
      }
      .pingback-trigger:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 24px rgba(0,0,0,0.2);
      }
      .pingback-trigger svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
        transition: transform 0.2s;
      }
      .pingback-trigger.open svg {
        transform: rotate(90deg);
      }
      .pingback-card {
        width: 320px;
        background-color: ${isDark ? "#12132D" : "#FFFFFF"};
        color: ${isDark ? "#F2F2F2" : "#2B2D42"};
        border: 1px solid ${isDark ? "#2B2D42" : "#E2E8F0"};
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
        margin-bottom: 16px;
        display: none;
        flex-direction: column;
        overflow: hidden;
        animation: pingback-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .pingback-card.open {
        display: flex;
      }
      .pingback-header {
        padding: 16px;
        border-b: 1px solid ${isDark ? "#2B2D42" : "#E2E8F0"};
        font-weight: 600;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .pingback-body {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .pingback-textarea {
        width: 100%;
        height: 100px;
        padding: 10px;
        border: 1px solid ${isDark ? "#2B2D42" : "#CBD5E1"};
        background-color: ${isDark ? "#0A0A23" : "#F8FAFC"};
        color: ${isDark ? "#F2F2F2" : "#2B2D42"};
        border-radius: 6px;
        resize: none;
        font-size: 14px;
        box-sizing: border-box;
        outline: none;
        transition: border-color 0.2s;
      }
      .pingback-textarea:focus {
        border-color: ${primaryColor};
      }
      .pingback-submit {
        background-color: ${primaryColor};
        color: ${isDark ? "#0A0A23" : "#FFFFFF"};
        border: none;
        border-radius: 6px;
        padding: 10px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: opacity 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pingback-submit:hover {
        opacity: 0.9;
      }
      .pingback-submit:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .pingback-success {
        display: none;
        padding: 32px 16px;
        text-align: center;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
      .pingback-success svg {
        width: 48px;
        height: 48px;
        fill: ${primaryColor};
      }
      @keyframes pingback-slide-up {
        from {
          opacity: 0;
          transform: translateY(10px) scale(0.98);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    `;
    document.head.appendChild(style);

    // Create the widget DOM structure
    container.innerHTML = `
      <div class="pingback-card" id="pingback-card">
        <div class="pingback-header">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="${primaryColor}"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
          <span>Send Feedback</span>
        </div>
        <div class="pingback-body" id="pingback-form-body">
          <textarea class="pingback-textarea" id="pingback-textarea" placeholder="What's on your mind?"></textarea>
          <button class="pingback-submit" id="pingback-submit">Submit Feedback</button>
        </div>
        <div class="pingback-success" id="pingback-success-body">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <div style="font-weight: 600; font-size: 16px;">Thank You!</div>
          <div style="font-size: 13px; opacity: 0.8;">Your feedback has been submitted anonymously.</div>
        </div>
      </div>
      <button class="pingback-trigger" id="pingback-trigger">
        <svg viewBox="0 0 24 24" id="pingback-icon-open"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
        <svg viewBox="0 0 24 24" id="pingback-icon-close" style="display: none;"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
    `;

    document.body.appendChild(container);

    const trigger = document.getElementById("pingback-trigger");
    const card = document.getElementById("pingback-card");
    const submitBtn = document.getElementById("pingback-submit");
    const textarea = document.getElementById("pingback-textarea");
    const formBody = document.getElementById("pingback-form-body");
    const successBody = document.getElementById("pingback-success-body");
    const iconOpen = document.getElementById("pingback-icon-open");
    const iconClose = document.getElementById("pingback-icon-close");

    // Toggle logic
    trigger.addEventListener("click", () => {
      const isOpen = card.classList.toggle("open");
      trigger.classList.toggle("open", isOpen);
      
      if (isOpen) {
        iconOpen.style.display = "none";
        iconClose.style.display = "block";
        textarea.focus();
      } else {
        iconOpen.style.display = "block";
        iconClose.style.display = "none";
      }
    });

    // Submit logic
    submitBtn.addEventListener("click", () => {
      const content = textarea.value.trim();
      if (!content) return;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      fetch(`${API_BASE}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          widgetId: widgetId,
          content: content
        })
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to submit feedback");
        return res.json();
      })
      .then(() => {
        // Show success screen
        formBody.style.display = "none";
        successBody.style.display = "flex";
        
        // Reset card after 3 seconds
        setTimeout(() => {
          card.classList.remove("open");
          trigger.classList.remove("open");
          iconOpen.style.display = "block";
          iconClose.style.display = "none";
          
          // Reset form state
          setTimeout(() => {
            textarea.value = "";
            formBody.style.display = "flex";
            successBody.style.display = "none";
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Feedback";
          }, 300);
        }, 3000);
      })
      .catch(err => {
        console.error("Submission error:", err);
        submitBtn.disabled = false;
        submitBtn.textContent = "Error! Try Again";
      });
    });
  }
})();
