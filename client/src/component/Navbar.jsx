import React, { useEffect, useState } from "react"
import {
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	OutlinedInput,
} from "@mui/material"

const ProductHeader = ({
	handleSortChange,
	handleCategoryChange,
	handleCompanyChange,
	handleAvailabilityChange,
	handleMinPriceChange,
	handleMaxPriceChange,
	handleTopProductsChange,
}) => {
	const [categoriesList, setCategoriesList] = useState([])
	const [companiesList, setCompaniesList] = useState([])

	async function fetchCategoriesData() {
		try {
			const res = await fetch("https://xxm96v-5173.ocws.app/api/categories")
			const data = await res.json()
			setCategoriesList(data)
			console.log(data)
		} catch (error) {
			console.log(error)
			setCategoriesList([])
		}
	}
	async function fetchCompaniesData() {
		try {
			const res = await fetch("https://xxm96v-5173.ocws.app/api/companies")
			const data = await res.json()
			setCompaniesList(data)
			console.log(data)
		} catch (error) {
			console.log(error)
			setCompaniesList([])
		}
	}

	useEffect(() => {
		fetchCategoriesData()
		fetchCompaniesData()
	}, [])
	return (
		<Box display="flex" justifyContent="space-between" mt={5} mb={5}>
			<Typography variant="h4" fontWeight="bold">
				Products
			</Typography>

			<Box display="flex" flexDirection={"column"}>
				<Box display="flex" justifyContent="space-between" gap={5}>
					<FormControl variant="outlined" sx={{ minWidth: 200 }}>
						<InputLabel htmlFor="categories">Categories</InputLabel>
						<Select
							id="categories"
							label="Categories"
							defaultValue="all"
							onChange={handleCategoryChange}
						>
							<MenuItem value="all">All</MenuItem>
							{categoriesList.map((category) => (
								<MenuItem key={category.id} value={category.name}>
									{category.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl variant="outlined" sx={{ minWidth: 200 }}>
						<InputLabel htmlFor="company">Select Company</InputLabel>
						<Select
							id="company"
							label="company"
							d
							defaultValue="all"
							onChange={handleCompanyChange}
						>
							<MenuItem value="all">All</MenuItem>
							{companiesList.map((company) => (
								<MenuItem key={company.id} value={company.name}>
									{company.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl variant="outlined" sx={{ minWidth: 200 }}>
						<InputLabel htmlFor="availability">Availability</InputLabel>
						<Select
							id="availability"
							label="Availability"
							defaultValue="both"
							onChange={handleAvailabilityChange}
						>
							<MenuItem value="yes">Yes</MenuItem>
							<MenuItem value="no">No</MenuItem>
							<MenuItem value="both">Both</MenuItem>
						</Select>
					</FormControl>

					<FormControl variant="outlined" sx={{ minWidth: 200 }}>
						<InputLabel htmlFor="sorting">Sort By</InputLabel>
						<Select
							defaultValue="featured"
							id="sorting"
							label="Sort By"
							onChange={handleSortChange}
						>
							<MenuItem value="featured">Featured</MenuItem>
							<MenuItem value="low-high">Price: Low to High</MenuItem>
							<MenuItem value="high-low">Price: High to Low</MenuItem>
							<MenuItem value="rating">Rating</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box display="flex" justifyContent="flex-end" gap={5} mt={5}>
					<FormControl>
						<InputLabel htmlFor="topProducts">Top Products</InputLabel>
						<OutlinedInput
							id="topProducts"
							label="Top Products"
							onChange={handleTopProductsChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="minPrice">Min Price</InputLabel>
						<OutlinedInput
							id="minPrice"
							label="Min Price"
							onChange={handleMinPriceChange}
						/>
					</FormControl>
					<FormControl>
						<InputLabel htmlFor="maxPrice">Max Price</InputLabel>
						<OutlinedInput
							id="maxPrice"
							label="Max Price"
							onChange={handleMaxPriceChange}
						/>
					</FormControl>
				</Box>
			</Box>
		</Box>
	)
}

export default ProductHeader
