export const validateOrganizationId = (organization_id: string) => {
    if (typeof organization_id !== 'string') {
        return { error: 'Invalid organization_id: must be a string' };
    }

    const formattedId = organization_id.padStart(3, '0');
    return { data: formattedId };
};