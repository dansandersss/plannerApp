import {
  Client,
  Account,
  ID,
  Avatars,
  Storage,
  Databases,
  Query,
} from "appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  // platform: "com.sanders.taskflow",
  projectId: "66681f010005ab5d23b5",
  databaseId: "66681f1c0037e565d4c8",
  notesCollectionId: "666820bc00232139786a",
  todoCollectionId: "66682080003287a3b83a",
  tasksCollectionId: "6668202a002f27799905",
  projectsCollectionId: "66681f450033c1cfbe55",
  storageId: "6668228b000674e49c43",
  userCollectionId: "6668d5d800278af6786a",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId); // Your project ID
// .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Error creating account");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
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
    console.log(error);
    throw new Error(error.message);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No current account");

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0)
      throw new Error("No user document found");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export async function checkAuth() {
  try {
    await account.get();
    return true;
  } catch (error) {
    return false;
  }
}

export const addTask = async (title, priority, tags, desc, users) => {
  try {
    const createdAt = Date.now();
    await databases.createDocument(
      config.databaseId,
      config.tasksCollectionId,
      ID.unique(),
      { title, priority, tags, desc, users, createdAt: createdAt }
    );
  } catch (error) {
    console.log("Error", error.message);
    throw error;
  }
};

export const getLatestTasks = async (limit = 2) => {
  try {
    const tasks = await databases.listDocuments(
      config.databaseId,
      config.tasksCollectionId,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(limit),
        Query.notEqual("status", "completed"),
      ]
    );
    return tasks.documents || [];
  } catch (error) {
    console.log("Error fetching latest tasks", error.message);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const allTasks = await databases.listDocuments(
      config.databaseId,
      config.tasksCollectionId
    );
    return allTasks.documents;
  } catch (error) {
    console.log("Error fetching all tasks", error.message);
    throw error;
  }
};

export const getCompletedTasks = async (limit = 1) => {
  try {
    const tasks = await databases.listDocuments(
      config.databaseId,
      config.tasksCollectionId,
      [
        Query.orderDesc("$updatedAt"),
        Query.limit(limit),
        Query.equal("status", ["completed"]),
      ]
    );
    return tasks.documents || [];
  } catch (error) {
    console.log("Error fetching latest tasks", error.message);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await databases.updateDocument(
      config.databaseId,
      config.tasksCollectionId,
      taskId,
      { status }
    );
  } catch (error) {
    console.error("Error updating task status:", error.message);
    throw error;
  }
};

export const getTaskById = async (taskId) => {
  try {
    const task = await databases.getDocument(
      config.databaseId,
      config.tasksCollectionId,
      taskId
    );

    return task;
  } catch (error) {
    console.log("Error fetching task by ID", error.message);
    throw error;
  }
};

export const updateTaskById = async (taskId, updatedData) => {
  try {
    const updatedTask = await databases.updateDocument(
      config.databaseId,
      config.tasksCollectionId,
      taskId,
      updatedData
    );

    return updatedTask;
  } catch (error) {
    console.log("Error updating task by ID", error.message);
    throw error;
  }
};

export const deleteTaskById = async (taskId) => {
  try {
    await databases.deleteDocument(
      config.databaseId,
      config.tasksCollectionId,
      taskId
    );
  } catch (error) {
    console.log("Error deleting task by ID", error.message);
    throw error;
  }
};

export const getVitalTaks = async () => {
  try {
    const vitalTasks = await databases.listDocuments(
      config.databaseId,
      config.tasksCollectionId,
      [Query.orderDesc("$createdAt"), Query.equal("priority", ["High"])]
    );
    return vitalTasks.documents || [];
  } catch (error) {
    console.log("Error fetching all tasks", error.message);
    throw error;
  }
};

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.tasksCollectionId,
      [Query.search("title", query), Query.search("desc", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
