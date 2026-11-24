// ---------------------------------------------------------------------------
// Search engines (Vimium "searchEngines")
// ---------------------------------------------------------------------------
api.removeSearchAlias("b");

api.addSearchAlias("l", "I'm feeling lucky", "https://www.google.com/search?q={0}&btnI");
api.addSearchAlias("m", "google maps", "https://www.google.com/maps?q=");
api.addSearchAlias("ty", "tyda", "http://tyda.se/search/{0}?");
api.addSearchAlias("sy", "synonymer", "http://synonymer.cc/search?w={0}&w_lang=ALL");
api.addSearchAlias("wol", "wolframalpha", "http://www.wolframalpha.com/input/?i=");
api.addSearchAlias("bl", "blocket", "http://www.blocket.se/stockholm?q={0}&cg=0&w=3&st=s&ca=11&is=1&l=0&md=th");
api.addSearchAlias("tr", "tradera", "http://www.tradera.com/finding.mvc/itemlisting?header=true&search=");
api.addSearchAlias("yr", "yr", "https://www.yr.no/soek/soek.aspx?sted=");
api.addSearchAlias("pr", "prisjakt", "https://www.prisjakt.nu/search.php?s={0}&r=1&e=utf8&ref=155");
api.addSearchAlias("net", "netflix", "https://www.netflix.com/search?q=");
api.addSearchAlias("im", "google images", "https://www.google.com/search?tbm=isch&q=");

// The `m` alias above takes over Surfingkeys' `om`, so give it back to the marks list.
api.mapkey("om", "#8Open URL from vim-like marks", function () {
  api.Front.openOmnibar({ type: "VIMarks" });
});

api.unmap("<Ctrl-6>");
api.unmap("<Ctrl-h>");

// ---------------------------------------------------------------------------
// Keymaps
// ---------------------------------------------------------------------------
api.map("J", "E"); // previous tab
api.map("K", "R"); // next tab
api.map("<Alt-h>", "H"); // list of tab's visited pages
api.map("L", "D"); // forward in history
api.map("H", "S"); // back in history
api.map("<Backspace>", "S"); // back in history
api.map("gF", "L"); // regional hints
api.map("D", "P"); //  scroll full page down, pairs with U
api.map("oo", "t"); // omnibar, open in new tab (go: current tab)
api.map("yf", "ya"); // copy a link URL
api.map("P", "cc"); // open URL from clipboard in new tab
api.map("<Alt-f>", "cf"); // open multiple links in new tabs
api.map("<", "<<"); // move tab left
api.map(">", ">>"); // move tab right
api.map("`", "<Ctrl-6>"); // switch to previous tab
api.map("[", "[["); // previous page link
api.map("]", "]]"); // next page link
api.map("gH", "gh"); // chromium history
api.map("gh", "<Ctrl-h>"); // hover link

api.mapkey("g<", "#3Move current tab to the far left", () => api.RUNTIME("moveTab", { step: -100 }));
api.mapkey("g>", "#3Move current tab to the far right", () => api.RUNTIME("moveTab", { step: 100 }));
api.mapkey("R", "#4Reload the page without cache", function () {
  api.RUNTIME("reloadTab", { nocache: true });
});

// Swap `i` and `gi` (using `F13` as an intermediate mapping)
api.map("<F13>", "i");
api.map("i", "gi");
api.map("gi", "<F13>");
api.unmap("<F13>");

// Remove the Emacs-like insert mode keys so text boxes keep the browser's behaviour
for (const key of ["<Ctrl-a>", "<Ctrl-e>", "<Ctrl-u>", "<Alt-b>", "<Alt-f>", "<Alt-w>", "<Alt-d>"]) {
  api.iunmap(key);
}

// ---------------------------------------------------------------------------
// Link hints
// ---------------------------------------------------------------------------
api.Hints.setCharacters("asdfwezxcjkl;'hmuio,./");
api.Hints.style(`
  border: 1px solid #282c34;
  color: white;
  background: none;
  background-color: #282c34;
  font-family: "Fira Code", monospace;
  font-weight: bold;
  font-size: 12px;
`);

// Pattern to match "next"/"previous" links
settings.nextLinkRegex = /\b(next|more|older|nästa|framåt)\b|forward>|[›→»≫]|>>/i;
settings.prevLinkRegex = /\b(previous page|prev|previous|newer|back|föregående|bakåt)\b|[<‹←«≪]/i;

// ---------------------------------------------------------------------------
// Exclusion rules
// ---------------------------------------------------------------------------
// Rules with empty passKeys: disable Surfingkeys completely.
const blocklist = [
  // keep-sorted start
  String.raw`^https://codeshare\.io/`, // Vimium passed every printable key here
  String.raw`^https://docs\.google\.com/spreadsheets`,
  String.raw`^https://krunker\.io/`,
  String.raw`^https://repl\.it/`,
  String.raw`^https://wasavi\.appsweets\.net/`,
  String.raw`^https://www\.overleaf\.com/project/`,
  String.raw`^https?://adventure\.charachorder\.io/`,
  String.raw`^https?://calendar\.proton\.me/`,
  String.raw`^https?://coolwanglu\.github\.io/`,
  String.raw`^https?://cpp\.sh/`,
  String.raw`^https?://flat\.io/`,
  String.raw`^https?://foony\.com/`,
  String.raw`^https?://hl2\.slqnt\.dev/`,
  String.raw`^https?://keyboardyoga\.space/`,
  String.raw`^https?://monkeytype\.com/`,
  String.raw`^https?://typ\.ing/`,
  String.raw`^https?://typst\.app/project/`,
  String.raw`^https?://vim-adventures\.com/`,
  String.raw`^https?://www\.boot\.dev/assignments/`,
  String.raw`^https?://www\.evernote\.com/`,
  String.raw`^https?://www\.iq-eq\.io/`,
  String.raw`^https?://www\.keybr\.com/`,
  String.raw`^https?://www\.qwerty\.expert/`,
  String.raw`^https?://www\.ratatype\.com/`,
  String.raw`^https?://www\.typelit\.io/`,
  // keep-sorted end
];
settings.blocklistPattern = new RegExp(blocklist.join("|"), "i");

// Rules with passKeys: unmap those keys so they reach the page
const passKeys = [
  // keep-sorted start
  [/^https:\/\/www\.scalable-learning\.com\/#\/courses\//, "jlkf"],
  [/^https:\/\/www\.twitch\.tv\//, "fm"],
  [/^https:\/\/www\.youtube\.com\/watch/, "jklmfFNP<>"],
  [/^https?:\/\/app\.pluralsight\.com\//, "f"],
  [/^https?:\/\/calendar\.google\.com\//, "mjk4dt?/x"],
  [/^https?:\/\/cloud\.google\.com\//, "*"],
  [/^https?:\/\/duckduckgo\.com\//, "jkolv'/hm"],
  [/^https?:\/\/github\.com\//, "/"],
  [/^https?:\/\/gitlab\.com\//, "np"],
  [/^https?:\/\/jbmhw349lqbus9j8tx4wac18nsja9u\.ext-twitch\.tv\//, "f"],
  [/^https?:\/\/learn\.kodekloud\.com\//, "f"],
  [/^https?:\/\/mail\.google\.com\//, "gl*u?/xirjkRUoFnp"],
  [/^https?:\/\/mail\.proton\.me\//, "jkuUAgirRFx/?Nn"],
  [/^https?:\/\/outlook\.office\.com\//, "gl*u?/xirjkRUoFnpI"],
  [/^https?:\/\/portal\.azure\.com\//, "g/"],
  [/^https?:\/\/thermia\.atlassian\.net\//, "1234[/"],
  [/^https?:\/\/www\.svtplay\.se\/video\//, "F"],
  // keep-sorted end
];
for (const [pattern, keys] of passKeys) {
  // The URL is checked here rather than passing `pattern` as unmap's domain
  // argument, since regexes don't reliably survive the trip to the extension.
  if (!pattern.test(window.location.href)) {
    continue;
  }
  for (const key of keys) {
    api.unmap(key);
    // Digits are repeat counts, not mappings, so they can't be unmapped.
    if (key >= "0" && key <= "9") {
      settings.digitForRepeat = false;
    }
  }
}

// GitHub: only these `g` sequences go to the page (its "go to" shortcuts). `g`
// can't be unmapped for that without losing every g-mapping, so each sequence
// replays the keys to the page while Surfingkeys briefly lets keys through.
if (/^https?:\/\/github\.com\//.test(window.location.href)) {
  const githubGoTo = {
    gc: "Code",
    gi: "Issues",
    gp: "Pull requests",
    ga: "Actions",
    gw: "Wiki",
  };
  for (const [keys, target] of Object.entries(githubGoTo)) {
    api.mapkey(keys, `GitHub: ${keys} (go to ${target})`, function () {
      api.Normal.passThrough(100);
      for (const key of keys) {
        document.body.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
      }
    });
  }
}

// ---------------------------------------------------------------------------
// Theme (One Dark, to match the hint colors)
// ---------------------------------------------------------------------------
settings.theme = `
.sk_theme {
    background: #282c34;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #3e4452;
}`;
