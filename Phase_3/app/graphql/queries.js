import gql from 'graphql-tag'

const Queries = {
  ALL_ANIMALS: gql`
    query {
      allAnimals{
        _id
        animalName
        species
        sex
        age
        role
        breed
        alterationStatus
        adoptability
      }
    }
  `
}

export default Queries
