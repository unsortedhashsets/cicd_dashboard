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

TODO:

* API connection for public CI tools - CRUD Actions
  * Prepare page CI Tools layout
* API connection for public Jobs - CRUD Actions
  * Prepare page Jobs layout
* Prepare layout for Dashboard
  * Add API conenction for status update
* Add login page and API connection with sessions and CSRF token (BLOCKED with LDAP issue)
* ...