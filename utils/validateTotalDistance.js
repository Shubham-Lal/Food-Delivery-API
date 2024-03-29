const validateTotalDistance = (total_distance) => {
    if (typeof total_distance !== "number") {
        return { error: "Invalid total_distance: must be a number" };
    }
    else if (total_distance < 0) {
        return { error: "Invalid total_distance: cannot be negative" };
    }

    return { data: total_distance };
};

module.exports = validateTotalDistance;