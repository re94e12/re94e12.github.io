!function(e) {
  if (eg = e,
  e) {
    var t, n;
    let l = "app@"
      , o = localStorage.app || "firstApp";
    t = document.querySelector('input[name="project"]'),
    "SecondApp" == localStorage.app && t.click(),
    t.onchange = function() {
      localStorage.app = this.checked ? "SecondApp" : "firstApp",
      window.location.reload()
    }
    ,
    ((n = (new Date).getHours()) > 17 || n < 7) && document.documentElement.classList.toggle("dark"),
    (async e=>{
      e.querySelector("h3").innerHTML = document.querySelector("title").innerHTML,
      e.querySelector("p").innerHTML = document.querySelector('meta[name="description"]').content,
      e.querySelector("a").innerHTML = window.location.origin,
      e.querySelector("img").oncontextmenu = function() {
        event.preventDefault()
      }
      ,
      e.querySelector("img").src = "https://github.com/" + window.location.hostname.split(".")[0] + ".png";
      try {
        let t = await fetch("https://api.counterapi.dev/v1/" + window.location.hostname + "/counter/" + (localStorage.myCounter ? "?" : "up?") + new Date().getTime());
        if (t.ok) {
          let n = await t.json();
          localStorage.myCounter = n.count
        }
      } catch (l) {}
      e.querySelector("span").innerHTML = `Installed for ${localStorage.myCounter || ""} users`
    }
    )(document.querySelector(".aboutme")),
    $lang = e=>{
      var t = {
        lng: "\uD83C\uDDEA\uD83C\uDDF8",
        "Eliminar index": "No puede eliminar la p\xe1gina principal. Desea restaurar la plantilla al estado original y borrar todos los cambios?"
      };
      try {
        $traductor.es = t
      } catch (n) {
        $traductor = {
          es: t
        }
      }
      var l = (window.navigator.language || navigator.browserLanguage || "es").slice(0, 2);
      return $traductor[l] || (l = "es"),
      $traductor[l][e] || $traductor.es[e] || e
    }
    ,
    getToken = e=>{
      var t = new Date().getTime();
      return (e || "token-xxxxxxxx").replace(/[xy]/g, function(e) {
        var n = (t + 16 * Math.random()) % 16 | 0;
        return t = Math.floor(t / 16),
        ("x" == e ? n : 3 & n | 8).toString(16)
      })
    }
    ,
    confirma = (e,t)=>{
      ($confirma = document.createElement("dialog")).className = "confirm",
      $confirma.innerHTML = `<h2 class="bi-lightbulb">${t ? $lang("Confirma") : $lang("Alerta")}</h2><p> ${e}</p> ${t ? '<div><button onclick="$confirma.remove()">Cancelar</button><button class="acepta">Aceptar</button></div>' : ""}`,
      t || ($confirma.onclick = function() {
        this.remove()
      }
      ),
      document.body.append($confirma),
      $confirma.showModal(),
      t && ($confirma.querySelector(".acepta").onclick = function() {
        $confirma.remove(),
        t()
      }
      )
    }
    ,
    window.alert = confirma,
    toast = (e,t,n)=>{
      if (e) {
        let l = document.querySelector(".toast");
        l = l ? l.getBoundingClientRect().bottom + 5 : 50;
        let o = document.createElement("app-element");
        o.innerHTML = e,
        o.classList.add("toast", n || "df"),
        o.style.top = l + "px",
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
    ,
    document.querySelector("input.apply").onchange = function() {
      $wait()
      let a = new Image()
      a.src = this.value
      this.value = ""
      a.onload = function() {
        document.querySelector(".imgBox.full").style.display = "none",
        $Elem.alt = ""
        $Elem.src = this.src
        init()
        save()
        $wait(true)
      }
      a.onerror = ()=>{
        document.querySelector(".imgBox.full").style.display = "none",
        toast('Error')
        $wait(true)
      }
    }
    ,
    document.querySelector("label.close-gallery").onclick = function() {
      document.querySelector(".imgBox.full").style.display = "none"
      save()
    }
    ,
    editeImg = (e=$Elem)=>{
      let t = document.querySelector(".full.gallery").querySelectorAll("img").length;
      document.querySelector("label.close-gallery span").innerHTML = t + $lang(" Img"),
      $wait(!0),
      document.querySelector(".imgBox.full").style.display = "flex"
    }
    ,
    uim = e=>{
      $Elem.src = e.src,
      $Elem.alt = e.alt,
      document.querySelector(".imgBox.full").style.display = "none",
      init(),
      save()
    }
    ,
    getMedia = ()=>{
      for (f in $imgs = "",
      $images)
        $imgs = `<div><label onclick=" confirma($lang('Eliminar imagen'),()=>{eliminarDeCache('${f}');delete $images['${f}'];getMedia() })" class="bi-trash"></label><img onclick="uim(this)" src="${f}" loading="lazy" class="full" alt="${$images[f]}"></div>` + $imgs;
      document.querySelector(".full.gallery").innerHTML = $imgs
    }
    ,
    nolink = ()=>{
      document.querySelectorAll("main a").forEach(e=>{
        e.onclick = function() {
          event.preventDefault(),
          toast(this.href)
        }
      }
      )
    }
    ,
    getPosition = e=>{
      var t = 0
        , n = 0;
      if (!e)
        var e = window.event;
      return e.pageX || e.pageY ? (t = e.pageX,
      n = e.pageY) : (e.clientX || e.clientY) && (t = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
      n = e.clientY + document.body.scrollTop + document.documentElement.scrollTop),
      {
        x: t,
        y: n
      }
    }
    ,
    openMenu = (e,t)=>{
      label = (e,t)=>{
        let o = document.createElement("label");
        o.className = e.class,
        o.innerHTML = " " + $lang(e.label),
        o.onclick = e.click,
        t ? n.append(o) : l.append(o)
      }
      ;
      let n = document.createElement("div");
      var l = document.createElement("dialog");
      t.forEach(e=>{
        e.label ? label(e) : e.forEach(e=>{
          label(e, !0)
        }
        )
      }
      ),
      l.prepend(n),
      l.className = "menu-edite",
      l.onclick = function() {
        this.remove(),
        $Elem.focus()
      }
      ,
      document.body.append(l),
      l.showModal();
      var o = l;
      let i = getPosition(e)
        , r = i.x
        , a = i.y
        , c = o.offsetWidth + 4
        , s = o.offsetHeight + 4
        , u = window.innerWidth
        , m = window.innerHeight;
      u - r < c / 2 ? o.style.left = u - c + "px" : r - c / 2 < 0 ? o.style.left = "5px" : o.style.left = r - c / 2 + "px",
      m - a < s / 2 ? o.style.top = m - s + "px" : a - s / 2 < 0 ? o.style.top = "5px" : o.style.top = a - s / 2 + "px"
    }
    ,
    setCookie = (e,t,n)=>{
      document.cookie = `${encodeURIComponent(e)}=${encodeURIComponent(t)}; path=/; max-age=${86400 * (n || 0)}`
    }
    ,
    getCookie = e=>{
      let t = document.cookie.match(RegExp("(?:^|; )" + e.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
      return t ? decodeURIComponent(t[1]) : null
    }
    ,
    eliminarDeCache = async e=>{
      let t = await caches.open("my-cache-v1");
      await t.delete(e),
      console.log(`URL eliminada de la cach\xe9: ${e}`)
    }
    ;
    let i, r, a = {};
    init = ()=>{
      $template.querySelectorAll("[data-open]").forEach((e,t)=>{
        e.onclick = function() {
          if ("inherit" == this.contentEditable) {
            r = this.dataset.open;
            let e = document.querySelector(".select");
            e && e.classList.remove("select"),
            this.classList.add("select"),
            i.innerHTML = document.querySelector('[data-page="' + r + '"]').innerHTML,
            i.scrollTop = a[r] || 0,
            nolink(),
            (tabm = document.querySelector('label[for="menutab"] span')) && (tabm.innerHTML = this.innerHTML),
            (menu = document.querySelector("input#menutab")) && menu.click(),
            init()
          }
        }
        ,
        $template.querySelectorAll("img").forEach(e=>{
          $images[e.src] || ($images[e.src] = e.alt),
          e.onclick = function() {
            if (e.classList.contains("mini")) {
              $img_open = this;
              let t = document.createElement("div");
              t.className = "view full",
              t.innerHTML = `<a>\xd7</a><div class="full"><img src="${this.src}" class="full" alt="${this.alt}"></div><div class="box"><p>${this.alt || "Sin info"}</p><b>${new URL(this.src).hostname || window.location.hostname || "mini-app"}</b></div>`,
              t.onclick = function() {
                this.remove()
              }
              ,
              t.ondragstart = ()=>!1,
              t.onpointerdown = function() {
                $pi = event.clientX,
                t.setPointerCapture(event.pointerId),
                t.onpointerup = function(e) {
                  if ($pi > e.clientX + 150) {
                    let t = $img_open.nextElementSibling;
                    t && t.classList.contains("mini") && (this.remove(),
                    t.click())
                  }
                  if ($pi + 150 < e.clientX) {
                    let n = $img_open.previousElementSibling;
                    n && n.classList.contains("mini") && (this.remove(),
                    n.click())
                  }
                }
              }
              ,
              document.body.append(t)
            }
          }
        }
        ),
        getMedia()
      }
      ),

      document.querySelector('.uplo').onchange = function() {
        confirma($lang('Las imágenes subidas son temporales, sólo estarán disponibles 60min fuera del editor, Usarlo como prueba. Desea subirla?'), ()=>{
          $wait()
          const formData = new FormData();
          formData.append('file', this.files[0]);

          fetch('https://tmpfiles.org/api/v1/upload', {
            method: 'POST',
            body: formData
          }).then(response=>response.json()).then(data=>{
            document.querySelector(".imgBox.full").style.display = "none",
            $wait(true);
            if (data.data) {
              $Elem.src = data.data.url.replace('.org/', '.org/dl/');
              $Elem.alt = "Imagen temporal x 60minutos";
              init();
              save();
              console.log(data.data.url.replace('.org/', '.org/dl/'))
            }
            console.log(JSON.stringify(data, null, 2))
          }
          ).catch(error=>{
            document.querySelector(".imgBox.full").style.display = "none",
            $wait(true)
            toast('Error de Internet')
          }
          );
        }
        )
      }

      re94e12(),
      function(e) {
        if (e) {
          let t, n, l = (new Date().getTime() - new Date(e.dataset.time || new Date).getTime()) / 1e3, o = Math.floor(l / 60), i = Math.floor(o / 60), r = Math.floor(i / 24), a = Math.floor(r / 30), c = Math.floor(a / 12);
          n = c > 0 ? [c, "year"] : a > 0 ? [a, "month"] : r > 0 ? [r, "day"] : i > 0 ? [i, "hour"] : o > 0 ? [o, "minutes"] : [0, "second"];
          try {
            t = new Intl.RelativeTimeFormat(window.navigator.language || navigator.browserLanguage,{
              numeric: "auto",
              style: "long"
            }).format(-1 * n[0], n[1]),
            l < 0 && (t = "--")
          } catch (s) {}
          e.innerHTML = t
        }
      }(document.querySelector("[data-time]"));
      let e = $template.querySelector("[data-time]");
      e && (e.dataset.time = new Intl.DateTimeFormat("en-EN",{
        dateStyle: "medium",
        timeStyle: "medium"
      }).format(new Date))
    }
    ;
    let c = indexedDB.open(l, 1);
    c.onupgradeneeded = function() {
      let e = c.result;
      e.objectStoreNames.contains(l) || (e.createObjectStore(l, {
        keyPath: "id"
      }),
      console.log(l + " instalado con \xe9xito"))
    }
    ,
    c.onerror = function() {
      console.error("Error", c.error)
    }
    ,
    c.onsuccess = function() {
      db = c.result,
      console.log(l + " cargado"),
      searchDB(o, e=>{
        if (e)
          var t = e;
        else {
          toast($lang("welcome to " + o));
          var t = $page_default
        }
        $template.innerHTML = t,
        (i = document.querySelector("main")).onscroll = function() {
          a[r] = this.scrollTop
        }
        ,
        init(),
        document.querySelector("nav [data-open]").click()
      }
      ),
      searchDB("images", e=>{
        e && ($images = e,
        getMedia())
      }
      ),
      searchDB("historial", e=>{
        e && ($historial = e)
      }
      )
    }
    ,
    searchDB = (e=l,t)=>{
      let n = db.transaction(l).objectStore(l).get(e);
      n.onsuccess = function() {
        void 0 !== n.result ? t(n.result.data) : (t(!1),
        console.log(e + ": no tiene datos"))
      }
    }
    ,
    putDB = (e,t=o)=>{
      let n = db.transaction(l, "readwrite")
        , i = n.objectStore(l).put({
        id: t,
        data: e
      });
      i.onsuccess = function(e) {}
      ,
      i.onerror = function(e) {
        console.log(i.error)
      }
      ,
      n.onabort = function() {
        console.log("Error", n.error)
      }
    }
    ,
    save = ()=>{
      $template.querySelector('template[data-page="' + r + '"]').innerHTML = i.innerHTML.replace(/(data:[\w\;\,\=\/\+]+)/gim, ""),
      putDB($template.innerHTML.replace(/(checked=\"\")|(flex;)|(none;)|(class="select")|(contenteditable="plaintext-only")|(class="")/gim, "")),
      putDB($images, "images"),
      putDB($historial, "historial")
    }
    ,
    document.body.querySelector(".download").onclick = ()=>{
      $hostjs = window.location.href.split("index.html")[0],
      $basic_css = document.querySelector("#style").innerHTML.replace(/(  )|(\n)/gim, ""),
      i.innerHTML = "";
      html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1"/><title>${(x = $template.querySelector("h1")) ? x.innerHTML : "default"}</title><style>${$basic_css}</style><link rel="stylesheet" href="${$hostjs}script.css"/><script>function minilib(){(dt=document.querySelector("[data-time]"))&&(dt.innerHTML="")}(e=>{(e>17||e<7)&&document.documentElement.classList.toggle("dark")})((new Date).getHours()),(e=>{let t=document.createElement("script");t.src=e,t.async=!1,document.head.append(t),t.onload=t.onerror=function(){this.remove()}})("${$hostjs}script.js"),window.onload=()=>{let e,t,l={};(e=document.querySelector("main")).onscroll=function(){l[t]=this.scrollTop},document.querySelectorAll("[data-open]").forEach((n,i)=>{n.onclick=function(){t=this.dataset.open,e.innerHTML=document.querySelector('[data-page="'+t+'"]').innerHTML,e.scrollTop=l[t]||0,e.querySelectorAll("img").forEach(e=>{e.oncontextmenu = function(){event.preventDefault()};e.onerror=function(){let e=document.createElement("canvas");$=e.getContext("2d"),e.width=400,e.height=200,$.fillStyle="transparent",$.fillRect(0,0,e.width,e.height),$.font="900 90px asap",$.fillStyle="#fff",$.textAlign="center",$.textBaseline="middle",$.fillText("404",e.width/2,e.height/2),new Promise(t=>e.toBlob(e=>{t(URL.createObjectURL(e))})).then(e=>{this.src=e}).catch()}}),minilib(),document.querySelector(".select").classList.remove("select"),this.classList.add("select"),document.querySelector('label[for="menutab"] span').innerHTML=this.innerHTML,document.querySelector("input#menutab").click()},0==i&&n.click()})};</script></head><body>${$template.innerHTML}</body></html>`,
      document.querySelector("nav [data-open]").click();
      let e = html.split(/(?=<)/).map(e=>e.trim())
        , t = ""
        , n = 0;
      e.forEach(e=>{
        e.startsWith("</") && --n < 0 && (n = 0),
        ["</title>", "<br>", "</i>", "</style>", "</script>", "</a>", "</span>", "</b>", "</p>", "</h1>", "</h2>"].indexOf(e) >= 0 ? t += e : t += "\n" + "  ".repeat(n) + e,
        !e.startsWith("<") || e.endsWith("/>") || e.startsWith("</") || e.startsWith("<input") || e.startsWith("<img") || e.startsWith("<!DOCTYPE") || e.startsWith("<br") || e.startsWith("<hr") || n++
      }
      ),
      console.log("Download " + (t.trim().length / 1024).toFixed(2));
      let l = document.createElement("a")
        , o = new Blob([t.trim()],{
        type: "text/html"
      });
      l.download = (x = $template.querySelector("h1")) ? x.innerHTML : "default"
      l.href = URL.createObjectURL(o),
      l.click(),
      URL.revokeObjectURL(l.href)
      toast('👍')
    }
  }
}((()=>{
  if (window.location.hostname.split(".")[0] == document.querySelector('meta[name="host"]').content)
    return !0;
  try {
    if (hostauth.includes(window.location.hostname))
      return !0;
    return !1
  } catch (e) {
    return !1
  }
}
)());
