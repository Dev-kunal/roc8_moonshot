import { verifyUserToken } from "@/app/authUtils";
import { NextResponse } from "next/server";
import client from "@/app/db";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const session = verifyUserToken(await req.cookies.get("token")?.value);
    if (!session)
      return NextResponse.json({ message: "Invaild Token, pls login again" });

    const currentPage = req.nextUrl.searchParams.get("currentPage");
    const categories = await client.category.findMany({
      skip: Number(currentPage) === 1 ? 0 : Number(currentPage - 1) * 6,
      take: 6,
    });
    return NextResponse.json({
      categories,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong!",
      success: false,
    });
  }
}
