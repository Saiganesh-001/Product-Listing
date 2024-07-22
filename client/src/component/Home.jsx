import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import PaginatedCards from "./PaginatedCards"
import { Container } from "@mui/material"

const Home = () => {
	const [allProductsList, setAllProductsList] = useState([]);
	const [sortOption, setSortOption] = useState("featured");
	const [category, setCategory] = useState("all");
	const [company, setCompany] = useState("all");
	const [availability, setAvailability] = useState("both");
	const [minPrice, setMinPrice] = useState(undefined);
	const [maxPrice, setMaxPrice] = useState(undefined);
	const [topProducts, setTopProducts] = useState(undefined);

	async function fetchProductData() {
		let baseUrl
		try {
			if (company !== "all" && category !== "all") {
				baseUrl = `https://xxm96v-5173.ocws.app/api/companies/${company}/categories/${category}/products`
			} else if (company !== "all") {
				baseUrl = `https://xxm96v-5173.ocws.app/api/companies/${company}/products`
			} else if (category !== "all") {
				baseUrl = `https://xxm96v-5173.ocws.app/api/categories/${category}/products`
			} else {
				baseUrl = "https://xxm96v-5173.ocws.app/api/products"
			}

			if (availability !== "both") {
				baseUrl += `?availability=${availability}`
			}

			if (minPrice) {
				if (baseUrl.includes("?")) baseUrl += `&`
				else baseUrl += "?"

				baseUrl += `minPrice=${minPrice}`
			}

			if (maxPrice) {
				if (baseUrl.includes("?")) baseUrl += `&`
				else baseUrl += "?"

				baseUrl += `maxPrice=${maxPrice}`
			}

			if(topProducts){
				if (baseUrl.includes("?")) baseUrl += `&`
				else baseUrl += "?"

				baseUrl += `top=${topProducts}`
			}

			const res = await fetch(`${baseUrl}`)
			const data = await res.json()
			console.log(data);
			setAllProductsList(data)
		} catch (error) {
			console.log(error)
			setAllProductsList([])
		}
	}

	useEffect(() => {
		fetchProductData()
	}, [category, company, availability, minPrice, maxPrice, topProducts])

	useEffect(() => {
		sortProducts(sortOption)
	}, [sortOption])

	const handleSortChange = (event) => {
		setSortOption(event.target.value)
	}

	const handleCategoryChange = (event) => {
		setCategory(event.target.value)
	}

	const handleCompanyChange = (event) => {
		setCompany(event.target.value)
	}

	const handleAvailabilityChange = (event) => {
		setAvailability(event.target.value)
	}

	const handleMinPriceChange = (event) => {
		setMinPrice(event.target.value)
	}
	const handleMaxPriceChange = (event) => {
		setMaxPrice(event.target.value)
	}
	const handleTopProductsChange = (event) => {
		setTopProducts(event.target.value)
	}

	const sortProducts = (option) => {
		let sortedList = [...allProductsList]
		switch (option) {
			case "low-high":
				sortedList.sort((a, b) => a.price - b.price)
				break
			case "high-low":
				sortedList.sort((a, b) => b.price - a.price)
				break
			case "rating":
				sortedList.sort((a, b) => b.rating - a.rating)
				break
			default:
				sortedList = [...allProductsList]
		}
		setAllProductsList(sortedList)
	}

	return (
		<Container maxWidth="lg">
			<Navbar
				handleSortChange={handleSortChange}
				handleCategoryChange={handleCategoryChange}
				handleCompanyChange={handleCompanyChange}
				handleAvailabilityChange={handleAvailabilityChange}
				handleMinPriceChange={handleMinPriceChange}
				handleMaxPriceChange={handleMaxPriceChange}
				handleTopProductsChange={handleTopProductsChange}
			/>
			<PaginatedCards allProductsList={allProductsList} itemsPerPage={16} />
		</Container>
	)
}

export default Home
