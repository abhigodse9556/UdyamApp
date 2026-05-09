import { graphqlRequest } from "@/services/graphql/client";
import { GET_USERS, User } from "@/services/graphql/user";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getShopOwner } from "../services/shopOwner";

export default function Index() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await graphqlRequest<{
          users: User[];
        }>(GET_USERS);

        setUsers(response.users);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      const owner = await getShopOwner();
      if (!owner) {
        router.replace("/(tabs)");
      } else {
        router.replace("/register");
      }
    };

    checkUser();
  }, [router]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
