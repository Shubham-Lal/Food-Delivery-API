# Calculate Price

**Project Info**
[View here](https://github.com/Shubham-Lal/Food-Delivery-API/blob/javascript/docs/ASSIGNMENT.md)

On the POST request to `http://localhost:5000/api/calculate-price`, `calculatePrice` controller code is called for calculating the total cost of food delivery.

### `calculatePrice` module
1. First and foremost, we will be validating the passed parameters in request body (req.body).
2. `validateReqBody` utility function is used for this validation purpose.
    1. The first step is to create an array of missing fields (missingFields). We are checking if the *zone*, *organization_id*, *total_distance* and *item_type* are there in the request body or not.
    2. If any of these above 4 parameters are not passed, we will be pushing the name of those parameters to the *missingFields* array.
    3. If the *missingFields* has any data, then we will return the function with `success: false` and `error` with missing field(s).
    -4. Now as we have these 4 parameters in request body, we will now use 4 different hooks namely `validateZone`, `validateOrganizationId`, `validateTotalDistance` and `validateItemType` to validate them.
        1. `validateZone` utility function: 
            - It takes *zone* as parameter and checks if its value is string or not. If *zone* is not string, then we will return `error`.
            - Then we check that the *zone* is in *allowedZones* array or not. If it is not in the array, then return `error`.
            - Now if the *zone* is in the allowed zones, then we will replace hyphen (-) with underscore (_). Its because we can't add hyphen symbol as data in our PostgreSQL table.
            - Then after passing all checks, we will return formatted zone as `data` from this utility function.
        2. `validateOrganizationId` utility function:
            - It takes *organization_id* as parameter and checks if its value is string or not. If *organization_id* is not string, then we will return `error`.
            - Then we will check if the *organization_id* is empty or not. If it is empty, then we will return `error`.
            - Now, we will be adding leading zeros to *organization_id* to make it at least 3 characters long.
            - Then we will return formatted organization ID as `data` from this utility function.
        3. `validateTotalDistance` utility function:
            - It takes *total_distance* as parameter and checks if its value is number or not. If *total_distance* is not number, then we will return `error`.
            - Now we check if this *total_distance* is negative. If it is negative, the we return `error`.
            - After passing these above checks, we will return *total_distance* as `data` from this utility function.
        4. `validateItemType` utility function:
            - It takes *item_type* as parameter and checks if its value is string or not. If *item_type* is not string, then we will return `error`.
            - Then we check that the *item_type* is in *allowedTypes* array or not. If it is not in the array, then return `error`.
            - Now if the *item_type* is in the allowed types, then we will replace hyphen (-) with underscore (_).
            - Then we will return formatted item type as `data` from this utility function.
    5. Using these above 4 validation hooks, we will store their returned value to `validationResults` array. Then we will check if in this array, there is any error which might be returned from any of these hooks and store it in in `hasErrors` constant.
    6. If there is any error (`hasErrors` is true), then we will filter the `validationResults` which has truthy `result.error` and store it in `errorMessages`. Then we will return `success: false` and error messages in `error` from this `validateReqBody` function.
    7. If there wasn't any error (`hasErrors` is false), then return `success: true` and *validatedZone*, *validatedOrganizationId*, *validatedTotalDistance* and *validatedItemType* in `data` from this `validateReqBody` function.
3. Now in `calculatePrice` controller, we will be using `validateReqBody` utility function to get `success` (true or false), `error` (if there was any error returned - when `success: false`) or `data` (valiadted parametrs passed in request body - when `success: true`) and store it in `validationResult`.
4. Then if `validationResult` object has `success: false`, then we return response from this POST request with `error`. Here's the response object:
```
{
    success: false,
    error: appropiate error message in the form of string
}
```
5. If the `validationResult` object has `success: true`, then we destructure the `validationResult.data` to get *validatedZone*, *validatedOrganizationId*, *validatedTotalDistance* and *validatedItemType*.
6. Now we query the **Pricing** table and find if there exists any row for
```
{ organizationId: validatedOrganizationId },
{ item: { type: validatedItemType } },
{ zone: validatedZone }
```
and if there is no such data with matching parameters, then return 
```
{
    success: false,
    error: "No data found"
}
```
7. If we do get any row with the matching data, then we calculate the `totalCost` with the logic 
```
fixPrice + ((validatedTotalDistance - baseDistanceInKm) * kmPrice);
```
The data available:
```
fixPrice = 1000 cents
validatedTotalDistance = validated total_distance
baseDistanceInKm = 5 km
kmPrice = decided based upon if type is "perishable" (150 cents) or "non_perishable" (100 cents)
```
8. Our cost in the **Pricing** table is in *cents*. So we divide the `totalCost` with 100 to get the cost in the Euro (€) and return the response
```
{ 
    success: true, 
    total_price: (totalCost / 100) 
}
```