const { GraphQLServer } = require('graphql-yoga')

const typeDefs = './src/schema.graphql'

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
  {
    id: 'link-1',
    url: 'www.deallabs.com',
    description: 'Des bons deals en veux tu en voila',
  },
  {
    id: 'link-2',
    url: 'www.charlesgerber.net',
    description: 'Photographe',
  },
  {
    id: 'link-3',
    url: 'www.apple.com',
    description: 'La pomme',
  },
]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => 'coucou',
    feed: () => links,
    link: (root, args) => links.find(link => link.id === args.id),
  },
  Mutation: {
    createLink: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      const link = links.find(link => link.id === args.id)
      link.description = args.description
      link.url = args.url
      return link
    },
    deleteLink: (root, args) => {
      let link = links.find(link => link.id === args.id)
      links = links.filter(link => link.id !== args.id)
      return link
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
