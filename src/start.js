import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import cors from 'cors'

const app = express()

app.use(cors())

const homePath = '/graphiql'
const URL = 'http://localhost'
const PORT = 3001
const MONGO_URL = 'mongodb://localhost:27017/coe'



export const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL)

    const typeDefs = [`
      type Query {
        assessments: [Assessment]
      }

      type Assessment {
        code: String
        title: String
        categories: [Category]
      }

      type Category {
        code: String
        label: String
        assessment: Assessment
        questions: [Question]
      }

      type Question {
        name: String
        label: String
        category: Category
      }

      schema {
        query: Query 
      }
    `]

    const resolvers = {
      Query: {
        assessments: async () => {
          return (await db.collection('assessments').find({},{code:1, title:1}).toArray())
        }
      },
      Assessment: {
        categories: async ({code}) => {
          return (await db.collection('categories').find({assessment_code: code},{code:1, label:1}).toArray())
        }
      },
      Category: {
        assessment: async ({code}) => {
          let category = await db.collection('categories').findOne({code: code},{assessment_code:1})
          let assessment = await db.collection('assessments').findOne({code: category.assessment_code},{code:1, title:1})
          return assessment
        }, 
        questions: async ({code}) => {
          return await db.collection('categories').aggregate([
            { "$match": {code: 'design_quality'}},
            { "$unwind": "$questions" }, 
            { "$project": {  
              name: "$questions.name",  
              label: "$questions.label"
            }}
            ]).toArray()
        }
      },
      Question: {
        category: async ({name}) => {
          return await db.collection('categories').findOne({"questions.name": name},{code: 1, label: 1})
        }
      }
    }

    // const oldResolvers = {
    //   Query: {
    //     post: async (root, {_id}) => {
    //       return prepare(await Posts.findOne(ObjectId(_id)))
    //     },
    //     posts: async () => {
    //       return (await Posts.find({}).toArray()).map(prepare)
    //     },
    //     comment: async (root, {_id}) => {
    //       return prepare(await Comments.findOne(ObjectId(_id)))
    //     },
    //   },
    //   Post: {
    //     comments: async ({_id}) => {
    //       return (await Comments.find({postId: _id}).toArray()).map(prepare)
    //     }
    //   },
    //   Comment: {
    //     post: async ({postId}) => {
    //       return prepare(await Posts.findOne(ObjectId(postId)))
    //     }
    //   },
    //   Mutation: {
    //     createPost: async (root, args, context, info) => {
    //       const res = await Posts.insertOne(args)
    //       return prepare(res.ops[0])  // https://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html#~insertOneWriteOpResult
    //     },
    //     createComment: async (root, args) => {
    //       const res = await Comments.insert(args)
    //       return prepare(await Comments.findOne({_id: res.insertedIds[1]}))
    //     },
    //   },
    // }

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    })


    app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))


    app.use(homePath, graphiqlExpress({
      endpointURL: '/graphql'
    }))

    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}${homePath}`)
    })

  } catch (e) {
    console.log(e)
  }

}
