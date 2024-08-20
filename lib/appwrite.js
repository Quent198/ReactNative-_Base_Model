import {
  Account,
  Client,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteconfig = {
  endppoint: "https://cloud.appwrite.io/v1",
  platform: "com.dwwm.project",
  projectId: "66c34c410021de2f653f",
  databaseId: "66c34cfd0033ce5c8723",
  videoCollectionId: "66c453e8000ceb490f10",
  userCollection: "66c34d220001394d73f8",
  storageId: "66c455790011816017fc",
};

const client = new Client();
const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(appwriteconfig.endppoint)
  .setProject(appwriteconfig.projectId)
  .setPlatform(appwriteconfig.platform);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatar.getInitials(username);
    const newUser = await databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.userCollection,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log("create user error", error);
    throw new Error(error);
  }
};

export async function signIn(email, password) {
  try {
    // await account.deleteSessions();
    const session = await account.createEmailPasswordSession(email, password);
    console.log("User signed in", session);
    return session;
  } catch (error) {
    console.log("sign in error", error);
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current account");
    const currentUser = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.userCollection,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser.documents.length)
      throw new Error("No current user documents");
    return currentUser.documents(0);
  } catch (error) {
    console.log("get current user error", error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    console.log("User signed out");
    return session;
  } catch (error) {
    console.log("sign out error", error);
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;
  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteconfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteconfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Type de fichier invalide");
    }
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log("get file preview error", error);
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadFile = await storage.createFile(
      appwriteconfig.storageId,
      ID.unique(),
      asset
    );
    console.log(uploadFile);
    const fileUrl = await getFilePreview(uploadFile.$id, type);
    console.log("File URL", fileUrl);
    return fileUrl;
  } catch (error) {
    console.log("upload file error", error);
    throw new Error(error);
  }
};

export const createVideo = async (form) => {
  console.log("form data", form);

  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    console.log("thumbnail URL", thumbnailUrl);
    console.log("video URL", videoUrl);

    if (!thumbnailUrl || !videoUrl) {
      throw new Error("Echec du chargement de fichiers ");
    }

    const newPost = await databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (error) {
    console.log("create video error", error);
    throw new Error(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(5))]
    );

    return posts.documents;
  } catch (error) {
    console.log("get all posts error", error);
    throw new Error(error);
  }
};
