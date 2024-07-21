import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import client from "@/app/db";

// const client = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await client.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user)
      return NextResponse.json({
        message: "User not registered with this email",
        success: false,
      });

    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      return NextResponse.json({
        message: "In-correct password! Pls try again",
        success: false,
      });
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set("token", token, { expires: Date.now() + oneDay });

    return NextResponse.json({
      message: "Sign in Successfull!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong! Unable to signin",
      success: false,
    });
  }
}
