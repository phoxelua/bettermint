# Bettermint

## Goals
Unify all finance related accounts into a flexible dashboard.

## MVP Features
- Show account balances and recent transactions as a user-defined aggregate (e.g. checkings, savings, credit cards), filterable by subsets of accounts
- Budgetting

## Nice-to-have Features
- Splitting transactions and annotating with categories and notes (upon more thinking -- this means we have to store all the transaction information in our database for this to really work correctly?)
- Integration with Google Calendar for billing alerts and payment due dates

## TODO
- Design API architecture and write spec for how to flexibly allow this sort of flexible splicing of data.
  - Could look into [GraphQL](https://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html).  At work we use OData, which works, but I'm not the world's biggest fan of (mostly because no Python OData implementation currently exists so we wrote one).  Looks like some might already exist for Node and stuff, but GraphQL seems to be hot right now
- Make some wireframes
- Write some user scenarios
- Research the competition and try to define why exactly we want this and how to distinguish/be better than what exists
- Start dumping these TODOs into Github Issues and flesh them out more.
- Bettermint is a shitty name LOL

## What's out there
- Mint: nice and free but really ugly and sucks at Venmo splitting
- YNAB: lots of features but ugly af and costs money
- Personal Capital: better for investing and savings than budgetting, costs money
- Powerwallet: decently pretty, closest to MVP but can't split transactions

## Setup
- Clone repo
- (optional) Make a virtualenv for this repo
- (optional) Use pyenv to manage the python versions, we're using 3.5 for this repo
- (optional) Use nvm to manage the node versions, any recent node version should work
- `pip install -r requirements.txt`
- `npm install`
- Run the Webpack server which runs the frontend with `./manage.py webpack`
- Run the API server with `./manage.py runserver`
