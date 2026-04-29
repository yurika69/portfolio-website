export const config = { runtime: "edge" };

const _0xTARGET1 = (process.env.T1 || "").replace(/\/$/, "");
const _0xTARGET2 = (process.env.T2 || "").replace(/\/$/, "");
const _0xTARGET3 = (process.env.T3 || "").replace(/\/$/, "");
const _0xTARGET = _0xTARGET1 + "." + _0xTARGET2 + "." + _0xTARGET3;
const _0xPREFIX = "/api";

const _0xSTRIP = new Set([
  "host","connection","keep-alive","proxy-authenticate","proxy-authorization",
  "te","trailer","transfer-encoding","upgrade","forwarded",
  "x-forwarded-host","x-forwarded-proto","x-forwarded-port"
]);

function _0xdecode(s) {
  return s.split('').reverse().join('');
}

const _0xHANDLER = async function handler(req) {
  if (!_0xTARGET) {
    return new Response("Misconfigured: TARGET_DOMAIN is not set", { status: 500 });
  }

  try {
    const _0xurl = new URL(req.url);
    let _0xpath = _0xurl.pathname;

    if (_0xpath.startsWith(_0xPREFIX)) {
      _0xpath = _0xpath.slice(_0xPREFIX.length) || "/";
    }

    const targetUrl = _0xTARGET + _0xpath + _0xurl.search;

    const _0xheaders = new Headers();
    let _0xip = null;

    for (const [k, v] of req.headers) {
      const _0xk = k.toLowerCase();

      if (_0xSTRIP.has(_0xk)) continue;
      if (_0xk.startsWith("x-vercel-")) continue;

      if (_0xk === "x-real-ip") {
        _0xip = v;
        continue;
      }
      if (_0xk === "x-forwarded-for") {
        if (!_0xip) _0xip = v;
        continue;
      }

      _0xheaders.set(k, v);
    }

    if (_0xip) _0xheaders.set("x-forwarded-for", _0xip);

    const _0xmethod = req.method;
    const _0xhasBody = _0xmethod !== "GET" && _0xmethod !== "HEAD";

    const _0xfetchOpts = {
      method: _0xmethod,
      headers: _0xheaders,
      body: _0xhasBody ? req.body : undefined,
      duplex: "half",
      redirect: "manual"
    };

    return await fetch(targetUrl, _0xfetchOpts);
  } catch (err) {
    console.error(_0xdecode("rorre yaler:"), err);
    return new Response("Bad Gateway: Tunnel Failed", { status: 502 });
  }
};

export default _0xHANDLER;