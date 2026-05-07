
import { createSupabaseClient } from "@/lib/supabase";

export async function GET(
  req: Request,
  // 2. In Next.js 15+, params is a Promise that must be awaited
  { params }: { params: Promise<{ chatId: string }> } 
) {
  try {
    // 3. Await the params
    const { chatId } = await params;

    // 4. Initialize the supabase client using your exported function
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase Error:", error.message);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return Response.json(data);
  } catch (err) {
    console.error("Route Error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}