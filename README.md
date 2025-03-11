# Project: To-Do List

## Demo & Snippets

---

## Requirements / Purpose

---

## Build Steps

---

## Design Goals / Approach

---

## Features

---

## Known issues

- Validation for query arrays missing
- Cannot seed Lists

## Future Goals

---

## Edge Cases

### Category

- Inputting an archived todo when updating category
- If archived things appear for collections

## Change logs

### 24/02/2025 - Started Project

- Created files and README
- Created create and getAll routes for todo domain

### 25/02/2025 -

- Added exception handling(fields and not found)
- Created getById, getByName & updateTodo route for todo domain
- Implemented modelmapper

### 03/03/2025 - Delete route

- Implemented delete route for todo
- Implemented filter/getAll routes for todo
- Created intitial FilterTodoDTO

### 04/03/2025 - Category domain

- Created abstract class base entity
- Initial implementation of Create/Read/Update/Delete routes for category domain
- Created collections of categories for todos and vice versa

### 05/03/2025 - Test suite created for end-to-end testing

- Created factories
- Created fixtures
- Created schemas
- Created EndToEnd test abstract class
- Initial end-to-end tests for category

### 06/03/2025 - Seeding and front end

- Created data seeding
- Connected front end to back end

### 07/03/2025

- Implemented removal of todos via front end
- Created modal component

### 08/03/2025

- Implemented front end creation of todos
- Added context

### 09/03/2025

- Implemented updating todos
- Added description, due date, status fields to todo

### 10/03/2025

- Implemented all MVP
- Added toast notifications

### 11/03/2025

- Finished writing end to end tests for categories
- Implemented selecting multiple categories when creating todos

## What did you struggle with?

- Feature creep
- Query Parameters
- Queries
- Updating collections
- Date formats between spring boot and react
