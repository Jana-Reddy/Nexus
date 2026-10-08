import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

async function proxy(req: NextRequest) {
  try {
    // Extract the path after /api/
    const path = req.nextUrl.pathname.replace(/^\/api\//, "");
    
    // Construct the URL to the internal backend service
    const backendUrl = new URL(path, BACKEND_URL);
    backendUrl.search = req.nextUrl.search;
    
    const headers = new Headers(req.headers);
    headers.set("host", backendUrl.host);
    
    // We cannot pass a body on GET/HEAD
    const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
    const body = hasBody ? await req.blob() : undefined;
    
    const response = await fetch(backendUrl.toString(), {
      method: req.method,
      headers,
      body,
      redirect: 'manual'
    });
    
    const resHeaders = new Headers(response.headers);
    // Remove conflicting headers from the proxy response if needed
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: resHeaders
    });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
export const OPTIONS = proxy;
