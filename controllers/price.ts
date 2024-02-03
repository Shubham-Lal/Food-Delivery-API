import { Request, Response } from "express";
import { validateReqBody } from "../utils/validateReqBody";
import { db } from "../database/db";
import { ZoneType, ItemType } from "@prisma/client";

interface ValidationData {
    validatedZone: ZoneType;
    validatedOrganizationId: string;
    validatedTotalDistance: number;
    validatedItemType: ItemType;
}

const calculatePrice = async (req: Request, res: Response) => {
    try {
        const validationResult = validateReqBody(req);

        if (!validationResult.success) {
            return res.status(400).json(validationResult);
        }

        const { validatedZone, validatedOrganizationId, validatedTotalDistance, validatedItemType }: ValidationData = validationResult.data as ValidationData;

        const pricingDetails = await db.pricing.findFirst({
            where: {
                AND: [
                    { organizationId: validatedOrganizationId },
                    { item: { type: validatedItemType } },
                    { zone: validatedZone }
                ],
            }
        });
        if (!pricingDetails) {
            return res.status(200).json({
                success: false,
                error: "No data found"
            });
        }

        const totalCost = pricingDetails.fixPrice + ((validatedTotalDistance - pricingDetails.baseDistanceInKm) * pricingDetails.kmPrice);

        res.status(200).json({ success: true, total_price: (totalCost / 100) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '[server]: Internal server error' });
    }
};

export { calculatePrice };