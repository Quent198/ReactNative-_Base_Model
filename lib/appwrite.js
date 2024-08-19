import { Account, Client, ID } from "react-native-appwrite";

export const appwriteconfig = {
  endppoint: "https://cloud.appwrite.io/v1",
  platform: "com.dwwm.project",
  projectId: "66c34c410021de2f653f",
  databaseId: "66c34cfd0033ce5c8723",
  userCollection: "66c34d220001394d73f8",
};

const client = new Client();
const account = new Account(client);

client
  .setEndpoint(appwriteconfig.endppoint)
  .setProject(appwriteconfig.projectId)
  .setPlatform(appwriteconfig.platform);

export const createUser = (email,password, username) => {
  account.create(ID.unique(), email, password, username).then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};