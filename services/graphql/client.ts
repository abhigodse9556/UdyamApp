const GRAPHQL_URL = `${process.env.EXPO_PUBLIC_GRAPHQL_BACKEND_URL}`;

type GraphQLResponse<T> = {
  data?: T;
  errors?: {
    message: string;
  }[];
};

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("No data received");
  }

  return json.data;
}
