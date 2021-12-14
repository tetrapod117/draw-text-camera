// <script /> を作成
const script = document.createElement("script");

// 
script.setAttribute("type", "module");
script.setAttribute("src", chrome.extension.getURL("src/index.js"));

const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;

// `<script />` を挿入する
head.insertBefore(script, head.lastChild);