/* LocalCreators — landing page script
   Email capture: wired to the real Mailchimp list via JSONP.
   No page navigation, no new tab — signup happens in-page and the
   user gets a toast confirmation. */

/* ─────────────────────────────────────────────────────────────
   MAILCHIMP — wired to the user's real list (27 Nov 2026)
   Form action (from the supplied embed code):
     https://gmail.us6.list-manage.com/subscribe/post?u=1cef3766ef227139e3c699e85&id=536a3e4923&f_id=00d480e5f0
   JSONP endpoint used below (same u/id, post-json instead of post):
     https://gmail.us6.list-manage.com/subscribe/post-json?u=1cef3766ef227139e3c699e85&id=536a3e4923
   SOURCE_TAG = "LocalCreators" is sent as the hidden SOURCE merge
   field, so signups from this page are labelled in Mailchimp.
   Honeypot field b_1cef3766ef227139e3c699e85_536a3e4923 is sent empty.
   mc-validate.js and the SMS-phone code from the embed were NOT
   included — they are not needed for this form.
   ───────────────────────────────────────────────────────────── */
const MAILCHIMP_FORM_ACTION = "https://gmail.us6.list-manage.com/subscribe/post?u=1cef3766ef227139e3c699e85&id=536a3e4923&f_id=00d480e5f0";
const MAILCHIMP_JSON_URL = "https://gmail.us6.list-manage.com/subscribe/post-json?u=1cef3766ef227139e3c699e85&id=536a3e4923";
const MAILCHIMP_HONEYPOT = "b_1cef3766ef227139e3c699e85_536a3e4923";
const SOURCE_TAG = "LocalCreators";

(function () {
  "use strict";

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll(".count");
  var animateCount = function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var start = null;
    var dur = 1400;
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- Animated stat bars ---------- */
  var bars = document.querySelectorAll(".bar-fill");
  if ("IntersectionObserver" in window) {
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute("data-width") + "%";
          bio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (el) { bio.observe(el); });
  } else {
    bars.forEach(function (el) { el.style.width = el.getAttribute("data-width") + "%"; });
  }

  /* ---------- Suburb picker (example bundles) ---------- */
  var SUBURBS = {
    surry: {
      name: "Surry Hills bundle",
      desc: "Brunch cafés, wine bars and boutiques on Crown Street — food and lifestyle creators whose followers brunch here every weekend.",
      tags: ["🍳 Food & brunch", "🍷 Wine bars", "🛍️ Boutiques", "📸 Lifestyle"]
    },
    newtown: {
      name: "Newtown bundle",
      desc: "King Street's vintage shops, live music rooms and late-night eats — creators who live the strip and post it daily.",
      tags: ["🎸 Live music", "👗 Vintage & thrift", "🌮 Late-night eats", "🎨 Arts & culture"]
    },
    bankstown: {
      name: "Bankstown bundle",
      desc: "One of Sydney's great food streets — halal restaurants, grocers and family businesses, with creators whose audiences shop here weekly.",
      tags: ["🍢 Halal eats", "🛒 Grocers & markets", "👗 Modest fashion", "👨‍👩‍👧 Family businesses"]
    },
    bondi: {
      name: "Bondi bundle",
      desc: "Beach cafés, surf shops and wellness studios — fitness and lifestyle creators with followers who live the Bondi routine.",
      tags: ["🏄 Surf & beach", "🥗 Wellness cafés", "🧘 Studios & gyms", "👙 Swimwear"]
    },
    parramatta: {
      name: "Parramatta bundle",
      desc: "Sydney's second CBD — eat streets, dessert bars and growing retail, with creators reaching Western Sydney's young families.",
      tags: ["🍜 Eat Street", "🍰 Dessert bars", "🛍️ Retail", "👨‍👩‍👧 Young families"]
    },
    manly: {
      name: "Manly bundle",
      desc: "Beachfront cafés, surf schools and weekend markets — creators whose followers plan their weekends around the ferry.",
      tags: ["🏖️ Beach cafés", "🏄 Surf schools", "🧺 Weekend markets", "🚲 Outdoor & active"]
    }
  };
  var suburbBtns = document.querySelectorAll(".suburb-btn");
  var subName = document.getElementById("suburb-name");
  var subDesc = document.getElementById("suburb-desc");
  var subTags = document.getElementById("suburb-tags");
  suburbBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      suburbBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var data = SUBURBS[btn.getAttribute("data-suburb")];
      if (!data) return;
      subName.textContent = data.name;
      subDesc.textContent = data.desc;
      subTags.innerHTML = "";
      data.tags.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        subTags.appendChild(li);
      });
    });
  });

  /* ---------- Toast ---------- */
  var toast = document.getElementById("toast");
  var toastMsg = toast ? toast.querySelector(".toast-msg") : null;
  var toastClose = toast ? toast.querySelector(".toast-close") : null;
  var toastTimer = null;

  function showToast(message, type) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.remove("error", "show");
    toast.hidden = false;
    if (type === "error") toast.classList.add("error");
    void toast.offsetWidth; // reflow so the slide-up replays on repeat toasts
    toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 6000);
  }

  function hideToast() {
    if (!toast) return;
    toast.classList.remove("show");
    if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; }
    setTimeout(function () { if (toast) toast.hidden = true; }, 300);
  }

  if (toastClose) toastClose.addEventListener("click", hideToast);

  /* ---------- Email capture (Mailchimp JSONP) ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var submittedEmails = {};

  function storeLocally(email, source) {
    try {
      var key = "localcreators_waitlist";
      var list = JSON.parse(localStorage.getItem(key) || "[]");
      if (list.indexOf(email) === -1) list.push(email);
      localStorage.setItem(key, JSON.stringify(list));
      localStorage.setItem("localcreators_waitlist_source", source);
    } catch (e) { /* storage unavailable — ignore */ }
  }

  function submitToMailchimp(email) {
    // JSONP against Mailchimp's post-json endpoint: no navigation, no new
    // tab, and a real success/error response we can show in the toast.
    return new Promise(function (resolve, reject) {
      var cbName = "mcCb_" + Date.now() + "_" + Math.floor(Math.random() * 1e9);
      var script = document.createElement("script");
      var done = false;
      var timer = setTimeout(function () { finish(new Error("timeout")); }, 10000);

      function finish(err, data) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        try { delete window[cbName]; } catch (e) { window[cbName] = undefined; }
        if (script.parentNode) script.parentNode.removeChild(script);
        if (err) reject(err);
        else resolve(data);
      }

      window[cbName] = function (data) { finish(null, data); };
      script.onerror = function () { finish(new Error("network")); };
      var src = MAILCHIMP_JSON_URL +
        "&EMAIL=" + encodeURIComponent(email) +
        "&SOURCE=" + encodeURIComponent(SOURCE_TAG) +
        "&" + MAILCHIMP_HONEYPOT + "=" +
        "&c=" + cbName;
      script.src = src;
      document.body.appendChild(script);
    });
  }

  document.querySelectorAll("[data-capture-form]").forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var msg = form.querySelector(".form-msg");
    var button = form.querySelector('button[type="submit"]');
    var originalText = button.textContent;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (input.value || "").trim().toLowerCase();
      msg.className = "form-msg";
      input.classList.remove("error");
      if (!EMAIL_RE.test(email)) {
        msg.textContent = "Please enter a valid email address — e.g. you@yourcafe.com.au";
        msg.classList.add("bad");
        input.classList.add("error");
        input.focus();
        return;
      }
      if (submittedEmails[email]) {
        showToast("You're already on the list — we'll be in touch once the app is ready.", "success");
        return;
      }
      button.disabled = true;
      button.textContent = "Joining…";
      submitToMailchimp(email).then(function (data) {
        var ok = data && data.result === "success";
        var already = data && typeof data.msg === "string" &&
          data.msg.toLowerCase().indexOf("already subscribed") !== -1;
        if (!ok && !already) throw new Error(data && data.msg ? data.msg : "mailchimp error");
        submittedEmails[email] = true;
        storeLocally(email, SOURCE_TAG);
        msg.textContent = "You're on the list! We'll be in touch once the app is ready.";
        msg.classList.add("ok");
        button.textContent = "You're on the list ✓";
        input.value = "";
        input.placeholder = "You're on the waitlist";
        showToast("You're on the list! We'll be in touch once the app is ready.", "success");
      }).catch(function () {
        button.disabled = false;
        button.textContent = originalText;
        msg.textContent = "Something went wrong — please try again.";
        msg.classList.add("bad");
        showToast("Something went wrong — please try again.", "error");
      });
    });
  });

  /* ---------- Leaderboard bars ---------- */
  var boardBars = document.querySelectorAll(".board-bar i");
  function fillBars() {
    boardBars.forEach(function (el) {
      el.style.width = el.getAttribute("data-width") + "%";
    });
  }
  if ("IntersectionObserver" in window) {
    var bbo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute("data-width") + "%";
          bbo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    boardBars.forEach(function (el) { bbo.observe(el); });
  } else {
    fillBars();
  }

  /* ---------- Filter chips (leaderboard + creator cards) ---------- */
  function bindFilter(btnAttr, rowSelector, hideClass) {
    var btns = document.querySelectorAll("[" + btnAttr + "]");
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var f = btn.getAttribute(btnAttr);
        document.querySelectorAll(rowSelector).forEach(function (row) {
          var show = f === "all" || row.getAttribute("data-cat") === f;
          row.classList.toggle(hideClass, !show);
        });
      });
    });
  }
  bindFilter("data-board-filter", ".board-row", "hidden-row");
  bindFilter("data-creator-filter", ".creator-card", "hidden-card");

  /* ---------- Creator bottom sheet ---------- */
  var sheet = document.getElementById("creator-sheet");
  var backdrop = document.getElementById("sheet-backdrop");
  var sheetClose = document.getElementById("sheet-close");
  var sheetCta = document.getElementById("sheet-cta");

  function openSheet(card) {
    if (!sheet || !backdrop) return;
    var d = card.dataset;
    document.getElementById("sheet-handle").textContent = d.handle || "";
    document.getElementById("sheet-sub").textContent = (d.suburb || "") + " · " + (d.niche || "");
    document.getElementById("sheet-followers").textContent = d.followers || "";
    document.getElementById("sheet-engagement").textContent = d.engagement || "";
    document.getElementById("sheet-briefs").textContent = d.briefs || "";
    document.getElementById("sheet-views").textContent = d.views || "";
    var img = document.getElementById("sheet-img");
    if (img && d.img) {
      img.src = d.img;
      img.alt = d.alt || "";
    }
    sheet.hidden = false;
    backdrop.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        sheet.classList.add("open");
        backdrop.classList.add("open");
      });
    });
    document.body.style.overflow = "hidden";
  }

  function closeSheet() {
    if (!sheet || !backdrop) return;
    sheet.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(function () {
      sheet.hidden = true;
      backdrop.hidden = true;
    }, 320);
  }

  document.querySelectorAll(".creator-card").forEach(function (card) {
    card.addEventListener("click", function () { openSheet(card); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openSheet(card); }
    });
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
  });
  if (sheetClose) sheetClose.addEventListener("click", closeSheet);
  if (backdrop) backdrop.addEventListener("click", closeSheet);
  if (sheetCta) sheetCta.addEventListener("click", closeSheet);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sheet && sheet.classList.contains("open")) closeSheet();
  });

  /* ---------- Sticky mobile CTA dismiss ---------- */
  var mcta = document.getElementById("mobile-cta");
  var mctaClose = document.getElementById("mobile-cta-close");
  if (mcta) document.body.classList.add("has-mobile-cta");
  if (mctaClose && mcta) {
    mctaClose.addEventListener("click", function () {
      mcta.classList.add("gone");
      document.body.classList.add("cta-dismissed");
    });
  }
})();
