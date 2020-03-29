import gql from 'graphql-tag'

const Mutations = {
  ADD_ANIMAL: gql`
    mutation AddAnimalMutation($animalName: String!, $species: String!, $sex: String!, $age: Int!, $breed: String!, $alterationStatus: Boolean!, $adoptability: Boolean) {
      addAnimal(
        animalName: $animalName,
        species: $species,
        sex: $sex,
        age: $age,
        breed: $breed
        alterationStatus: $alterationStatus
        adoptability: $adoptability
      ) { 
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
  `,
  UPDATE_ANIMAL: gql`
    mutation UpdateAnimalMutation($animalName: String!, $species: String!, $sex: String!, $age: Int!, $breed: String!, $alterationStatus: Boolean!, $adoptability: Boolean) {
      updateAnimal(
        animalName: $animalName,
        species: $species,
        sex: $sex,
        age: $age,
        breed: $breed
        alterationStatus: $alterationStatus
        adoptability: $adoptability
      ) { 
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
  `,
 
  DELETE_ANIMAL: gql`
    mutation deleteAnimal($_id: ID!) {
      deleteAnimal(_id: $_id) {
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

export default Mutations
