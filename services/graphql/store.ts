export type Store = {
  userId: string;
  storeName: string;
  storeCode: string;
  storeShortName?: string;
  contactPersonName?: string;
  businessEmail?: string;
  businessWhatsapp?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  gstin?: string;
  licence?: string;
};

export const CREATE_STORE = `
  mutation CreateStore(
    $userId: String!
    $storeName: String!
    $storeShortName: String
    $contactPersonName: String
    $businessEmail: String
    $businessWhatsapp: String
    $phone: String
    $addressLine1: String
    $addressLine2: String
    $city: String
    $state: String
    $country: String
    $pincode: String
    $gstin: String
    $licence: String
  ) {
    createStore(
      userId: $userId
      storeName: $storeName
      storeShortName: $storeShortName
      contactPersonName: $contactPersonName
      businessEmail: $businessEmail
      businessWhatsapp: $businessWhatsapp
      phone: $phone
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      city: $city
      state: $state
      country: $country
      pincode: $pincode
      gstin: $gstin
      licence: $licence
    ) {
        id
        storeName
        storeCode
        userId
    }
  }`;

export type CreateStoreResponse = {
  createStore: {
    id: string;
    storeName: string;
    storeCode: string;
    userId: string;
  };
};
