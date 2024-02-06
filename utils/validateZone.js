module.exports.validateZone = (zone) => {
    if (typeof zone !== "string") {
        return { error: "Invalid zone: must be a string" };
    }

    const allowedZones = [
        "north",
        "north-east",
        "east",
        "south-east",
        "south",
        "south-west",
        "west",
        "north-west",
        "central"
    ];

    if (!allowedZones.includes(zone.toLowerCase())) {
        return { error: `Invalid zone: must be one of ${allowedZones.join(", ")}` };
    }

    const mappedZone = zone.replace("-", "_").toLowerCase();

    return { data: mappedZone };
};
