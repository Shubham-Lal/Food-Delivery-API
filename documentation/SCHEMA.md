# Schema design for PostgreSQL database

### In the model `Organization`,
- `id` attribute represents the unique Organization ID;
- `name` attribute represents the Organization Name;
- `pricings` attribute represents one-to-many relationships of the Organization with the Pricing model.

### In the model `Item`,
- `id` attribute represents the unique Item ID;
- `type` attribute represents the Item type;
- `description` attribute represents the Item info.
- `pricings` attribute again represents one-to-many relationships of the Item with the Pricing model.

### In the model `Pricing`,

- `id` attribute represents the unique Pricing ID.
- `organizationId` attribute represents record of which `Organization` this `Pricing` model belongs to.
- `itemId` attribute represents record of which `Item` this `Pricing` model belongs to.
- `zone` attribute represents the zone for which the pricing is applicable.
- `baseDistanceInKm` attribute represents the base distance for which the pricing applies. By default, it is set to `5 kilometers`.
- `kmPrice` attribute represents the price per kilometer for distances beyond the base distance. By default, it is set to 150 cents (equivalent to 1.5€).
- `fixPrice` attribute represents the fixed price for the delivery. By default, it is set to 1000 cents (equivalent to 10€).
- `organization` attribute establishes a one-to-many relationship between the `Organization` and `Pricing` models.
- `item` attribute establishes a one-to-many relationship between the `Item` and `Pricing` models.
- `@@unique` attribute represents the combination of `organizationId`, `itemId`, and `zone` is unique in the Pricing table.