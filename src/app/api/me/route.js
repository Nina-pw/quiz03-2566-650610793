import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Pimmada Wangsombat",
    studentId: "650610793",
  });
};
