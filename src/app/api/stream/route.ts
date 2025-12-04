import { db } from "../db";

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Отправляем событие каждые 5 секунд
      const interval = setInterval(() => {
        const updated = db.randomUpdate();
        if (updated) {
          const data = JSON.stringify(updated);
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }
      }, 5000);

      return () => clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
