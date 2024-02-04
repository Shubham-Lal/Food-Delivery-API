const { PrismaClient } = require("@prisma/client");
const { validateReqBody } = require("../utils/validateReqBody.js");

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/calculate-price:
 *   post:
 *     summary: Calculate the price for food delivery
 *     tags: [Calculate Price]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 default: "central"
 *               organization_id:
 *                 type: string
 *                 default: "005"
 *               total_distance:
 *                 type: integer
 *                 default: 12
 *               item_type:
 *                 type: string
 *                 default: "perishable"
 *     responses:
 *       200:
 *         description: The price has been calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 total_price:
 *                   type: number
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

module.exports.calculatePrice = async (req, res) => {
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