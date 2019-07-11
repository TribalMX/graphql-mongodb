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
        reviews: [Review]
      }

      type Review {
        period: String
        unit: Unit
        answers: [Answer]
      }

      type Answer {
        question: Question
        answer: Int
        comments: String
      }

      type Unit {
        code: String
        name: String
        address: String
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
        },
        reviews:  async ({code}) => {
          return (await db.collection('reviews').aggregate([
            {"$project": {
              period_label:1,
              unit_code: 1,
              category_code: 1}},
            {"$lookup": {
              from: "categories",
              localField: "category_code",
              foreignField: "code",
              as: "category"
            }},
            {"$match": { "category.assessment_code": code }},
            {"$project": {
              period_label:1,
              unit_code: 1,
              category_code: 1,
              label: "$category.label",
              assessment: "$category.assessment_code"
            }},
            {"$group": {
              _id: {period: "$period_label", unit: "$unit_code"}
            }},
            {"$project": {
              _id: 0,
              period: "$_id.period",
              unit: "$_id.unit"
            }}
          ]).toArray())
        },
      },
      Answer: {
        question: async ({question}) => {
          let pipe = await db.collection('categories').aggregate([
            {"$unwind": "$questions"},
            {"$match": {
              "questions.name": question
            }},
            {"$project": {
              _id: 0,
              name: "$questions.name",
              label: "$questions.label",
              category: "$code"
            }}
          ]).toArray()
          console.log('Answer question ', question, pipe)
          return pipe[0]
        }
      },
      Review: {
        unit: async ({unit}) => {
          return await db.collection('units').findOne({code: unit},{code:1, name:1, address:1 })
        },
        answers: async ({period, unit}) => {
          return (await db.collection('reviews').aggregate([
            {"$match": {
              period_label: period,
              unit_code: unit,
            }},
            {"$unwind":"$answers"},
            {"$project": {
              _id: 0,
              question: "$answers.question_name",
              answer: "$answers.answer",
              comments: "$answers.comments"
            }}
          ]).toArray())
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
