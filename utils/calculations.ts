import { ILineValue } from "@/models";

export const calculateItemTotal = (
	price: number,
	quantity: number,
	fields: ILineValue[],
) => {
	const totalFieldsPrice = fields.reduce((acc, field) => acc + field.price, 0)
	return (totalFieldsPrice + price) * quantity;
};
