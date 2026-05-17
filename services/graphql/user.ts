export type User = {
  id?: string;
  name: string;
  email: string;
  userName: string;
  mobile: string;
  password?: string;
};

export const GET_USERS = `
  query {
    users {
      id
      name
      email
      userName
      mobile
      stores {
        id
        storeName
      }
    }
  }
`;

export const CREATE_USER = `
  mutation CreateUser(
    $name: String!
    $email: String!
    $mobile: String!
    $password: String!
  ) {
    createUser(
      name: $name
      email: $email
      userName: $userName
      mobile: $mobile
      password: $password
    ) {
      id
      name
      email
      userName
      mobile
    }
  }
`;

export const LOGIN_USER = `
  mutation LoginUser(
    $emailOrUserName: String!
    $password: String!
    $deviceInfo: String
  ) {
    loginUser(
      emailOrUserName: $emailOrUserName
      password: $password
      deviceInfo: $deviceInfo
    ) {
        user {
            id
            name
            email
            userName
          }
      accessToken
      refreshToken
    }
  }
`;

export const REFRESH_SESSION = `
  mutation RefreshSession(
    $refreshToken: String!
  ) {
    refreshSession(
      refreshToken: $refreshToken
    ) {
        user {
            email
            name
            userName
            id
          }
      accessToken
      refreshToken
    }
  }
`;

export const UPDATE_USER = `
  mutation UpdateUser(
    $id: String!
    $name: String
    $email: String
    $userName: String
    $mobile: String
    $password: String                                                                   
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      userName: $userName
      mobile: $mobile
      password: $password
    ) {
      id
      name
      email
      userName
      mobile
    }
  }
`;

export const LOGOUT_USER = `
mutation LogoutUser($refreshToken: String!) {
  logoutUser(refreshToken: $refreshToken)
}
`;

export type LoginUserResponse = {
  loginUser: {
    user: {
      id: string;
      name: string;
      email: string;
      userName: string;
    };
    accessToken: string;
    refreshToken: string;
  };
};

export type RefreshSessionResponse = {
  refreshSession: {
    user: {
      id: string;
      name: string;
      email: string;
      userName: string;
    };
    accessToken: string;
    refreshToken: string;
  };
};
