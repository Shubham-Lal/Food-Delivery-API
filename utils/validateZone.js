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

const validateZone = (zone) => {
    if (typeof zone !== "string") {
        return { error: "Invalid zone: must be a string" };
    }
    else if (!allowedZones.includes(zone.trim().toLowerCase())) {
        return { error: `Invalid zone: must be one of ${allowedZones.join(", ")}` };
    }

    const mappedZone = zone.trim().toLowerCase().replace("-", "_");

    return { data: mappedZone };
};

module.exports = validateZone;