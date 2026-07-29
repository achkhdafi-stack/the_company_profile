// src/lib/supabaseClient.js
//
// Client Supabase pusat. Import ini di mana pun kamu perlu
// query database, misalnya: import { supabase } from "../../lib/supabaseClient";
//
// WAJIB: isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di file .env
// (lihat .env.example). Jangan pernah commit .env ke git.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Supabase belum dikonfigurasi. Pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sudah diisi di file .env"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);