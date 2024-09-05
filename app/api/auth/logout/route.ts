import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    cookies().delete("X-Auth-Token");
    return new Response(null, {
        status: 204,
    });
}