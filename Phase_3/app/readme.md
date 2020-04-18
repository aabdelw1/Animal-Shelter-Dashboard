#  Ingies' Animal Service

## Deployments

## General
* This project uses NextJS which is a production ready React solution that handles a number of different server to client rendering styles.

* Read more here: https://nextjs.org/

* This also uses ApolloClient to connect to the ias-app which is a GraphQL ApolloServer.
* OR atleast it should

* Read more about ApolloClient here: https://www.apollographql.com/docs/react/

* The UI design system that is being used is called Evergreen

* Read more about Evergreen here: https://evergreen.segment.com/components

* Also I'm strongly pushing for the use of Styled Components in this. Styled components is a cleaner way to do CSS in JS for React. This cleans up your render functions and also reduces confusion with class names & overlaps. You can also leverage props in your css which is huge for dynamic styling.

* Read more about Styled Components here: https://www.styled-components.com/ 

* If you are using VSCode (🤞 hopefully you are) install these extensions if you don't already have them:
  * [Styled Components highlighting](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
  * [GraphQL Query highlighting](https://marketplace.visualstudio.com/items?itemName=Prisma.vscode-graphql)

## Structure Overview

### Pages
* via NextJS each page is a route
  
* each page component should render a component from components

### Components
* Pretty self explanatory, just all the components needed, make sure to break them down once they get too large.

### Static
* This is where all your assets live, images etc.

### Lib
* This is where all the reusable functions would go. ie: filter functions, formatting etc.

## Getting started

Install dependencies

`npm install`

Copy example env to actual env, change according to env.

`cp .env.example .env`

Dev

`npm run dev`

Build for Prod

`npm run build`

Prod

`npm start`

Make sure your code is passing the linter!!!

`npm run lint`

`npm run lint --fix`

### How To Contribute
* Feature Branch off of `dev`
  * git checkout dev
  * git pull origin dev
  * git checkout -b feature/short-feature-name
* Then make a pull request for feature/short-feature-name -> dev