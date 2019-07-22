'use strict'

const marked = require('marked');
const hl = require('highlight.js');

const renderer = new marked.Renderer();

renderer.heading = function(text) {
  return '<p><strong>' + text + '</strong></p>';
};

renderer.hr = function() {
  return '\n';
};

renderer.image = renderer.link;

renderer.code = (code, language, escaped) => {
  const highlighted = hl.highlightAuto(code).value;
  return `<pre><code class="hljs ${language}">${
    highlighted === code ? escaped : highlighted
  }</code></pre>`;
};

marked.setOptions({
  renderer,
  breaks: true,
  gfm: true,
  mangle: false,
  pedantic: false,
  sanitize: true,
  smartLists: false,
  smartypants: false,
  tables: false,
});

exports.renderMarkdown = (str) => {
  return marked(str).replace(/<a /g, '<a rel="nofollow" ');
};
