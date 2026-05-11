import { router } from "expo-router";
import { graphqlRequest } from "./graphql/client";
import { REFRESH_SESSION, RefreshSessionResponse } from "./graphql/user";
import { clearTokens, getRefreshToken, saveTokens } from "./token.service";

const bootstrapAuth = async () => {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    router.replace("/login");

    return;
  }

  try {
    const response = await graphqlRequest<RefreshSessionResponse>(
      REFRESH_SESSION,
      { refreshToken },
    );

    await saveTokens(
      response.refreshSession.accessToken,

      response.refreshSession.refreshToken,

      response.refreshSession.user.id,
    );

    router.replace("/register");
  } catch {
    await clearTokens();

    router.replace("/login");
  }
};

export default bootstrapAuth;
