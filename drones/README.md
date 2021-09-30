# Alejandro Aparicio Guerra

## Drones

[[_TOC_]]

---

:scroll: **START**

### Introduction

There is a major new technology that is destined to be a disruptive force in the field of transportation: **the drone**. Just as the mobile phone allowed developing countries to leapfrog older technologies for personal communication, the drone has the potential to leapfrog traditional transportation infrastructure.

Useful drone functions include delivery of small items that are (urgently) needed in locations with difficult access.

---

### Task description

We have a fleet of **10 drones**. A drone is capable of carrying devices, other than cameras, and capable of delivering small loads. For our use case **the load is medications**.

A **Drone** has:
- serial number (100 characters max);
- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);
- weight limit (500gr max);
- battery capacity (percentage);
- state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).

Each **Medication** has: 
- name (allowed only letters, numbers, ‘-‘, ‘_’);
- weight;
- code (allowed only upper case letters, underscore and numbers);
- image (picture of the medication case).

Develop a service via REST API that allows clients to communicate with the drones (i.e. **dispatch controller**). The specific communicaiton with the drone is outside the scope of this task. 

The service should allow:
- registering a drone;
- loading a drone with medication items;
- checking loaded medication items for a given drone; 
- checking available drones for loading;
- check drone battery level for a given drone;

> Feel free to make assumptions for the design approach. 

---

### Requirements

While implementing your solution **please take care of the following requirements**: 

#### Functional requirements

- There is no need for UI;
- Prevent the drone from being loaded with more weight that it can carry;
- Prevent the drone from being in LOADING state if the battery level is **below 25%**;
- Introduce a periodic task to check drones battery levels and create history/audit event log for this.

---

#### Non-functional requirements

- Input/output data must be in JSON format;
- Your project must be buildable and runnable;
- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory, via container);
- Required data must be preloaded in the database.
- JUnit tests are optional but advisable (if you have time);
- Advice: Show us how you work through your commit history.

---

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info<a name = "general-info"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
  ### Drones
   Service via REST API that allows clients to communicate with the drones

### Prerequisites

What things you need to install the software.

```
Node.js version >= 14.17.1

```

## Technologies<a name = "technologies"></a>
Project created with:
* Express.js
* SQLite
* Sequelize ORM

## Setup<a name = "setup"></a>
* To run this project, clone the project from github address.
* First make a copy of .env.sample and rename to .env
* Edit .env with:   

  ```
   DB_USERNAME= User name to manage the database
   DB_PASSWORD= Password
   DB_DATABASE= Name of the database
   DB_DIALECT=  sqlite
   DB_STORAGE=  Place where the file.sql going to create(./drones.sqlite)
   LOG_FILE=   Place where the file.log going to create(./audit.log)

  ```
## Install dependencies
```
 npm install

```
### To start the project running in dev mode.

```
npm run dev
```

### To start the project .

```
npm start
```

## Api Routes
### Drones CRUD
**Show List of Drones**
----
  Returns json data about a list of drones.

* **URL**

 /api/drones

* **Method:**

  `GET`
  
*  **URL Params**
  None

* **Data Params**

  None

**Add Drone**
----
  Creates a Drone

* **URL**

 /api/drones

* **Method:**

  `POST`
  
*  **URL Params**
  None

* **Data Params**

  {
    "serial": "",
    "model": "Middleweight",
    "weight_limit": "",
    "battery_capacity": "",
    "state": ""
 }

 **Update Drone**
----
  Updates a Drone

* **URL**

 /api/drones/:uuid

* **Method:**

  `PUT`
  
*  **URL Params**
  uuid

* **Data Params**

  {
    "serial": "",
    "model": "Middleweight",
    "weight_limit": "",
    "battery_capacity": "",
    "state": ""
 }

 **Delte Drone**
----
  Updates a Drone

* **URL**

 /api/drones/:uuid

* **Method:**

  `DELETE`
  
*  **URL Params**
  uuid

* **Data Params**

  None

### Medication CRUD
**Show List of Medications**
----
  Returns json data about a list of medications.

* **URL**

 /api/medications

* **Method:**

  `GET`
  
*  **URL Params**
  None

* **Data Params**

  None

**Add Drone**
----
  Creates a Meedication

* **URL**

 /api/medications

* **Method:**

  `POST`
  
*  **URL Params**
  None

* **Form Data**

  {
    "image": "",
    "name": "Middleweight",
    "weight": "",
    "code": "",
 }

 **Update Medication**
----
  Updates a Medication

* **URL**

 /api/medications/:uuid

* **Method:**

  `PUT`
  
*  **URL Params**
  uuid

* **Form Data**

  {
    "image": "",
    "name": "Middleweight",
    "weight": "",
    "code": "",
 }

 **Delete Medication**
----
  Deletes a Drone

* **URL**

 /api/medication/:uuid

* **Method:**

  `DELETE`
  
*  **URL Params**
  uuid

* **Data Params**

  None


**Load Medication in Drone**
----
  Loads medication in Drone

* **URL**

 /api/drones/load_medications/:uuid

* **Method:**

  `POST`
  
*  **URL Params**
  uuid

* **Data Params**

  None

**Checking loaded medication items for a given drone**
----
  Checks medication for a given drone

* **URL**

 /api/drones/check_loaded/:uuid

* **Method:**

  `GET`
  
*  **URL Params**
  uuid

* **Data Params**

  None

**Checking available drones for loading**
----
  Checks what drone is avaliable

* **URL**

 /api/drones/available_drones

* **Method:**

  `GET`
  
*  **URL Params**
  None

* **Data Params**

  None

**Check drone battery level for a given drone**
----
  Checks medication for a given drone

* **URL**

 /api/drones/check_battery/:uuid

* **Method:**

  `GET`
  
*  **URL Params**
  uuid

* **Data Params**

  None


:scroll: **END** 