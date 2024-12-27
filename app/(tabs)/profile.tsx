import { supabase } from "@/lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "@/styles/global";


export default function Profile() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Input
        label="User ID"
        value={session?.user.id}
        inputStyle={{ color: "white" }}
        disabled
      ></Input>
      <Input
        label="Email"
        value={session?.user.email}
        inputStyle={{ color: "white" }}
        disabled
      ></Input>
      <Button buttonStyle={{ backgroundColor: "red", height: 54 }} titleStyle={[styles.buttonTextStyle]} onPress={() => {
        supabase.auth.signOut();
      }}>
        Log out
      </Button>
    </View>
  );
}
