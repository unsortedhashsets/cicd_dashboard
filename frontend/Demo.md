## REACT-FRONTEND

### Prerequisites

[yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

Start backend server:
* [Backend standalone demo](backend/StandAloneDemo.md)
* [Backend docker-compose standalone demo](backend/StandAloneDemoDC.md)

In the project directory, run:

`( cd frontend ; yarn start )`

Pages:

* / - Dashboard
* /ci-tools - CI Tools
* /jobs - Jobs
* /tokens - Tokens

Features:

* Collapsed menu
* Dark/Light modes
* Shadows and gradients

DONEs:
* API connection for public ci and job status
  * Prepare dashboard layout
  * Get public job status
  * Get private job status (after login)
  * feature to update all CIs jobs
  * feature to update jobs individually 
* Login / session / csrf 
  * Prepare login layout
  * Solve csrf token issue
  * Solve session issue
  * Prepare logout
* API connection for public/private CI tools - CRUD Actions
  * Prepare page CI Tools layout
  * Delete
* API connection for public/private Jobs - CRUD Actions
  * Prepare page Jobs layout
  * Delete
* API connection for private tokens - CRUD Actions
  * Prepare page Tokens layout
  * Delete  
  * Add create/update form (WITH MODAL)
  * Create
  * Update  
  
TODOs:
* API connection for public/private CI tools - CRUD Actions
  * Add create/update form (WITH MODAL)
  * Create
  * Update

* API connection for public/private Jobs - CRUD Actions
  * Add create/update form (WITH MODAL)
  * Create
  * Update
