import { client } from '$services/redis';
import { userLikesKey, itemsKey } from '$services/keys';
import { getItems } from './items';

export const userLikesItem = async (itemId: string, userId: string) => {
	return client.sIsMember(userLikesKey(userId), itemId);
};

export const likedItems = async (userId: string) => {
	const ids = await client.sMembers(userLikesKey(userId));
	console.log(ids);

	return getItems(ids);
};

export const likeItem = async (itemId: string, userId: string) => {
	const inserted = client.sAdd(userLikesKey(userId), itemId);

	if (inserted) {
		return client.hIncrBy(itemsKey(itemId), 'likes', 1);
	}
};

export const unlikeItem = async (itemId: string, userId: string) => {
	const removed = client.sRem(userLikesKey(userId), itemId);

	if (removed) {
		return client.hIncrBy(itemsKey(itemId), 'likes', -1);
	}
};

export const commonLikedItems = async (userOneId: string, userTwoId: string) => {
	const ids = await client.sInter([userLikesKey(userOneId), userLikesKey(userTwoId)]);
	return getItems(ids);
};
