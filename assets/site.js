// 貓頭鷹小學堂 shared script: banner + icon tabs, footer, 嗚嗚博士 mascot, photos with credits, quiz.
(function () {
  var PAGES = [
    ["index.html", "🦉", "貓頭鷹是誰"],
    ["taiwan-owls.html", "🌳", "台灣貓頭鷹"],
    ["where.html", "🔦", "去哪裡看"],
    ["worksheet.html", "✏️", "學習單"],
    ["nocturnal.html", "🌙", "晚上的動物"],
    ["birds.html", "🐦", "台灣的鳥"],
    ["pets.html", "🏠", "可以養嗎"]
  ];
  var here = document.body.getAttribute("data-page") || "index.html";

  function owlSVG(cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 88 96" aria-hidden="true">' +
      '<path class="o-body" d="M14 18 L26 30 L62 30 L74 18 L76 70 C76 88 62 94 44 94 C26 94 12 88 12 70 Z"/>' +
      '<ellipse class="o-belly" cx="44" cy="70" rx="20" ry="20"/>' +
      '<circle class="o-face" cx="31" cy="46" r="15"/><circle class="o-face" cx="57" cy="46" r="15"/>' +
      '<circle class="o-eye" cx="31" cy="46" r="9"/><circle class="o-eye" cx="57" cy="46" r="9"/>' +
      '<circle class="o-pupil" cx="32" cy="46" r="4.5"/><circle class="o-pupil" cx="56" cy="46" r="4.5"/>' +
      '<circle cx="33.5" cy="44" r="1.6" fill="#fff"/><circle cx="57.5" cy="44" r="1.6" fill="#fff"/>' +
      '<path class="o-beak" d="M40 56 L48 56 L44 64 Z"/>' +
      '<path class="o-cap" d="M22 22 L44 6 L66 22 Z"/><rect class="o-cap" x="20" y="20" width="48" height="5" rx="2"/>' +
      '<path d="M66 22 L72 34" stroke="#ffd560" stroke-width="2.5" stroke-linecap="round"/><circle cx="72" cy="36" r="3" fill="#ffd560"/>' +
      '</svg>';
  }
  window.owlSVG = owlSVG;

  // Banner + tabs
  var stars = "";
  var pts = [[6,20],[14,60],[22,30],[31,70],[40,18],[52,52],[61,26],[70,64],[78,22],[88,48],[95,16]];
  pts.forEach(function (p) { stars += '<circle cx="' + p[0] + '%" cy="' + p[1] + '%" r="1.6" fill="#fff" opacity=".8"/>'; });
  var head = document.createElement("header");
  head.innerHTML =
    '<div class="banner"><svg class="stars" aria-hidden="true" width="100%" height="100%">' + stars +
    '</svg><svg class="moon" viewBox="0 0 40 40" aria-hidden="true"><path d="M26 3 A17 17 0 1 0 37 29 A14 14 0 1 1 26 3 Z" fill="#ffd560"/></svg>' +
    '<div class="banner-in"><a class="logo" href="index.html">' + owlSVG("") + '貓頭鷹小學堂</a></div>' +
    '<svg class="hills" viewBox="0 0 1200 46" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46 L0 26 Q150 2 300 22 T600 20 T900 18 T1200 24 L1200 46 Z"/></svg></div>';
  var nav = document.createElement("nav");
  nav.className = "tabs";
  nav.setAttribute("aria-label", "網站選單");
  PAGES.forEach(function (p) {
    var a = document.createElement("a");
    a.href = p[0];
    a.innerHTML = '<span class="ico" aria-hidden="true">' + p[1] + '</span>' + p[2];
    if (p[0] === here) a.setAttribute("aria-current", "page");
    nav.appendChild(a);
  });
  document.body.insertBefore(nav, document.body.firstChild);
  document.body.insertBefore(head, document.body.firstChild);

  var foot = document.createElement("footer");
  foot.className = "foot";
  foot.innerHTML = '<p>貓頭鷹小學堂．給國小低年級小朋友和爸爸媽媽．內容整理於 2026 年 11 月</p>' +
    '<p>動物照片來自 Wikimedia Commons，作者與授權請看<a href="credits.html">照片來源</a>。</p>';
  document.body.appendChild(foot);

  // Mascots
  document.querySelectorAll("[data-owlie]").forEach(function (el) { el.innerHTML = owlSVG("owlie"); });

  // Photos
  var P = window.PHOTOS || {};
  document.querySelectorAll("figure[data-photo]").forEach(function (fig) {
    var d = P[fig.getAttribute("data-photo")];
    if (!d) return;
    var img = document.createElement("img");
    img.src = d.src; img.alt = fig.getAttribute("data-alt") || ""; img.loading = "lazy"; img.decoding = "async";
    if (fig.getAttribute("data-pos")) img.style.objectPosition = fig.getAttribute("data-pos");
    var cap = document.createElement("figcaption");
    var a = document.createElement("a");
    a.href = d.page; a.target = "_blank"; a.rel = "noopener";
    a.textContent = "📷 " + d.by + "・" + d.lic;
    cap.appendChild(a);
    fig.appendChild(img); fig.appendChild(cap);
  });
})();

// True/false quiz. renderQuiz(boxEl, scoreEl, [[question, answerBool, explanation], ...])
function renderQuiz(box, scoreEl, items) {
  var answered = 0, correct = 0;
  items.forEach(function (q, i) {
    var div = document.createElement("div");
    div.className = "q";
    var p = document.createElement("p");
    p.textContent = (i + 1) + ". " + q[0];
    var row = document.createElement("div");
    row.className = "q-row";
    var yes = document.createElement("button");
    yes.className = "btn"; yes.type = "button"; yes.textContent = "⭕ 對";
    var no = document.createElement("button");
    no.className = "btn"; no.type = "button"; no.textContent = "❌ 錯";
    row.appendChild(yes); row.appendChild(no);
    var res = document.createElement("p");
    res.className = "result"; res.hidden = true;
    div.appendChild(p); div.appendChild(row); div.appendChild(res);
    box.appendChild(div);
    function pick(ans) {
      if (!res.hidden) return;
      var ok = ans === q[1];
      res.hidden = false;
      res.className = "result " + (ok ? "ok" : "no");
      res.textContent = (ok ? "答對了！" : "再想想～") + q[2];
      yes.disabled = true; no.disabled = true;
      answered++; if (ok) correct++;
      if (answered === items.length) {
        scoreEl.textContent = "你答對了 " + correct + " 題，共 " + items.length + " 題！" + (correct === items.length ? "🎉 你是貓頭鷹小博士！" : "再挑戰一次吧！");
      }
    }
    yes.addEventListener("click", function () { pick(true); });
    no.addEventListener("click", function () { pick(false); });
  });
}
