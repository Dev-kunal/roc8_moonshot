import { verifyUserToken } from "@/app/authUtils";
import { NextResponse } from "next/server";
import client from "@/app/db";
import uniqBy from "lodash.uniqby";
export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const session = verifyUserToken(await req.cookies.get("token")?.value);
    if (!session)
      return NextResponse.json({ message: "Invaild Token, pls login again" });

    const userCategories = await client.userCategory.findMany({
      where: { userId: session.userId },
    });

    return NextResponse.json({
      userCategories: uniqBy(userCategories, "categoryId"),
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

export async function POST(req) {
  try {
    const { updates } = await req.json();
    const session = verifyUserToken(await req.cookies.get("token")?.value);
    if (!session)
      return NextResponse.json({ message: "Invaild Token, pls login again" });
    const uniqUpdates = uniqBy(updates, "categoryId");
    const userCatergoriesToAdd = uniqUpdates.filter((u) => u.isSelected);
    const userCatergoriesToDelete = uniqUpdates.filter((u) => !u.isSelected);

    await client.$transaction(async (tx) => {
      if (userCatergoriesToAdd.length > 0)
        await tx.userCategory.createMany({
          data: userCatergoriesToAdd.map((item) => ({
            categoryId: item.categoryId,
            userId: session.userId,
          })),
          skipDuplicates: true,
        });

      if (userCatergoriesToDelete.length > 0)
        await tx.userCategory.deleteMany({
          where: {
            AND: [
              {
                categoryId: {
                  in: userCatergoriesToDelete.map((c) => c.categoryId),
                },
              },
              { userId: session.userId },
            ],
          },
        });
    });

    return NextResponse.json({
      message: "updated preferences",
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
