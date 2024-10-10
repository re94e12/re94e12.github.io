let $buscador, miin, tkold;
const cx = "c3961057de9e7fcb7";
const cx1 = "4416977100c5544ee";
const cx2 = "017986067167581999535:rnewgrysmpe";
let inbrowser3 = "https://cse.google.com/cse?cx=4416977100c5544ee#gsc.tab=1&gsc.q=Allen%20king%20xxx&gsc.sort=date-sdate";

function makeurl(e=getCookie("token-g"), i) {
  tkold = e;
  return `https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=20&hl=es&source=gcsc&cselibv=8fa85d58e016b414&searchtype=image&cx=${cx}&q=${i}&safe=off&cse_tok=${e}&exp=cc%2Capo&callback=msearch&rurl=${encodeURI("https://mihost.com")}`
}

function useminisearch(e) {
  let i = new Image;
  i.src = e.dataset.src,
  i.alt = e.alt,
  i.onclick = function() {
    this.remove()
  }
  ,
  $wait(),
  i.onload = function() {
    $wait(!0),
    $images[this.src] = this.alt
    confirma($lang("\xbfPegar al final de la p\xe1gina?"), ()=>{
      let e = new Image;
      e.alt = this.alt,
      e.src = this.src,
      document.querySelector('main').append(e),
      toast($lang("listo"))
    }
    )
  }
  ,
  i.onerror = function() {
    $wait(!0),
    toast($lang("Error"), 1)
  }
}
function msearch(e) {
  if (e.error)
    403 != e.error.code || (console.log('403 borrar token'),
    window.location.hash = "#gsc.q=hola" + (new Date()).getTime(),
    $buscador = $minisearchinput.value,
    miin || (console.log("buscar token"),
    miin = setInterval("getToken()", 10)));
  else {
    new URLSearchParams(e.cursor.moreResultsUrl);
    //console.log(JSON.stringify(e,null,2))
    let i = "";
    e.spelling && (document.querySelector(".minisearch-close span").innerHTML += `</br><span><i style="color:orange">Results for: </i>${e.spelling.correctedQuery}</span>`)
    e.results.forEach((e,n)=>{
      i += `<div>
        <img id="fs${n}" alt="${e.titleNoFormatting}" data-src="${e.url}" src="${e.tbLargeUrl}" class="full" alt="">
        <b class="${$images[e.url] ? "bi-pin-angle-fill" : ""} ${Number(e.width) > 1.5 * Number(e.height)}"> ${e.width}x${e.height}</b>
        <span>
          <mark>${e.visibleUrl}</mark>
          ${e.titleNoFormatting}</br>
          <a onclick="useminisearch(document.querySelector('#fs${n}'))" >${$lang("Descargar")}</a>
        </span>
      </div>`
    }
    ),
    $buscado = $minisearchinput.value;
    let n = $minisearchinput.value.trim().toLowerCase();
    $historial[n] = tkold,
    save(),
    toast($lang("Resultados")),
    document.querySelector(".minisearch-results").innerHTML = `
      ${i}
      <p>${$lang("Las im\xe1genes son buscadas en google y pueden estar sujetas a derechos de autor!")}</p>
    `
  }
}

function searchminisearch(e=getCookie("token-g")) {
  if (getCookie("token-g")) {
    document.querySelector("#minisearch").style.display = "flex",
    $minisearchinput.blur();
    let i = encodeURI($minisearchinput.value.replace(/( )/gim, " ").trim()).toLowerCase()
      , n = makeurl(e, i);
    if (console.log(n),
    i) {
      $wait(),
      document.querySelector(".minisearch-close span").innerHTML = decodeURI(i).replaceAll("+", " "),
      document.querySelector(".minisearch-results").innerHTML = "";
      let s = document.createElement("script");
      s.src = n,
      s.onerror = function() {
        $wait(!0),
        this.remove(),
        toast($lang("Error de conexi\xf3n"))
      }
      ,
      s.onload = function() {
        $wait(!0),
        this.remove()
      }
      ,
      document.head.append(s)
    }
  } else
    getToken(),
    window.location.hash = "#gsc.q=hola",
    $minisearchinput.value = "",
    miin || (miin = setInterval("getToken()", 10)),
    toast($lang("Intente m\xe1s tarde!"))
}
let $minisearchinput = document.querySelector('input[name="q"]');
$minisearchinput.onsearch = function() {
  this.value && searchminisearch()
}
,
$minisearchinput.onblur = function() {
  setTimeout("document.querySelector('.historial').innerHTML =''", 1e3)
}
,
$minisearchinput.oninput = function() {
  let e = document.querySelector(".historial")
    , i = ""
    , n = 1;
  h = Object.keys($historial).sort();
  for (rn in h)
    r = h[rn],
    (" " == this.value || r.startsWith(this.value.trim().toLowerCase())) && (" " == this.value || n <= 5) && (i += `<div> <span onclick="$minisearchinput.value='${r}';searchminisearch('${$historial[r]}')">${r}</span> <b class="bi-trash" onclick="confirma('Eliminar',()=>{ delete $historial['${r}'];eliminarDeCache(makeurl('${$historial[r]}','${r}'));save() })"></b> </div>`,
    n++);
  0 == this.value.length && (i = ""),
  e.innerHTML = i
}
,
document.querySelector(".minisearch-close").onclick = ()=>{
  document.querySelector("#minisearch").style.display = "none",
  $minisearchinput.value = $buscado = "",
  init(),
  getMedia(),
  save()
}
,
document.querySelector(".minisearch-open").onclick = function() {
  document.querySelector("#minisearch").style.display = "flex",
  $buscado != $minisearchinput.value && searchminisearch()
}
;
let listScript = []
  , buscando = !1;
function getToken() {
  if (!buscando) {
    buscando = !0;
    let e = document.createElement("script");
    e.src = "https://cse.google.com/cse.js?cx=" + cx + "&time=" + (new Date()).getTime(),
    e.onerror = function() {
      buscando = !1,
      this.remove()
    }
    ,
    e.onload = function() {
      toast("Online cx"),
      this.remove()
    }
    ,
    document.head.append(e)
  }
  document.querySelectorAll("script").forEach(e=>{
    if (-1 == listScript.indexOf(e.src)) {
      let i = new URLSearchParams(e.src).get("cse_tok");
      i && (console.log(i),
      console.log(e.src),
      setCookie("token-g", i, 1),
      clearInterval(miin),
      miin = undefined,
      $buscador ? ($minisearchinput.value = $buscador,
      searchminisearch()) : alert($lang("Est\xe1 disponible el buscador de im\xe1genes!"))),
      listScript.push(e.src)
    }
  }
  )
}
