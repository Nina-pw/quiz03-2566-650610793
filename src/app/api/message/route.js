import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();
  const roomId = request.nextUrl.searchParams.get("roomId");
  const messages = DB.messages;
  const foundRooms = DB.messages.find((x) => x.roomId !== roomId);
  let filtered = messages;
  if (roomId !== null) {
    filtered = filtered.filter((std) => std.roomId === roomId);
  }
  return NextResponse.json({ ok: true, messages: filtered });
  if (foundRooms)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
};

export const POST = async (request) => {
  readDB();
  const foundIndex = DB.messages.findIndex((std) => std.roomId === body.roomId);
  if (foundIndex === -1)
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId: DB.messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();
  if (payload)
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
  const foundIndex = DB.messages.findIndex((std) => std.roomId === body.roomId);
  if (foundIndex === -1)
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
