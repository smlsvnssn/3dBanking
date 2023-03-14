import * as ö from 'ouml';
export const filterTransactionsOnTagsAndCategories = (transactions, userPage) => {
	// transaction: 1 cat, 1 subcat,>=0 tags
	// userPage: >= 0 cat, >= 0 tags
	if (!userPage) return transactions;

	return transactions.filter((t) => {
		if (ö.intersect(userPage.tags, t.tags).length) return true;
		if (userPage.categories.includes(t.category)) return true;
		if (userPage.categories.includes(t.subcategory)) return true;
		return false;
	});
};

export const filterUserPagesOnTransactionTagsAndCategory = (userPages, transaction) => {
	// transaction: 1 cat, 1 subcat,>=0 tags
	// userPage: >= 0 cat, >= 0 tags
	return userPages.filter((userPage) => {
		if (ö.intersect(transaction.tags, userPage.tags).length) return true;
		if (userPage.categories.includes(transaction.category)) return true;
		if (userPage.categories.includes(transaction.subcategory)) return true;
		return false;
	});
};
