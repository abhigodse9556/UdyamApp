export type User = {
  id?: string;
  name: string;
  email: string;
  mobile: string;
  password?: string;
};

export const GET_USERS = `
  query {
    users {
      id
      name
      email
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
      mobile: $mobile
      password: $password
    ) {
      id
      name
      email
      mobile
    }
  }
`;

export const LOGIN_USER = `
  mutation LoginUser(
    $email: String!
    $password: String!
  ) {
    loginUser(
      email: $email
      password: $password
    ) {
        user {
            email
            name
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
    $mobile: String
    $password: String                                                                   
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      mobile: $mobile
      password: $password
    ) {
      id
      name
      email
      mobile
    }
  }
`;
