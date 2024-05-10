export const calculateItemTotal = (
	price: number,
	quantity: number,
	fields: any[],
) => {
	const totalFieldsPrice = fields.reduce((acc, field) => acc + field.price, 0)
	return (totalFieldsPrice + price) * quantity;
};

export const calculateSubtotal = (lines: any[]) => 
	lines.reduce((acc, line) => acc + calculateItemTotal(
		line.price, 
		line.quantity, 
		line.value || [],
	), 0)


export const calculateTaxes = (lines: any[], taxPercentage: number) =>
	calculateSubtotal(lines) * (taxPercentage / 100)

export const calculateTotal = (lines: any[], taxPercentage: number) =>
	calculateSubtotal(lines) + calculateTaxes(lines, taxPercentage)
