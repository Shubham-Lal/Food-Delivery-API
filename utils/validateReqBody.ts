import { Request } from "express";
import { validateZone } from "./validateZone";
import { validateOrganizationId } from "./validateOrganizationId";
import { validateTotalDistance } from "./validateTotalDistance";
import { validateItemType } from "./validateItemType";
import { ZoneType, ItemType } from "@prisma/client";

interface ValidationData {
    validatedZone: ZoneType;
    validatedOrganizationId: string | number | undefined;
    validatedTotalDistance: string | number | undefined;
    validatedItemType: ItemType;
}

interface RequestBody {
    zone: string;
    organization_id: string;
    total_distance: number;
    item_type: string;
}

export const validateReqBody = (req: Request): { success: boolean; data?: ValidationData; error?: string } => {
    const missingFields: string[] = [];

    if (!("zone" in req.body)) missingFields.push("zone");
    if (!("organization_id" in req.body)) missingFields.push("organization_id");
    if (!("total_distance" in req.body)) missingFields.push("total_distance");
    if (!("item_type" in req.body)) missingFields.push("item_type");

    if (missingFields.length > 0) {
        return {
            success: false,
            error: `Missing required fields: ${missingFields.join(', ')}`,
        };
    }

    const { zone, organization_id, total_distance, item_type }: RequestBody = req.body;

    const validationResults = [
        validateZone(zone),
        validateOrganizationId(organization_id),
        validateTotalDistance(total_distance),
        validateItemType(item_type)
    ];

    const hasErrors = validationResults.some(result => !!result.error);

    if (hasErrors) {
        const errorMessages = validationResults
            .filter(result => !!result.error)
            .map(result => result.error);

        return { success: false, error: errorMessages.join(', ') };
    }

    return {
        success: true,
        data: {
            validatedZone: validationResults[0].data as ZoneType,
            validatedOrganizationId: validationResults[1].data,
            validatedTotalDistance: validationResults[2].data,
            validatedItemType: validationResults[3].data as ItemType
        }
    };
};