import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userMessage =
      body.messages?.[body.messages.length - 1]?.content || "";

    const response = await fetch("https://ninavos.app.n8n.cloud/webhook/9b63b879-9dfd-4c3d-a92c-314983ec6225", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: userMessage,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      role: "assistant",
      content: data.reply,
    });
  } catch (error) {
    return NextResponse.json({
      role: "assistant",
      content: "Er ging iets fout met de chatbot.",
    });
  }
}
