import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE = "https://www.improvemeinstitute.com";
const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data");
const PUBLIC_REF_DIR = path.join(ROOT, "public", "ref");

const ensureDir = async (target) => {
  await mkdir(path.dirname(target), { recursive: true });
};

const fetchText = async (url) => {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status}`);
  }
  return res.text();
};

const tryFetchText = async (url) => {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });
  if (!res.ok) {
    return null;
  }
  return res.text();
};

const toRoutePath = (url) => {
  const pathname = new URL(url).pathname.replace(/\/+$/, "");
  return pathname || "/";
};

const toFileSlug = (routePath) =>
  routePath === "/" ? "home" : routePath.replace(/^\/|\/$/g, "").replace(/\//g, "__");

const decodeNextImageUrl = (value) => {
  if (!value.includes("/_next/image/?url=")) return value;
  const match = value.match(/\/_next\/image\/\?url=([^"&]+)(?:&|&amp;|")/);
  if (!match) return value;
  return decodeURIComponent(match[1]);
};

const rewriteAssetValue = (value) => {
  const nextImage = decodeNextImageUrl(value);
  if (nextImage !== value) {
    return nextImage.startsWith("/") ? `/ref${nextImage}` : value;
  }

  if (value.startsWith("/_next/")) return `/ref${value}`;
  if (value.startsWith("/favicon/")) return `/ref${value}`;
  if (value.startsWith("/logo")) return `/ref${value}`;
  if (value.startsWith("/overlay_")) return `/ref${value}`;
  if (value.startsWith("/whatsapp-")) return `/ref${value}`;
  if (value.startsWith("/student-")) return `/ref${value}`;
  if (value.startsWith("/google")) return `/ref${value}`;
  if (/\.(png|svg|jpg|jpeg|webp|ico|woff2)(\?|$)/i.test(value) && value.startsWith("/")) {
    return `/ref${value}`;
  }
  return value;
};

const transformImageAttributes = (html) => {
  let output = html;

  output = output.replace(/(src|href)=["']([^"']+)["']/gi, (_, attr, value) => {
    return `${attr}="${rewriteAssetValue(value)}"`;
  });

  output = output.replace(/srcset=["']([^"']+)["']/gi, (_, value) => {
    const rewritten = value
      .split(",")
      .map((part) => {
        const [url, descriptor] = part.trim().split(/\s+/, 2);
        return `${rewriteAssetValue(url)}${descriptor ? ` ${descriptor}` : ""}`;
      })
      .join(", ");
    return `srcset="${rewritten}"`;
  });

  output = output.replace(/imagesrcset=["']([^"']+)["']/gi, (_, value) => {
    const rewritten = value
      .split(",")
      .map((part) => {
        const [url, descriptor] = part.trim().split(/\s+/, 2);
        return `${rewriteAssetValue(url)}${descriptor ? ` ${descriptor}` : ""}`;
      })
      .join(", ");
    return `imagesrcset="${rewritten}"`;
  });

  output = output.replace(/style="([^"]*?)opacity:\s*0([^"]*?)"/gi, (_, before, after) => {
    return `style="${before}opacity:1${after}"`;
  });

  return output;
};

const stripScripts = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "");

const extractStylesheets = (html) => {
  const matches = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/gi)];
  return [...new Set(matches.map((match) => rewriteAssetValue(match[1])))];
};

const extractAssets = (html, stylesheets) => {
  const assets = new Set();
  const attributePattern = /(src|href)=["']([^"']+)["']/gi;
  for (const match of html.matchAll(attributePattern)) {
    const rewritten = rewriteAssetValue(match[2]);
    if (rewritten.startsWith("/ref/")) {
      assets.add(rewritten.replace(/^\/ref/, ""));
    }
  }

  const srcsetPattern = /(srcset|imagesrcset)=["']([^"']+)["']/gi;
  for (const match of html.matchAll(srcsetPattern)) {
    const parts = match[2].split(",");
    for (const part of parts) {
      const [url] = part.trim().split(/\s+/, 1);
      const rewritten = rewriteAssetValue(url);
      if (rewritten.startsWith("/ref/")) {
        assets.add(rewritten.replace(/^\/ref/, ""));
      }
    }
  }

  stylesheets.forEach((href) => assets.add(href.replace(/^\/ref/, "")));
  return [...assets];
};

const extractMain = (html) => {
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return mainMatch ? mainMatch[1] : "";
};

const extractTitle = (html) => {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return match ? match[1] : "Improve ME Institute";
};

const extractDescription = (html) => {
  const match = html.match(/<meta name="description" content="([^"]*)"/i);
  return match ? match[1] : "";
};

const downloadAsset = async (assetPath) => {
  const url = `${SITE}${assetPath}`;
  const targetPath = path.join(PUBLIC_REF_DIR, assetPath.replace(/^\//, ""));
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch asset ${url}: ${res.status}`);
  }
  let content = Buffer.from(await res.arrayBuffer());
  const isCss = assetPath.endsWith(".css");
  if (isCss) {
    let css = content.toString("utf8");
    css = css.replace(/url\((['"]?)(\/[^)'"]+)\1\)/g, (_, quote, asset) => {
      return `url(${quote}/ref${asset}${quote})`;
    });
    content = Buffer.from(css, "utf8");
  }
  await ensureDir(targetPath);
  await writeFile(targetPath, content);
};

const main = async () => {
  await mkdir(DATA_DIR, { recursive: true });
  await mkdir(PUBLIC_REF_DIR, { recursive: true });

  const sitemapXml = await fetchText(`${SITE}/sitemap.xml`);
  const urls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

  const pages = [];
  const assetSet = new Set();
  let manifestStylesheets = [];

  for (const url of urls) {
    const html = await tryFetchText(url);
    if (!html) {
      continue;
    }
    const title = extractTitle(html);
    const description = extractDescription(html);
    const routePath = toRoutePath(url);
    const mainHtml = transformImageAttributes(stripScripts(extractMain(html)));
    const stylesheets = extractStylesheets(html);

    if (routePath === "/") {
      manifestStylesheets = stylesheets;
    }

    extractAssets(html, stylesheets).forEach((asset) => assetSet.add(asset));

    pages.push({
      routePath,
      slug: toFileSlug(routePath),
      title,
      description,
      html: mainHtml,
    });
  }

  const requiredAssets = [...assetSet];
  for (const asset of requiredAssets) {
    await downloadAsset(asset);
  }

  await writeFile(
    path.join(DATA_DIR, "reference-manifest.json"),
    JSON.stringify(
      {
        stylesheets: manifestStylesheets,
      },
      null,
      2
    )
  );

  await writeFile(path.join(DATA_DIR, "site-pages.json"), JSON.stringify(pages, null, 2));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
