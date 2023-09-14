import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { DB, readDB } from "@/app/libs/DB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  readDB();
  const foundUser = DB.users.find(
    (x) => x.username === username && x.password === password
  );
  if (!foundUser)
    return NextResponse.json(
      {
        ok: false,
        message: "Username or Password is incorrect",
      },
      { status: 400 }
    );

  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];

  let username = null;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    username = payload.username;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({ ok: true, token });
  writeDB();
};
