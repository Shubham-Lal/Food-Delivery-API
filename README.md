# Food Delivery API

[Live API URL](https://viga-food-delivery-api.vercel.app)

#### Available Routes
- [Home page](https://viga-food-delivery-api.vercel.app)
- [Swagger page](https://viga-food-delivery-api.vercel.app/docs)
- [Calculate price](https://viga-food-delivery-api.vercel.app/api/calculate-price)

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

#### Usage
Send a POST request on the route `https://localhost:5000/api/calculate-price` with below JSON content
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

**Database schema design**
[View here](https://github.com/Shubham-Lal/Food-Delivery-API/blob/javascript/docs/SCHEMA.md)

**Calculate price controller**
[View here](https://github.com/Shubham-Lal/Food-Delivery-API/blob/javascript/docs/PRICE.md)