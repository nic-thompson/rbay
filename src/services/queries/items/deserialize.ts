import type { Item } from '$services/types';
import { DateTime } from 'luxon';

export const deserialize = (id: string, item: { [key: string]: string }): Item => {
	return {
		id,
		name: item.name,
		description: item.description,
		createdAt: DateTime.fromMillis(parseInt(item.createdAt)),
		endingAt: DateTime.fromMillis(parseInt(item.endingAt)),
		imageUrl: item.imageUrl,
		highestBidUserId: item.highestBidUserId,
		ownerId: item.ownerId,
		views: parseInt(item.views),
		likes: parseInt(item.likes),
		bids: parseInt(item.bids),
		price: parseInt(item.price)
	};
};
