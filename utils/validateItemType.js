const allowedTypes = ["perishable", "non-perishable"];

const validateItemType = (item_type) => {
    if (typeof item_type !== "string") {
        return { error: "Invalid item_type: must be a string" };
    }
    else if (!allowedTypes.includes(item_type.trim().toLowerCase())) {
        return { error: `Invalid item_type: must be one of ${allowedTypes.join(", ")}` };
    }

    const mappedItemType = item_type.trim().toLowerCase().replace("-", "_");

    return { data: mappedItemType };
};

module.exports = validateItemType;