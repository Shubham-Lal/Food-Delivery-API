import { PrismaClient } from '@prisma/client'
import { validateReqBody } from "../utils/validateReqBody.js";

const prisma = new PrismaClient();

const calculatePrice = async (req, res) => {
    try {
        const validationResult = validateReqBody(req);

        if (!validationResult.success) {
            return res.status(400).json(validationResult);
        }

        const {
            validatedZone,
            validatedOrganizationId,
            validatedTotalDistance,
            validatedItemType
        } = validationResult.data;

        const pricingDetails = await prisma.pricing.findFirst({
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