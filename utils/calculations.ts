import { ILine, ILineValue } from "@/models";

export const calculateItemTotal = (
	price: number,
	quantity: number,
	fields: ILineValue[],
) => {
	const totalFieldsPrice = fields.reduce((acc, field) => acc + field.price, 0)
	return (totalFieldsPrice + price) * quantity;
};

export const calculateSubtotal = (lines: ILine[]) => 
	lines.reduce((acc, line) => acc + calculateItemTotal(
		line.price, 
		line.quantity, 
		line.value || [],
	), 0)


export const calculateTaxes = (lines: ILine[], taxPercentage: number) =>
	calculateSubtotal(lines) * (taxPercentage / 100)

export const calculateTotal = (lines: ILine[], taxPercentage: number) =>
	calculateSubtotal(lines) + calculateTaxes(lines, taxPercentage)
