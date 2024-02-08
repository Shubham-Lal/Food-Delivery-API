const validateOrganizationId = (organization_id) => {
    if (typeof organization_id !== "string") {
        return { error: "Invalid organization_id: must be a string" };
    }
    else if (!organization_id.trim()) {
        return { error: "Invalid organization_id: empty organization id" };
    }
    else if (organization_id.trim().length > 3) {
        return { error: "Invalid organization_id: max 3 characters long" };
    }

    const formattedId = organization_id.trim().padStart(3, "0");
    return { data: formattedId };
};

module.exports = validateOrganizationId;