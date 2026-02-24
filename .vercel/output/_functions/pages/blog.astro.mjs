import { c as createComponent, r as renderComponent, d as renderScript, a as renderTemplate, m as maybeRenderHead, e as addAttribute } from '../chunks/astro/server_CodUk4dt.mjs';
import 'piccolore';
import { g as getCollection } from '../chunks/_astro_content_CgxDwhym.mjs';
import { $ as $$Layout } from '../chunks/Layout_Do43xlIK.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const now = /* @__PURE__ */ new Date();
  const allPosts = (await getCollection("blog")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  function formatDate(date) {
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog \u2014 JD Fortress AI", "description": "Insights on secure AI, on-premises deployment, data sovereignty, and the future of private AI infrastructure for UK businesses." }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<section style="background:#0F2041; padding:80px 24px 64px;"> <div style="max-width:760px; margin:0 auto;"> <p style="color:#1E6FF5; font-size:0.85rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; margin:0 0 16px;">The JD Fortress Blog</p> <h1 id="blog-heading" style="color:#fff; font-size:clamp(2rem, 5vw, 3rem); font-weight:700; line-height:1.15; letter-spacing:-0.03em; margin:0 0 16px; cursor:default; user-select:none;">
Thinking Out Loud on Secure AI
</h1> <p style="color:rgba(255,255,255,0.65); font-size:1.05rem; line-height:1.7; margin:0; max-width:560px;">
No hype. No vendor fluff. Practical perspectives on private AI infrastructure, compliance, and what actually works in the field.
</p> </div> </section>  <section style="background:#fff; padding:64px 24px 96px;"> <div style="max-width:760px; margin:0 auto;"> ${allPosts.length === 0 ? renderTemplate`<p style="color:#56585E; text-align:center; padding:48px 0;">No posts yet — check back soon.</p>` : renderTemplate`<div style="display:flex; flex-direction:column; gap:0;"> ${allPosts.map((post, i) => {
    const isFuture = post.data.date > now;
    return renderTemplate`<article${addAttribute(isFuture ? "future-post" : "", "class")}${addAttribute(`padding:40px 0; ${i < allPosts.length - 1 ? "border-bottom:1px solid #e8edf5;" : ""}`, "style")}> <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px; flex-wrap:wrap;"> <time style="color:#56585E; font-size:0.85rem;"${addAttribute(post.data.date.toISOString(), "datetime")}> ${formatDate(post.data.date)} </time> <span style="color:#d1d5db; font-size:0.8rem;">·</span> <span style="color:#56585E; font-size:0.85rem;">${post.data.author}</span> ${isFuture && renderTemplate`<span style="background:#fef3c7; color:#92400e; font-size:0.75rem; font-weight:600; padding:2px 8px; border-radius:4px; letter-spacing:0.04em;">
SCHEDULED
</span>`} </div> <h2 style="margin:0 0 12px;"> <a${addAttribute(`/blog/${post.id}`, "href")} style="color:#0D141A; text-decoration:none; font-size:1.35rem; font-weight:700; line-height:1.3; letter-spacing:-0.02em;" onmouseover="this.style.color='#1E6FF5'" onmouseout="this.style.color='#0D141A'"> ${post.data.title} </a> </h2> <p style="color:#56585E; font-size:0.97rem; line-height:1.75; margin:0 0 20px;"> ${post.data.excerpt} </p> <a${addAttribute(`/blog/${post.id}`, "href")} style="color:#1E6FF5; text-decoration:none; font-size:0.9rem; font-weight:600;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
Read more →
</a> </article>`;
  })} </div>`} </div> </section>  <section style="background:#F0F4FF; padding:64px 24px; text-align:center;"> <div style="max-width:560px; margin:0 auto;"> <h2 style="color:#0D141A; font-size:1.4rem; font-weight:700; margin:0 0 12px;">Want to talk through any of this?</h2> <p style="color:#56585E; font-size:0.95rem; line-height:1.7; margin:0 0 28px;">
We write about what we see in the field. If something resonated, we're happy to have a practical, no-sales conversation.
</p> <a href="/contact" style="background:#1E6FF5; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600; font-size:0.95rem;" onmouseover="this.style.background='#1558cc'" onmouseout="this.style.background='#1E6FF5'">
Get in Touch →
</a> </div> </section>  <div id="debug-badge" style="display:none; position:fixed; bottom:20px; right:20px; z-index:9999; background:rgba(15,32,65,0.92); backdrop-filter:blur(8px); color:#fff; padding:10px 16px; border-radius:10px; font-size:0.82rem; font-weight:600; border:1px solid rgba(255,255,255,0.15); box-shadow:0 4px 20px rgba(0,0,0,0.3); align-items:center; gap:8px; cursor:pointer;" title="Click to exit debug mode" onclick="disableDebug()"> <span style="font-size:1.1rem;">🐛</span> <span>Debug mode — showing scheduled posts</span> <span style="margin-left:4px; color:rgba(255,255,255,0.4); font-size:0.8rem;">✕</span> </div> ` })}  ${renderScript($$result, "/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/index.astro", void 0);

const $$file = "/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
