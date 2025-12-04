import { NextResponse } from "next/server";
import { db } from "../db";

export async function POST(req: Request) {
  // Теперь ожидаем status в теле запроса
  const { id, status } = await req.json();

  // Имитация задержки
  await new Promise((r) => setTimeout(r, 800));

  // 30% вероятность ошибки (сбой ловушки или сбой системы освобождения)
  if (Math.random() < 0.3) {
    const action = status === "CAPTURED" ? "Containment" : "Release";
    return NextResponse.json(
      { message: `${action} Sequence Failed!` },
      { status: 500 }
    );
  }

  // Обновляем статус в базе
  const updated = db.update(id, { status });
  return NextResponse.json(updated);
}
