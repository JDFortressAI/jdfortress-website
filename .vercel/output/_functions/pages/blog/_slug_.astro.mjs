import { c as createComponent, r as renderComponent, a as renderTemplate, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_CodUk4dt.mjs';
import 'piccolore';
import { g as getCollection, r as renderEntry } from '../../chunks/_astro_content_CgxDwhym.mjs';
import { $ as $$Layout } from '../../chunks/Layout_Do43xlIK.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const posts = await getCollection("blog");
  const post = posts.find((p) => p.id === slug);
  if (!post) {
    return Astro2.redirect("/blog", 404);
  }
  const { Content } = await renderEntry(post);
  const isFuture = post.data.date > /* @__PURE__ */ new Date();
  function formatDate(date) {
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${post.data.title} \u2014 JD Fortress AI`, "description": post.data.excerpt, "noindex": isFuture }, { "default": async ($$result2) => renderTemplate`${isFuture && renderTemplate`${maybeRenderHead()}<div style="background:#fef3c7; border-bottom:1px solid #f59e0b; padding:10px 24px; text-align:center;"> <span style="color:#92400e; font-size:0.85rem; font-weight:600;">🐛 Debug preview — this post is scheduled for ${formatDate(post.data.date)} and is not yet publicly visible.</span> </div>`} <section style="background:#0F2041; padding:80px 24px 64px;"> <div style="max-width:760px; margin:0 auto;"> <a href="/blog" style="color:rgba(255,255,255,0.5); text-decoration:none; font-size:0.9rem; display:inline-flex; align-items:center; gap:6px; margin-bottom:28px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.5)'">
← Blog
</a> <h1 style="color:#fff; font-size:clamp(1.8rem, 4vw, 2.8rem); font-weight:700; line-height:1.15; letter-spacing:-0.02em; margin:0 0 20px;"> ${post.data.title} </h1> <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;"> <span style="color:rgba(255,255,255,0.5); font-size:0.9rem;">${formatDate(post.data.date)}</span> <span style="color:rgba(255,255,255,0.2);">·</span> <span style="color:rgba(255,255,255,0.5); font-size:0.9rem;">${post.data.author}</span> </div> </div> </section>  <section style="background:#fff; padding:64px 24px 96px;"> <div style="max-width:720px; margin:0 auto;"> <p style="color:#56585E; font-size:1.05rem; line-height:1.8; font-style:italic; border-left:3px solid #1E6FF5; padding-left:20px; margin:0 0 40px;"> ${post.data.excerpt} </p> <div class="prose"> ${renderComponent($$result2, "Content", Content, {})} </div> </div> </section>  <section style="background:#F0F4FF; padding:64px 24px; text-align:center;"> <div style="max-width:560px; margin:0 auto;"> <h2 style="color:#0D141A; font-size:1.5rem; font-weight:700; margin:0 0 12px;">Enjoyed this article?</h2> <p style="color:#56585E; font-size:0.95rem; margin:0 0 28px; line-height:1.7;">If you're thinking about secure AI for your business, we'd love to have a conversation.</p> <a href="/contact" style="background:#1E6FF5; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.95rem;" onmouseover="this.style.background='#1558cc'" onmouseout="this.style.background='#1E6FF5'">
Get in Touch →
</a> </div> </section> ` })} `;
}, "/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/[slug].astro", void 0);

const $$file = "/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
