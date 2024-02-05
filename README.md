# Food Delivery API

[Live API URL](https://viga-food-delivery-api.vercel.app)

#### Usage
Send POST request on the `https://localhost:5000/api/calculate-price` route with JSON content:
- **perishable** food item
  ```
  {
    "zone": "central",
    "organization_id": "005",
    "total_distance": 12,
    "item_type": "perishable"
  }
  ```
  to get the response with status code **200**
  ```
  {
    "success": true,
    "total_price": 20.5
  }
  ```
- **non-perishable** food item
  ```
  {
    "zone": "north",
    "organization_id": "004",
    "total_distance": 4,
    "item_type": "non-perishable"
  }
  ```
  to get the response with status code **200**
  ```
  {
    "success": true,
    "total_price": 10
  }
  ```

#### API Testing
Created **price.test.js** inside *test* directory.
Run `npm test` in terminal to check if the test passed or not.
List of test cases:
1. Return an error for missing required fields;
2. Calculate **total_price** for *perishable* items within base distance;
3. Calculate **total_price** for *non-perishable* items within base distance;
4. Calculate **total_price** for *perishable* items beyond base distance;
5. Calculate **total_price** for *non-perishable* items beyond base distance.

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

| id | organizationId | itemId |  zone   |
| -- | -------------- | ------ | ------- |
| 6  |      001       |   1    |  north  |
| 7  |      002       |   2    |  east   |
| 8  |      003       |   3    |  west   |
| 9  |      004       |   4    |  north  |
| 10 |      005       |   5    | central |

**Database schema design**
[View here](https://github.com/Shubham-Lal/Food-Delivery-API/blob/javascript/docs/SCHEMA.md)

**Calculate price controller**
[View here](https://github.com/Shubham-Lal/Food-Delivery-API/blob/javascript/docs/PRICE.md)