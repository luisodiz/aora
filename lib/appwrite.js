import { Client } from 'react-native-appwrite'
import {
  Account,
  Avatars,
  Databases,
  ID,
  Query,
} from 'react-native-appwrite/src'

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.aora',
  projectId: '661e3a934bd8bb1d07a0',
  databaseId: '661e3b6cad52b9e92b14',
  userCollectionId: '661e3b9c3308ac82dcd0',
  videoCollectionId: '661e3bcc651268dc677e',
  storageId: '661e3cd27e2b50e069cf',
}

// Init your react-native SDK
const client = new Client()

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error
    const avatarUrl = avatars.getInitials(username)
    await signIn(email, password)

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
    )
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password)
    return session
  } catch (error) {
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.log(error)
  }
}
