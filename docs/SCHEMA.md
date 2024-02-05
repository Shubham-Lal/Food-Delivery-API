# Schema design for PostgreSQL database

### In the model `Organization`,
- `id` attribute represents the unique Organization ID;
- `name` attribute represents the Organization Name;
- `pricings` attribute represents one-to-many relationships of the Organization with the Pricing row datas.

### In the model `Item`,
- `id` attribute represents the unique Item ID;
- `type` attribute represents the Item type;
- `description` attribute represents the Item info.
- `pricings` attribute again represents one-to-many relationships of the Item with the Pricing row datas.

### In the model `Pricing`,

- `id` attribute represents the unique Pricing ID.
- `organizationId` attribute represents record of which *Organization* this *Pricing* row belongs to.
- `itemId` attribute represents record of which *Item* this *Pricing* row belongs to.
- `zone` attribute represents the zone for which the pricing is applicable.
- `organization` attribute is a relation field that establishes a relationship with the *Organization* model. It is based on the `organizationId` field and references the `id` field in the *Organization* model.
- `item` attribute is a relation field that establishes a relationship with the *Item* model. It is based on the `itemId` field and references the `id` field in the *Item* model.
- `@@unique` attribute represents the combination of `organizationId`, `itemId`, and `zone` is unique in the Pricing row.