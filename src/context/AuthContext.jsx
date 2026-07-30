// src/context/AuthContext.jsx
//
// Context untuk status login admin, pakai Supabase Auth.
// Bungkus <App /> dengan <AuthProvider> di main.jsx (sejajar dengan
// <LanguageProvider>).

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek sesi yang sudah tersimpan (misal habis refresh halaman)
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Dengarkan perubahan status login (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin` },
    });

  const signOut = () => supabase.auth.signOut();

  // Update nama tampilan (disimpan di user_metadata.full_name Supabase Auth)
  const updateProfile = async ({ fullName }) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });
    if (!error && data?.user) {
      // Refresh session lokal supaya perubahan langsung kelihatan di UI
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session);
    }
    return { data, error };
  };

  return (
    <AuthContext.Provider value={{ session, loading, signIn, signInWithGoogle, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>");
  return ctx;
}