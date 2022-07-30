import { buildSchema } from "graphql";

export default buildSchema(`

    scalar DateTime

    type Item {
        _id: ID!
        item: String!
        amount: Int!
        value: Float!
        client_id: String!
        createdat: DateTime!
        updatedat: DateTime
    }

    type Query {
        getAllItems: [Item!]!
    }

    input setItem {
        item: String!
        amount: Int!
        value: Float!
        client_id: String!
    }

    input itemUpdate {
        _id: ID!
        amount: Int!
        value: Float!
    }

    type Mutation {
        addItem(input: setItem!): Item
        updateItem(input: itemUpdate!): Item
        deleteItem(input: ID!): Item
    }
`);
