export type OrderStatusType = 'pending' | 'cancelled' | 'confirmed' | 'completed';

export interface IOrderStatus {
	id: OrderStatusType;
	name: string;
}

export const ORDER_STATUS: IOrderStatus[] = [
	{ id: "pending", name: "Pending" },
	{ id: "confirmed", name: "Confirmed" },
	{ id: "cancelled", name: "Cancelled" },
	{ id: "completed", name: "Completed" },
];