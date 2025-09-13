const { typeDefs } = require("./schema/type_defs")
const { resolvers } = require("./schema/resolvers")
const { ApolloServer } = require("apollo-server")

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({url}) => {
    console.log("Your API is running :)",url)
})
