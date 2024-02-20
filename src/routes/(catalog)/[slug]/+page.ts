import { services } from '@misiki/litekart-utils'

export const prerender = false
export async function load({ url, params, parent }) {
	// const x = await parent()
	const { store, storeId, origin, sid, zip } = await parent()
	const categorySlug = params.slug
	const currentPage = +url.searchParams.get('page') || 1
	const fl = {}
	const query = url.searchParams
	const searchData = url.searchParams.get('q')
	const sort = url.searchParams.get('sort')

	query.forEach(function (value, key) {
		fl[key] = value
	})
	const products = await services.ProductService.fetchProductsOfCategory({
		categorySlug,
		origin,
		query: query.toString(),
		sid,
		zip,
		storeId
	})
	return {
		products,
		query: query.toString(),
		searchData,
		sort,
		store,
		currentPage
	}
}
