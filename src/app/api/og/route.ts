import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "url 파라미터가 필요합니다." }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "URL을 불러올 수 없습니다." }, { status: 400 });
    }

    const html = await response.text();

    const getMetaContent = (property: string): string | null => {
      const match =
        html.match(new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, "i")) ||
        html.match(new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, "i"));
      return match?.[1] ?? null;
    };

    const title =
      getMetaContent("og:title") ||
      html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ||
      null;
    const description =
      getMetaContent("og:description") ||
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)?.[1] ||
      null;
    const image = getMetaContent("og:image") || null;
    const ogUrl = getMetaContent("og:url") || url;

    return NextResponse.json({ title, description, image, url: ogUrl });
  } catch {
    return NextResponse.json({ error: "OG 정보를 불러올 수 없습니다." }, { status: 500 });
  }
}
