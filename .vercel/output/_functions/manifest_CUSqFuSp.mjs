import 'piccolore';
import { l as decodeKey } from './chunks/astro/server_CodUk4dt.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_mnw4VLzc.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jdfv001/.openclaw/workspace/jdfortress-website/","cacheDir":"file:///Users/jdfv001/.openclaw/workspace/jdfortress-website/node_modules/.astro/","outDir":"file:///Users/jdfv001/.openclaw/workspace/jdfortress-website/dist/","srcDir":"file:///Users/jdfv001/.openclaw/workspace/jdfortress-website/src/","publicDir":"file:///Users/jdfv001/.openclaw/workspace/jdfortress-website/public/","buildClientDir":"file:///Users/jdfv001/.openclaw/workspace/jdfortress-website/dist/client/","buildServerDir":"file:///Users/jdfv001/.openclaw/workspace/jdfortress-website/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/faq/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about/faq","isIndex":false,"type":"page","pattern":"^\\/about\\/faq\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}],[{"content":"faq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/faq.astro","pathname":"/about/faq","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":true,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about/index.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"calculator/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/calculator","isIndex":true,"type":"page","pattern":"^\\/calculator\\/?$","segments":[[{"content":"calculator","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/calculator/index.astro","pathname":"/calculator","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":true,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact/index.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"labs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/labs","isIndex":true,"type":"page","pattern":"^\\/labs\\/?$","segments":[[{"content":"labs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/labs/index.astro","pathname":"/labs","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"solutions/law-firms/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/solutions/law-firms","isIndex":true,"type":"page","pattern":"^\\/solutions\\/law-firms\\/?$","segments":[[{"content":"solutions","dynamic":false,"spread":false}],[{"content":"law-firms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/solutions/law-firms/index.astro","pathname":"/solutions/law-firms","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/faq.DjcdCcrT.css"},{"type":"inline","content":".prose{color:#0d141a;font-size:1.05rem;line-height:1.85}.prose h2{font-size:1.55rem;font-weight:700;line-height:1.25;letter-spacing:-.02em;color:#0d141a;margin-top:3rem;margin-bottom:1.1rem}.prose h3{font-size:1.2rem;font-weight:700;line-height:1.35;color:#0d141a;margin-top:2.25rem;margin-bottom:.75rem}.prose h4{font-size:1rem;font-weight:700;color:#0d141a;margin-top:2rem;margin-bottom:.5rem}.prose p{color:#374151;margin-top:0;margin-bottom:1.75rem}.prose p:last-child{margin-bottom:0}.prose ul,.prose ol{color:#374151;padding-left:1.6rem;margin-top:0;margin-bottom:1.75rem}.prose ul{list-style-type:disc}.prose ol{list-style-type:decimal}.prose li{margin-bottom:.6rem;line-height:1.75}.prose li>p{margin-bottom:.5rem}.prose strong{font-weight:700;color:#0d141a}.prose em{font-style:italic}.prose a{color:#1e6ff5;text-decoration:underline;text-underline-offset:2px}.prose a:hover{color:#1558cc}.prose hr{border:none;border-top:1px solid #e0e8f5;margin:3rem 0}.prose blockquote{border-left:3px solid #1E6FF5;margin:2rem 0;padding:.75rem 0 .75rem 1.5rem;color:#56585e;font-style:italic}.prose blockquote p{margin-bottom:0}.prose code{background:#f0f4ff;padding:.15em .4em;border-radius:4px;font-size:.88em;font-family:ui-monospace,Cascadia Code,monospace}.prose pre{background:#0d141a;color:#e2e8f0;padding:1.25rem 1.5rem;border-radius:8px;overflow-x:auto;margin-bottom:1.75rem}.prose pre code{background:none;padding:0;font-size:.9em}\n"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/faq.DjcdCcrT.css"},{"type":"inline","content":".future-post{display:none}body.debug-mode .future-post{display:block;position:relative}body.debug-mode .future-post:before{content:\"\";position:absolute;inset:0;border-left:3px solid #f59e0b;pointer-events:none}\n"}],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/about/faq.astro",{"propagation":"none","containsHead":true}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/about/index.astro",{"propagation":"none","containsHead":true}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/calculator/index.astro",{"propagation":"none","containsHead":true}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/contact/index.astro",{"propagation":"none","containsHead":true}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/labs/index.astro",{"propagation":"none","containsHead":true}],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/solutions/law-firms/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about/faq@_@astro":"pages/about/faq.astro.mjs","\u0000@astro-page:src/pages/about/index@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/calculator/index@_@astro":"pages/calculator.astro.mjs","\u0000@astro-page:src/pages/contact/index@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/labs/index@_@astro":"pages/labs.astro.mjs","\u0000@astro-page:src/pages/solutions/law-firms/index@_@astro":"pages/solutions/law-firms.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CUSqFuSp.mjs","/Users/jdfv001/.openclaw/workspace/jdfortress-website/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CnRNbYks.mjs","/Users/jdfv001/.openclaw/workspace/jdfortress-website/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/jdfv001/.openclaw/workspace/jdfortress-website/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_COFIryhy.mjs","/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.oGK9-cYq.js","/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/calculator/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.B-0cmkuc.js","/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DnsdY02A.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/pages/blog/index.astro?astro&type=script&index=0&lang.ts","const o=\"jdf-debug-mode\",n=document.getElementById(\"blog-heading\"),t=document.getElementById(\"debug-badge\");let e=0,d=null;function s(){document.body.classList.add(\"debug-mode\"),t&&(t.style.display=\"flex\"),sessionStorage.setItem(o,\"1\")}function i(){document.body.classList.remove(\"debug-mode\"),t&&(t.style.display=\"none\"),sessionStorage.removeItem(o)}sessionStorage.getItem(o)&&s();n?.addEventListener(\"click\",()=>{e++,d&&clearTimeout(d),d=setTimeout(()=>{e=0},500),e>=3&&(e=0,document.body.classList.contains(\"debug-mode\")?i():s())});window.disableDebug=i;"],["/Users/jdfv001/.openclaw/workspace/jdfortress-website/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","function n(){const e=document.getElementById(\"mobile-menu\");e&&(e.style.display=e.style.display===\"none\"?\"block\":\"none\")}window.toggleMenu=n;"]],"assets":["/_astro/inter-cyrillic-ext-wght-normal.BOeWTOD4.woff2","/_astro/inter-cyrillic-wght-normal.DqGufNeO.woff2","/_astro/inter-greek-wght-normal.CkhJZR-_.woff2","/_astro/inter-greek-ext-wght-normal.DlzME5K_.woff2","/_astro/inter-latin-ext-wght-normal.DO1Apj_S.woff2","/_astro/inter-vietnamese-wght-normal.CBcvBZtf.woff2","/_astro/inter-latin-wght-normal.Dx4kXJAl.woff2","/_astro/faq.DjcdCcrT.css","/favicon.svg","/logo-full.png","/logo-navy.png","/logo-white.png","/logo.png","/_astro/index.astro_astro_type_script_index_0_lang.B-0cmkuc.js","/about/faq/index.html","/about/index.html","/calculator/index.html","/contact/index.html","/labs/index.html","/solutions/law-firms/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"4/+0NHDVkWpZso+OlL0cOoYYaeb49XugZxxKuhminUo="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
