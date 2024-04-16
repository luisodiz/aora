import { Client } from 'react-native-appwrite'
import { Account, ID } from 'react-native-appwrite/src'

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

export const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe').then(
    function (response) {
      console.log(response)
    },
    function (error) {
      console.log(error)
    }
  )
}
