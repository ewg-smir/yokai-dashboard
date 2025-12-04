import { NextResponse } from "next/server";
import { db } from "../db";

export async function POST(req: Request) {
  const { id, status } = await req.json();

  await new Promise((r) => setTimeout(r, 800));

  if (Math.random() < 0.3) {
    const action = status === "CAPTURED" ? "Containment" : "Release";
    return NextResponse.json(
      { message: `${action} Sequence Failed!` },
      { status: 500 }
    );
  }

  const updated = db.update(id, { status });
  return NextResponse.json(updated);
}
