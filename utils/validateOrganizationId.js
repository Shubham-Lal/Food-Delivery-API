const validateOrganizationId = (organization_id) => {
    if (typeof organization_id !== "string") {
        return { error: "Invalid organization_id: must be a string" };
    }

    if (!organization_id.trim()) {
        return { error: "Invalid organization_id: empty organization id" };
    }

    const formattedId = organization_id.padStart(3, "0");
    return { data: formattedId };
};

module.exports = validateOrganizationId;