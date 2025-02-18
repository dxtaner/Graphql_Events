# GraphQL API with Apollo Server

This project is a basic GraphQL API built with Apollo Server. It supports querying, mutating, and subscribing to data for Events, Locations, Users, and Participants.

## Features

- Query, create, update, and delete Events, Locations, Users, and Participants.
- Real-time subscriptions for tracking changes in the data.
- Integrated GraphQL Playground for testing and debugging.

## Installation

1. Clone the repository:
   ```bash
   git clone (https://github.com/dxtaner/Graphql_Events)
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will start, and you can access the GraphQL Playground at `http://localhost:4000/`.

## Project Structure

- **data.js**: Contains mock data for events, locations, users, and participants.
- **index.js**: Main file defining the schema, resolvers, and server setup.

## GraphQL Schema

### Types

#### Event
- `id`: ID!
- `title`: String!
- `desc`: String!
- `date`: String!
- `from`: String!
- `to`: String!
- `location_id`: ID!
- `user_id`: ID!
- `user`: User!
- `location`: Location!
- `participants`: [Participant!]!

#### Location
- `id`: ID!
- `name`: String!
- `desc`: String!
- `lat`: Float!
- `lng`: Float!

#### User
- `id`: ID!
- `username`: String!
- `email`: String!
- `events`: [Event]!

#### Participant
- `id`: ID!
- `user_id`: ID!
- `event_id`: ID!

### Queries

- `events`: Retrieve all events.
- `event(id: ID!)`: Retrieve a single event by ID.
- `locations`: Retrieve all locations.
- `location(id: ID!)`: Retrieve a single location by ID.
- `users`: Retrieve all users.
- `user(id: ID!)`: Retrieve a single user by ID.
- `participants`: Retrieve all participants.
- `participant(id: ID!)`: Retrieve a single participant by ID.

### Mutations

#### User Mutations
- `createUser(data: CreateUserInput!): User!`
- `updateUser(id: ID!, data: UpdateUserInput!): User!`
- `deleteUser(id: ID!): User!`
- `deleteAllUsers: DeleteAllOutput!`

#### Event Mutations
- `createEvent(data: CreateEventInput!): Event!`
- `updateEvent(id: ID!, data: UpdateEventInput!): Event!`
- `deleteEvent(id: ID!): Event!`
- `deleteAllEvents: DeleteAllOutput!`

#### Location Mutations
- `createLocation(data: CreateLocationInput!): Location!`
- `updateLocation(id: ID!, data: UpdateLocationInput!): Location!`
- `deleteLocation(id: ID!): Location!`
- `deleteAllLocations: DeleteAllOutput!`

#### Participant Mutations
- `createParticipant(data: CreateParticipantInput!): Participant!`
- `updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!`
- `deleteParticipant(id: ID!): Participant!`
- `deleteAllParticipants: DeleteAllOutput!`

### Subscriptions

Real-time updates for all entity types:

#### User Subscriptions
- `userCreated: User!`
- `userUpdated: User!`
- `userDeleted: User!`

#### Event Subscriptions
- `eventCreated: Event!`
- `eventUpdated: Event!`
- `eventDeleted: Event!`

#### Location Subscriptions
- `locationCreated: Location!`
- `locationUpdated: Location!`
- `locationDeleted: Location!`

#### Participant Subscriptions
- `participantCreated(event_id: ID): Participant!`
- `participantUpdated: Participant!`
- `participantDeleted: Participant!`

## Example Queries

### Query Example
```graphql
query GetEvents {
  events {
    id
    title
    date
    location {
      name
    }
    user {
      username
    }
  }
}
```

### Mutation Example
```graphql
mutation CreateUser {
  createUser(data: { username: "JohnDoe", email: "johndoe@example.com" }) {
    id
    username
    email
  }
}
```

### Subscription Example
```graphql
subscription OnUserCreated {
  userCreated {
    id
    username
    email
  }
}
```

## Technologies Used

- **Node.js**: Runtime environment.
- **Apollo Server**: GraphQL server.
- **GraphQL Subscriptions**: Real-time updates using `graphql-subscriptions`.

## License

This project is open-source and available under the [MIT License](LICENSE).
