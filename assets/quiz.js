// Shared true/false quiz. Usage: renderQuiz(boxEl, scoreEl, [[question, answerBool, explanation], ...], winText)
function renderQuiz(box, scoreEl, items, winText) {
  var answered = 0, correct = 0;
  items.forEach(function (q, i) {
    var div = document.createElement("div");
    div.className = "q";
    var p = document.createElement("p");
    p.innerHTML = "<b>" + (i + 1) + ".</b> ";
    p.appendChild(document.createTextNode(q[0]));
    var row = document.createElement("div");
    row.className = "q-row";
    var yes = document.createElement("button");
    yes.className = "btn"; yes.type = "button"; yes.textContent = "真的";
    var no = document.createElement("button");
    no.className = "btn"; no.type = "button"; no.textContent = "假的";
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
        scoreEl.textContent = "你答對了 " + correct + " 題，共 " + items.length + " 題！" + (correct === items.length ? (winText || "你是貓頭鷹小博士！") : "");
      }
    }
    yes.addEventListener("click", function () { pick(true); });
    no.addEventListener("click", function () { pick(false); });
  });
}
