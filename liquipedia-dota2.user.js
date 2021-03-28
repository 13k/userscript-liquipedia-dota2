// ==UserScript==
// @name        Liquipedia Dota2
// @description Improves dota2 liquipedia UI
// @namespace   https://github.com/13k
// @match       https://liquipedia.net/dota2/*
// @grant       none
// @version     0.1.0
// @author      13kb
// @license     Unlicense
// @run-at      document-end
// @homepageURL https://github.com/13k/userscript-liquipedia-dota2
// @downloadURL https://raw.githubusercontent.com/13k/userscript-liquipedia-dota2/master/liquipedia-dota2.user.js
// @noframes
// ==/UserScript==

(() => {
  "use strict";

  const DB_SITE_NAME = "DOTABUFF";
  const DB_MATCH_URL_PREFIX = "https://www.dotabuff.com/matches/";
  const DB_MATCH_ID_RE = /https:\/\/www.dotabuff.com\/matches\/(\d+)/;

  const OD_SITE_NAME = "OpenDota";
  const OD_MATCH_URL_PREFIX = "https://opendota.com/matches/";
  const OD_ICON_URL = "https://www.opendota.com/assets/images/icons/icon-72x72.png";

  const odMatchURL = (matchID) => `${OD_MATCH_URL_PREFIX}${matchID}`;

  const createODIcon = (dbIcon) => {
    const odIcon = dbIcon.cloneNode();

    odIcon.alt = odIcon.alt.replace("DOTABUFF", "OpenDota");
    odIcon.src = OD_ICON_URL;

    return odIcon;
  };

  const createODLink = (dbLink) => {
    const matchID = dbLink.href.match(DB_MATCH_ID_RE)[1];
    const dbIcon = dbLink.querySelector("img");
    const odLink = document.createElement("a");

    odLink.href = odMatchURL(matchID);
    odLink.title = dbLink.title.replace(DB_SITE_NAME, OD_SITE_NAME);
    odLink.target = dbLink.target;
    odLink.rel = dbLink.rel;

    odLink.appendChild(createODIcon(dbIcon));

    return odLink;
  };

  document.querySelectorAll(".vodlink").forEach((ctn) => {
    const dbLinks = ctn.querySelectorAll(`a[href^='${DB_MATCH_URL_PREFIX}']`);

    dbLinks.forEach((dbLink) => ctn.appendChild(createODLink(dbLink)));
  });
})();
