// src/index.ts
import { proxyLinkHttp,usIps } from "./proxyLinkHttp.js";
import { isNetcraftIp, isNetcraftUa} from "./requestBlocker.js";
import CopilotInjection from "./CopilotInjection.html";

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
        
      //代理原始地址
        url2.hostname = "copilot.microsoft.com";
        
      //代理加载核心bundle.js文件
         if (p.startsWith("/bundle-cmc/") || p.startsWith("/bundle-wpwa/")) {
          url2.hostname = "studiostaticassetsprod.azureedge.net";
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
          resHeaders.set("Referer", refererUrl.toString());
        }
        return config;
      }
      
    ], [
      
      async (config) => {
        config.init.headers = new Headers(config.init.headers);
        return config;
      },
 //注入修改首页以加载核心bundle.js文件
      async (config, res) => {
        const resHeaders = config.init.headers;
        const contentType = res.headers.get("Content-Type");
        if (!contentType || !contentType.startsWith("text/") && !contentType.startsWith("application/javascript") && !contentType.startsWith("application/x-javascript") && !contentType.startsWith("application/json")) {
          return config;
          }
        resHeaders.delete("Content-Md5");
        let retBody = await res.text();
        const resUrl = new URL(res.url);         
        if (resUrl.pathname == "/") {
        retBody = injectionHtmlToHead(retBody, CopilotInjection);
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
