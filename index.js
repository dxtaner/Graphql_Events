const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground, } = require("apollo-server-core");
const { users, events, participants, locations } = require("./data");

const typeDefs = gql`
    # Event
    type Event {
        id: ID!
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
        user: User!
        location: Location!
        participants: [Participant!]!
    }

    input CreateEventInput {
        title: String!
        desc: String!
    }

    input UpdateEventInput {
        title: String
        desc: String
    }
    
    #Location
    type Location{
        id: ID!
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    input CreateLocationInput {
        name: String!
        desc: String!
    }

    input UpdateLocationInput {
        name: String
        desc: String
    }

    # User
    type User {
        id: ID!
        username: String!
        email: String!
        events: [Event]!
    }

    input CreateUserInput {
        username: String!
        email: String!
    }

    input UpdateUserInput {
        username: String
        email: String
    }

    # Participant
    type Participant {
        id: ID!
        user_id: ID!
        event_id: ID!
    }   

    input CreateParticipantInput {
        user_id: String!
        event_id: String!
    }

    input UpdateParticipantInput {
        user_id: String
        event_id: String
    }

    type DeleteAllOutput {
        count: Int!
    }


    type Query{
        # Event
        events: [Event!]!
        event(id: ID!): Event!

        # Location
        locations: [Location!]!
        location(id: ID!): Location!

        # User
        users: [User!]!
        user(id: ID!): User!

        # Participants
        participants: [Participant!]!
        participant(id: ID!): Participant!
    }

    type Mutation{
        # User
        createUser(data: CreateUserInput!): User!
        updateUser(id: ID!, data: UpdateUserInput!): User!
        deleteUser(id: ID!): User!
        deleteAllUsers: DeleteAllOutput!
        # Event
        createEvent(data: CreateEventInput!): Event!
        updateEvent(id: ID!, data: UpdateEventInput!): Event!
        deleteEvent(id: ID!): Event!
        deleteAllEvents: DeleteAllOutput!
        # Location
        createLocation(data: CreateLocationInput!): Location!
        updateLocation(id: ID!, data: UpdateLocationInput!): Location!
        deleteLocation(id: ID!): Location!
        deleteAllLocations: DeleteAllOutput!
        # Participant
        createParticipant(data: CreateParticipantInput!): Participant!
        updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
        deleteParticipant(id: ID!): Participant!
        deleteAllParticipants: DeleteAllOutput!
    }

    type Subscripton{
        # User
        userCreated: User!
        userUpdated: User!
        userDeleted: User!

        # Event
        eventCreated: Event!
        eventUpdated: Event!
        eventDeleted: Event!

        # Location
        locationCreated: Location!
        locationUpdated: Location!
        locationDeleted: Location!

        # Participant
        participantCreated(event_id: ID): Participant!
        participantUpdated: Participant!
        participantDeleted: Participant!
    }
`;

const resolvers = {

    Query: {
        // events
        events: () => events,
        event: (parent, args) => {
            const event = events.find((event) => event.id === args.id);
            if (!event) {
              return new Error("Event not found");
            }
            return event;
        },
        // locations
        locations: () => locations,
        location: (parent, args) => {
            const location = locations.find((location) => location.id === args.id);
            if (!location) {
              return new Error(" Location not found");
            }
            return location;
        },
        // users
        users: () => users,
        user: (parent, args) => {
            const user = users.find((user) => user.id === args.id);
            if (!user) {
            return new Error(" User not found");
            }
            return user;
        },
        // participants
        participants: () => participants,
        participant: (parent, args) => {
            const participant = participants.find((participant) => participant.id === args.id);
            if (!participant) {
              return new Error("Participant not found");
            }
            return participant;
        },
    },
    Event:{
        user:(parent,args)=>users.find((user)=>user.id===parent.user_id),
        location:(parent,args)=>locations.find((location)=>location.id ===parent.location_id),
        participants:(parent,args)=>participants.filter((participant)=>participant.event_id===parent.id)
    },
    
    User: {
        events:(parent,args)=>events.filter((event)=>event.user_id===parent.id)
    },
    Mutation: {
        // User
        createUser: (parent, { data: { username, email } }, { pubsub }) => {
          const user = { id: nanoid(), username: username, email };
          users.push(user);
          pubsub.publish("userCreated", { userCreated: user });
          return user;
        },
    },
};

const pubsub = new PubSub();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { pubsub },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => console.log(`Apollo server is up at ${url}`));