import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/app/service/mailService";
import { generateOTP } from "@/app/utils";
import client from "@/app/db";

const saltRounds = 10;

export async function POST(req) {
  const { name, email, password } = await req.json();
  try {
    const user = await client.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json({
        message: "A user is already registered with this Email",
        success: false,
      });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const otp = generateOTP();

    await client.user.create({
      data: {
        name,
        email,
        password: hash,
        verificationOTP: otp,
        // userCategories: [],
      },
    });

    await sendMail("Verificaiton email for E-commerce", email, otp);

    return NextResponse.json({
      message: "User registered successfully!",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong! Unable to signup",
      success: false,
    });
  }
}
