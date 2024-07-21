import { NextResponse } from "next/server";
import client from "@/app/db";

export async function POST(req) {
  const { userEmail, code } = await req.json();
  try {
    const user = await client.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return NextResponse.json({
        message: "Unable to found user with this email",
        success: false,
      });
    }

    if (user.verificationOTP === code) {
      await client.user.update({
        where: { email: userEmail },
        data: {
          emailVerified: true,
        },
      });
      return NextResponse.json({
        message: "Email verified successfully!",
        success: true,
      });
    } else
      return NextResponse.json({
        message: "Code mistmatch, pls enter the correct code",
        success: false,
      });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong! Unable to verify email",
      success: false,
    });
  }
}
