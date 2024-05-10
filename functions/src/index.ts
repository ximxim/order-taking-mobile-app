/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall, HttpsError} from "firebase-functions/v2/https";
import * as admin from 'firebase-admin';
import { calculateSubtotal, calculateTotal } from './calculations';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

export const placeorder = onCall(async(request) => {
	if (!request.auth) {
		throw new HttpsError('failed-precondition', 'You need to be authenticated');
	}

	const firestore = admin.firestore();
	const lines = request.data.lines;

	const draft = {
    ...request.data,
    status: "pending",
    createdBy: request.auth.uid,
    total: calculateTotal(lines, 13),
    subTotal: calculateSubtotal(lines),
    pickupTime: admin.firestore.FieldValue.serverTimestamp(),
    createAt: admin.firestore.FieldValue.serverTimestamp(),
  };

	const order = await firestore.collection("orders").add(draft);
	return { id: order.id, order: draft };
});
