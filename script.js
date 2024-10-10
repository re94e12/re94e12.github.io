let languaje = ((window.navigator.language || navigator.browserLanguage) || 'es').slice(0, 2);

async function minilib() {

  (()=>{
    let contentTrue = []
      , filter = sessionStorage.filter
      , hostfilter = [];
    filtra = (f)=>{
      f.forEach(i=>{
        r = document.querySelector('main img[src="' + i + '"]')
        r && (r.src = imgB64(null, 'hidden'))
      }
      )
    }
    const urlRegex = /\b(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*\b/g;
    xm = document.querySelector('main').innerHTML.match(urlRegex)
    xm && (xm.forEach(url=>{
      if (hostfilter.includes(((new URL(url)).hostname).replace(/(www.)/gim, ''))) {
        contentTrue.push(url)
      }
    }
    ));
    filter === undefined && (sessionStorage.filter = false,
    contentTrue.length > 0 && (confirma((l = {
      es: 'Hay imágenes de contenido inapropiado. Desea ocultarlo.',
      en: ''
    },
    l[languaje] || l['en']), ()=>{
      sessionStorage.filter = true;
      document.querySelector('.select').click()
    }
    )))
    filter && (filtra(contentTrue))
  }
  )(),

  document.querySelectorAll("pre").forEach(e=>{
    r = "",
    e.innerHTML.trim().split("\n").forEach((e,t)=>{
      r += `\n<span>${t + 1}</span>${e}`
    }
    ),
    e.innerHTML = r.trim()
  }
  ),

  document.querySelectorAll("img").forEach(e=>{
    e.onload = function() {
      -1 == e.src.indexOf("data:image/png") && (0 == this.classList.length || this.classList.contains("margin")) && ((j = new Image).src = e.src,
      j.onload = function() {
        let t = document.createElement("canvas");
        t.className = e.className;
        let i = this.width
          , n = this.height;
        t.width = i,
        t.height = n;
        let o = t.getContext("2d");
        o.drawImage(e, 0, 0, i, n),
        o.fillStyle = "rgba(0,0,0,.6)",
        o.fillRect(0, n - i / 12, i, i / 12),
        o.font = `${i / 20}px asap`,
        o.fillStyle = "#fff",
        o.textBaseline = "top",
        o.fillText(new URL(e.src).origin, i / 95, n - i / 16, i - 15),
        e.after(t),
        e.remove(),
        j.remove()
      }
      )
    }
    ,
    e.classList.contains("mini") && (e.onclick = function() {
      $img_open = this;
      let e = document.createElement("div");
      e.className = "view full",
      e.innerHTML = `<a>\xd7</a><div class="full"><img onerror="placeholder(this)" src="${this.src}" class="full" alt="${this.alt}"></div><div class="box"><p>${this.alt || "Sin info"}</p><b>${new URL(this.src).hostname || window.location.hostname || "mini-app"}</b></div>`,
      e.onclick = function() {
        this.remove()
      }
      ,
      e.ondragstart = ()=>!1,
      e.onpointerdown = function() {
        $pi = event.clientX,
        e.setPointerCapture(event.pointerId),
        e.onpointerup = function(e) {
          if ($pi > e.clientX + 150) {
            let t = $img_open.nextElementSibling;
            t && t.classList.contains("mini") && (this.remove(),
            t.click())
          }
          if ($pi + 150 < e.clientX) {
            let i = $img_open.previousElementSibling;
            i && i.classList.contains("mini") && (this.remove(),
            i.click())
          }
        }
      }
      ,
      document.body.append(e)
    }
    )
  }
  )
}
toast = (e,t,i)=>{
  if (e) {
    let n = document.querySelector(".toast");
    n = n ? n.getBoundingClientRect().bottom + 5 : 50;
    let o = document.createElement("app-element");
    o.innerHTML = e,
    o.classList.add("toast", i || "df"),
    o.style.top = n + "px",
    o.onclick = function() {
      this.remove()
    }
    ,
    document.body.prepend(o),
    setTimeout(function() {
      o.remove()
    }, 1e3 * (t || 3))
  }
}

imgB64 = (color,text)=>{
  let i = document.createElement("canvas")
    , $ = i.getContext("2d");
  return (i.width = 800,
  i.height = 500,
  $.fillStyle = color || "#0002",
  $.fillRect(0, 0, i.width, i.height),
  $.font = "900 90px asap",
  $.fillStyle = "#fff",
  $.textAlign = "center",
  $.textBaseline = "middle",
  $.fillText(text || "imgB64", i.width / 2, i.height / 2),
  i.toDataURL())
}
confirma = (t,c)=>{
  $confirma = document.createElement('dialog')
  $confirma.className = 'alert'
  $confirma.innerHTML = `<div>${t}</div><button class="acepta">Aceptar</button><b>×</b>`
  $confirma.onclick = function() {
    this.remove()
  }
  document.body.append($confirma)
  $confirma.showModal()
  if (c) {
    $confirma.querySelector('.acepta').onclick = function() {
      $confirma.remove()
      c()
    }
  }
}
,
window.addEventListener("load", ()=>{

  (function(e) {
    if (e) {
      let t, i, n = (new Date().getTime() - new Date(e.dataset.time || new Date).getTime()) / 1e3, o = Math.floor(n / 60), l = Math.floor(o / 60), a = Math.floor(l / 24), s = Math.floor(a / 30), c = Math.floor(s / 12);
      i = c > 0 ? [c, "year"] : s > 0 ? [s, "month"] : a > 0 ? [a, "day"] : l > 0 ? [l, "hour"] : o > 0 ? [o, "minutes"] : [0, "second"];
      try {
        t = new Intl.RelativeTimeFormat(window.navigator.language || navigator.browserLanguage,{
          numeric: "auto",
          style: "long"
        }).format(-1 * i[0], i[1]),
        n < 0 && (t = "--")
      } catch (m) {}
      e.innerHTML = t
    }
  }
  )(document.querySelector("[data-time]")),
  document.querySelector(".no-internet").remove(),
  toast("Welcome")
}
);
