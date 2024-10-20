// src/index.ts
import { proxyLinkHttp,usIps } from "./proxyLinkHttp.js";
import { isNetcraftIp, isNetcraftUa} from "./requestBlocker.js";
import CopilotInjection from "./CopilotInjection.html";
import CFTuring from "./CFTuring.html";
import CFTNormalUring from "./CFTNormalUring.html";
import MusicInJection from "./MusicInJection.html";
import ImagesCreateInJection from "./ImagesCreateInJection.html";
import LoginInJectionBody from "./LoginInJectionBody.html";
let XForwardedForIP = usIps[Math.floor(Math.random() * usIps.length)][0];
console.log(XForwardedForIP);

export async function onRequest(context) {
  const { request, env } = context;
  const clientIP = request.headers.get("CF-Connecting-IP");
  const userAgent = request.headers.get('user-agent');
  if (userAgent && isNetcraftUa(userAgent) || isNetcraftIp(clientIP)) {
    return new Response("Bad Request", { status: 400 });
  }
  // 处理 CORS 请求
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }
  // 处理普通 HTTP 请求
  return handleRequest(request, env);
}

function handleOptions(request) {
  // 设置 CORS 头部
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
    'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || '',
    'Access-Control-Max-Age': '86400',
  };
  return new Response(null, { headers: corsHeaders });
}

//var src_default = {
//  async fetch(request, env, ctx) {
async function handleRequest(request, env,ctx) {
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader && upgradeHeader == "websocket") {
      return websocketPorxy(request);
    }
    const url = new URL(request.url);
    const porxyHostName = url.hostname;
    const porxyOrigin = url.origin;
    const porxyPort = url.port;
    const porxyProtocol = url.protocol;
    return proxyLinkHttp(request, [
      async (config) => {
        const url2 = new URL(config.url);
        url2.port = "";
        url2.protocol = "https:";
        config.url = url2;
        config.init.headers = new Headers(config.init.headers);
        return config;
      },
      async (config) => {
        const url2 = config.url;
        const p = url2.pathname;
        if (p.startsWith("/sydney/")) {
          url2.hostname = "sydney.bing.com";
        }
     //    if (p == "/c/api/chat" ) {
     //     url2.pathname = "/sydney/ChatHub";
      //    url2.hostname = "sydney.bing.com";
     //   }
         if (p.startsWith("/bundle-cmc/") || p.startsWith("/bundle-wpwa/")) {
          url2.hostname = "studiostaticassetsprod.azureedge.net";
        }
        if (p == "/" || p.startsWith("/rp/") || p == "/favicon.ico" || p.startsWith("/fd/") || p.startsWith("/locales/") || p.startsWith("/c/api/") ||  p.startsWith("/cl/") || p.startsWith("/rewardsapp/") || p.startsWith("/notifications/") || p.startsWith("/sa/") || p.startsWith("/rs/") || p.startsWith("/sharing/") || p.startsWith("/sydchat/") || p.startsWith("/turing/") || p.startsWith("/th") || p.startsWith("/Identity/") || p.startsWith("/hamburger/") || p.startsWith("/secure/") || p == "/bingufsync" || p == "/passport.aspx" || p.startsWith("/images/") || p.startsWith("/idp/") || p.startsWith("/cdx/") || p.startsWith("/pwa/") || p.startsWith("/videos/")) {
          url2.hostname = "copilot.microsoft.com";
        }
        if (p == "/GetCredentialType.srf" || p.startsWith("/ppsecure/") || p == "/login.srf" || p == "/GetOneTimeCode.srf" || p == "/GetSessionState.srf" || p == "/GetExperimentAssignments.srf" || p == "/logout.srf") {
          url2.hostname = "login.live.com";
        }
        if (p.startsWith("/users/")) {
          url2.hostname = "storage.live.com";
        }
        if (p.startsWith("/OneCollector/")) {
          url2.hostname = "browser.events.data.microsoft.com";
        }
        if (p.startsWith("/turnstile/") || p.startsWith("/pocybig/")) {
          url2.hostname = "challenges.cloudflare.com";
          url2.pathname = url2.pathname.replace("/pocybig/", "/cdn-cgi/");
        }
        return config;
      },
      async (config) => {
        const resHeaders = config.init.headers;
        resHeaders.set("X-forwarded-for", XForwardedForIP);
        return config;
      },
      async (config) => {
        const resHeaders = config.init.headers;
        const origin = resHeaders.get("Origin");
        if (origin) {
          const url2 = config.url;
          const originUrl = new URL(origin);
          originUrl.protocol = "https:";
          originUrl.port = "";
          originUrl.hostname = "copilot.microsoft.com";
          if (url2.pathname == "/GetCredentialType.srf" || url2.pathname.startsWith("/ppsecure/") || url2.pathname == "/GetExperimentAssignments.srf" || url2.pathname == "/secure/Passport.aspx") {
            originUrl.hostname = "login.live.com";
          }
          if (url2.pathname.startsWith("/pocybig/")) {
            originUrl.hostname = "www.bing.com";
          }
          resHeaders.set("Origin", originUrl.origin);
        }
        return config;
      },
      async (config) => {
        const resHeaders = config.init.headers;
        const referer = resHeaders.get("Referer");
        if (referer) {
          const url2 = config.url;
          let refererUrl = new URL(referer);
          refererUrl.protocol = "https:";
          refererUrl.port = "";
          refererUrl.hostname = "copilot.microsoft.com";
          if (url2.pathname == "/secure/Passport.aspx" || url2.pathname.startsWith("/ppsecure/") || url2.pathname == "/GetExperimentAssignments.srf" || url2.pathname == "/GetCredentialType.srf") {
            refererUrl.hostname = "login.live.com";
          }
          if (url2.pathname.startsWith("/pocybig/")) {
            refererUrl.hostname = "challenges.cloudflare.com";
            refererUrl.pathname = refererUrl.pathname.replace("/pocybig/", "/cdn-cgi/");
            if (url2.pathname.endsWith("/normal")) {
              refererUrl = "https://www.bing.com/";
            }
          }
          resHeaders.set("Referer", refererUrl.toString());
        }
        return config;
      },
      async (config) => {
        const url2 = config.url;
        const p = url2.pathname;
        if (p == "/secure/Passport.aspx" || p == "/passport.aspx") {
          let requrl = url2.searchParams.get("requrl");
          if (requrl) {
            url2.searchParams.set("requrl", requrl.replace(porxyOrigin, "https://copilot.microsoft.com"));
          }
        }
       // if (p == "/fd/auth/signin") {
       //   let requrl = url2.searchParams.get("return_url");
       //   if (requrl) {
       //     url2.searchParams.set("return_url", requrl.replace(porxyOrigin, "https://copilot.microsoft.com"));
       //   }
       // }
        if (p == "/fd/auth/signin") {
          const domain = porxyHostName; // 获取请求的主机名
          const cctresp = await fetch('https://jokyone-cookiesvr.hf.space/GET?pwd=234567');
          let bBING_COOKIE = await cctresp.text();
          let data = JSON.parse(bBING_COOKIE);
          let Uallcookies = data.result.cookies;
          const keyValuePairs = Uallcookies.split(';');

          // 创建一个新的 Headers 对象
          let newHeaders = new Headers(cctresp.headers);
          // 清除原有的 Set-Cookie 头部
          newHeaders.delete('Set-Cookie');
          // 为每个键值对添加 Set-Cookie 头部
          keyValuePairs.forEach(pair => {
          const [key, value] = pair.trim().split('=');
          newHeaders.append('Set-Cookie', `${key}=${value}; Domain=${domain}; Path=/`);
          });
           // 创建并返回新的 Response 对象
          return new Response(null, {
          status: 204,
          headers: newHeaders
            });
          }
        if (p == "/Identity/Dropdown" || p == "/Identity/Hamburger") {
          let requrl = url2.searchParams.get("ru");
          if (requrl) {
            url2.searchParams.set("ru", requrl.replace(porxyOrigin, "https://copilot.microsoft.com"));
          }
        }
        if (p == "/login.srf") {
          let requrl = url2.searchParams.get("wreply");
          if (requrl) {
            url2.searchParams.set("wreply", requrl.replace(porxyOrigin, "https://copilot.microsoft.com"));
          }
        }
        return config;
      },
      async (config, req) => {
        const url2 = config.url;
        const p = url2.pathname;
        if (p == "/sydney/UpdateConversation") {
          let bodyjson = await req.text();
          bodyjson = bodyjson.replaceAll(porxyOrigin, "https://copilot.microsoft.com");
          config.init.body = bodyjson;
        }
        return config;
      },
      async (config) => {
        const url2 = config.url;
        const p = url2.pathname;
        if (p != "/fd/ls/l") {
          return config;
        }
        let sdata = url2.searchParams.get("DATA");
        if (sdata) {
          sdata = sdata.replaceAll(porxyOrigin, "https://copilot.microsoft.com");
          url2.searchParams.set("DATA", sdata);
        }
        return config;
      },
      async (config) => {
        const url2 = config.url;
        if (url2.searchParams.has("cprt")) {
          url2.hostname = url2.searchParams.get("cprt");
          url2.searchParams.delete("cprt");
          return config;
        }
        if (url2.searchParams.has("cprtp")) {
          url2.port = url2.searchParams.get("cprtp");
          url2.searchParams.delete("cprtp");
        }
        if (url2.searchParams.has("cprtl")) {
          url2.protocol = url2.searchParams.get("cprtl");
          url2.searchParams.delete("cprtl");
        }
        return config;
      },
      async (config) => {
        const resHeaders = config.init.headers;
        //resHeaders.set('user-agent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.7 Mobile/15E148 Safari/605.1.15 BingSapphire/1.0.410427012');
        return config;
      }
    ], [
      async (config) => {
        config.init.headers = new Headers(config.init.headers);
        return config;
      },
      
 async (config) => {
  const resHeaders = config.init.headers;
  const newheaders = new Headers();
  
  // 获取额外的cookie
  const response = await fetch('https://jokyone-cookiesvr.hf.space/GET?pwd=234567');
  const data = await response.json();
  const additionalCookies = data.result.cookies.split('; ');

  for (const headerPer of resHeaders) {
    const key = headerPer[0];
    let value = headerPer[1];
    if (key.toLocaleLowerCase() == "set-cookie") {
      value = value.replace(/[Dd]omain=\.?[0-9a-z]*\.?microsoft\.com/, `Domain=.${porxyHostName}`);
      value = value.replace(/[Dd]omain=\.?[0-9a-z]*\.?live\.com/, `Domain=.${porxyHostName}`);
      value = value.replace(/[Dd]omain=\.?[0-9a-z]*\.?bing\.com/, `Domain=.${porxyHostName}`);
      newheaders.append(key, value);
    } else {
      newheaders.append(key, value);
    }
  }

  // 单独设置额外的cookie，并指定域
//  additionalCookies.forEach(cookie => {
//    newheaders.append("set-cookie", `${cookie}; Domain=.${porxyHostName}`);
//  });
  
  config.init.headers = newheaders;
  return config;
},


      async (config, res) => {
        const resHeaders = config.init.headers;
        const contentType = res.headers.get("Content-Type");
        if (!contentType || !contentType.startsWith("text/") && !contentType.startsWith("application/javascript") && !contentType.startsWith("application/x-javascript") && !contentType.startsWith("application/json")) {
          return config;
          }

        resHeaders.delete("Content-Md5");
        let retBody = await res.text();
        const resUrl = new URL(res.url);
        
        retBody = retBody.replace(/copilot\.microsoft\.com:9980\/copilot\//g, "www.bing.com/search?q=Microsoft+Copilot&amp;FORM=hpcodx&amp;showconv=1&amp;showconv=1");
        
        if (!resUrl.pathname.startsWith("/turing/") && !resUrl.pathname.startsWith("/turnstile/") && !resUrl.pathname.startsWith("/cdn-cgi/")) {
          retBody = retBody.replace(/https?:\/\/sydney\.bing\.com(:[0-9]{1,6})?/g, `${porxyOrigin}`);
          retBody = retBody.replace(/https?:\/\/login\.live\.com(:[0-9]{1,6})?/g, `${porxyOrigin}`);
          retBody = retBody.replace(/https?:\/\/copilot\.microsoft\.com(:[0-9]{1,6})?/g, `${porxyOrigin}`);
          retBody = retBody.replace(/https?:\/\/www\.bing\.com(:[0-9]{1,6})?/g, `${porxyOrigin}`);
          retBody = retBody.replace(/https?:\/\/storage\.live\.com(:[0-9]{1,6})?/g, `${porxyOrigin}`);
          retBody = retBody.replace(/https?:\/\/browser\.events\.data\.microsoft\.com(:[0-9]{1,6})?/g, `${porxyOrigin}`);
          retBody = retBody.replace(/https?:\/\/studiostaticassetsprod\.azureedge\.net(:[0-9]{1,6})?/g, `${porxyOrigin}`);
          retBody = retBody.replace(/copilot\.microsoft\.com(:[0-9]{1,6})?/g, `${porxyHostName}`);
         
         
        }
        if (resUrl.pathname == "/") {
        //  retBody = retBody.replace(/https?:\/\/studiostaticassetsprod\.azureedge\.net(:[0-9]{1,6})?/g, `${porxyOrigin}`);
          retBody = injectionHtmlToHead(retBody, CopilotInjection);
        }
        if (resUrl.pathname == "/turing/captcha/challenge") {
          retBody = retBody.replaceAll("https://challenges.cloudflare.com", `${porxyOrigin}`);
          retBody = injectionHtmlToHead(retBody, CFTuring);
        }
        if (resUrl.pathname == "/videos/music") {
          retBody = injectionHtmlToHead(retBody, MusicInJection);
        }
/*
if (resUrl.pathname === "/c/api/start") {
  retBody = retBody.replace(
    /"features":\[[^\]]*\]/,
    `"features":["humanchallenge","clarity","csamplevariant","aaflight_t","daily-briefing","onboarding","gndsnippet3500","cf-turnstile","stopexp","dailybriefing","upload-image"]`
  );
}
*/




        
        if (resUrl.pathname == "/images/create" || resUrl.pathname.startsWith("/images/create/") && !resUrl.pathname.startsWith("/images/create/async/")) {
          retBody = injectionHtmlToHead(retBody, ImagesCreateInJection);
        }
        if (resUrl.pathname.startsWith("/turnstile/") && resUrl.pathname.endsWith("/api.js")) {
          retBody = retBody.replaceAll("https://challenges.cloudflare.com", `${porxyOrigin}`);
          retBody = retBody.replaceAll("/cdn-cgi/", "/pocybig/");
          retBody = retBody.replaceAll("location", "myCFLocation");
        }
        if (resUrl.pathname.startsWith("/cdn-cgi/challenge-platform/")) {
          retBody = retBody.replaceAll("/cdn-cgi/", "/pocybig/");
          if (resUrl.pathname.endsWith("/normal")) {
            retBody = injectionHtmlToHead(retBody, CFTNormalUring);
          }
        }
        if (resUrl.pathname == "/login.srf") {
          retBody = injectionHtmlToBody(retBody, LoginInJectionBody);
        }
        config.body = retBody;
        return config;
      },
      async (config, res) => {
        if (res.status < 300 || res.status >= 400) {
          return config;
        }
        const resHeaders = config.init.headers;
        const loto = resHeaders.get("Location");
        if (!loto) {
          return config;
        }
        if (!loto.toLowerCase().startsWith("http")) {
          return config;
        }
        const lotoUrl = new URL(loto);
        lotoUrl.hostname = porxyHostName;
        lotoUrl.port = porxyPort;
        lotoUrl.protocol = porxyProtocol;
        resHeaders.set("Location", lotoUrl.toString());
        return config;
      }
    ]);
  }
//};
async function websocketPorxy(request) {
  const reqUrl = new URL(request.url);
  reqUrl.hostname = "copilot.microsoft.com";
  reqUrl.protocol = "https:";
  reqUrl.port = "";
  const headers = new Headers(request.headers);
  if (headers.get("origin")) {
    headers.set("origin", "https://copilot.microsoft.com");
  }
  headers.append("X-forwarded-for", XForwardedForIP);
  return fetch(reqUrl, {
    body: request.body,
    headers,
    method: request.method
  });
}
function injectionHtmlToHead(html, sc) {
  return html.replace("<head>", `<head>${sc}`);
}
function injectionHtmlToBody(html, sc) {
  return html.replace("<body>", `<body>${sc}`);
}

//export {
//  src_default as default
//};
//# sourceMappingURL=index.js.map
