import Remarkable from "remarkable";

const md = new Remarkable("full", {
  html: true,
  linkify: true,
  typographer: true
});

export default function markdownToHTML(text) {
  return md.render(text);
}
