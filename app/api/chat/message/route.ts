import { createSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from("chats")
      .select("*")
      // Filter by the logged-in user so they don't see everyone's chats!
      .eq("user_id", userId) 
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Error:", error.message);
      return NextResponse.json([], { status: 200 }); 
    }

    return NextResponse.json(data || []);
  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json([], { status: 200 });
  }
}