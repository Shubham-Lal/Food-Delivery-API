# Food Delivery API

[Live API URL](https://viga-food-delivery-api.vercel.app)

**Available Routes**
- [Home page](https://viga-food-delivery-api.vercel.app)
- [Swagger page](https://viga-food-delivery-api.vercel.app/docs)
- [Calculate price](https://viga-food-delivery-api.vercel.app/api/calculate-price)

**Project Info**
[View here](https://github.com/Shubham-Lal/Food-Delivery-API/blob/javascript/documentation/ASSIGNMENT.md)

**Database Schema**
[View here](https://github.com/Shubham-Lal/Food-Delivery-API/blob/javascript/documentation/SCHEMA.md)

**Calculate Price**
[View here](https://github.com/Shubham-Lal/Food-Delivery-API/blob/javascript/documentation/PRICE.md)

#### Database Tables
1. **Organization**

| id  |   name    |
| --- | --------- |
| 001 |   Amul    |
| 002 |   Parle   |
| 003 |  Kissan   |
| 004 |   Emami   |
| 005 | Patanjali |

2. **Item**

| id |      type      | description |
| -- | -------------- | ----------- |
| 1  |   perishable   |   Butter    |
| 2  | non_perishable |   Biscuit   |
| 3  |   perishable   |  Fruit Jam  |
| 4  | non_perishable | Cooking Oil |
| 5  |   perishable   |    Ghee     |

3. **Pricing**

| id | organizationId | itemId |  zone   | baseDistanceInKm | kmPrice | fixPrice |
| -- | -------------- | ------ | ------- | ---------------- | ------- | -------- |
| 6  |      001       |   1    |  north  |        5         |   25    |   250    |
| 7  |      002       |   2    |  east   |        5         |   15    |   100    |
| 8  |      003       |   3    |  west   |        5         |   10    |    50    |
| 9  |      004       |   4    |  north  |        5         |   30    |   300    |
| 10 |      005       |   5    | central |        5         |   150   |   1000   |