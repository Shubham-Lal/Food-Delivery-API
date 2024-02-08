const validateItemType = (item_type) => {
    if (typeof item_type !== "string") {
        return { error: "Invalid item_type: must be a string" };
    }

    const allowedTypes = ["perishable", "non-perishable"];
    if (!allowedTypes.includes(item_type.toLowerCase())) {
        return { error: `Invalid item_type: must be one of ${allowedTypes.join(", ")}` };
    }

    const mappedItemType = item_type.replace("-", "_").toLowerCase();

    return { data: mappedItemType };
};

module.exports = validateItemType;