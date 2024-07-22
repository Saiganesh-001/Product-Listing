import React, { useEffect, useState } from "react"
import Item from "./Item"
import { Box, Grid, Button, Typography } from "@mui/material"

const PaginatedCards = ({ allProductsList, itemsPerPage }) => {
	const [currentPage, setCurrentPage] = useState(1)

	const indexOfLastItem = currentPage * itemsPerPage
	const indexOfFirstItem = indexOfLastItem - itemsPerPage
	const currentProducts = allProductsList.slice(
		indexOfFirstItem,
		indexOfLastItem
	)

	const totalPages = Math.ceil(allProductsList.length / itemsPerPage)

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
	}

	const handleNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
	}

	return (
		<Box>
			{currentProducts.length > 0 ? (
				<Grid 
                container 
                justifyContent="center"
                spacing={2} 
                >
					{currentProducts.map((product) => (
						<Grid 
                        item 
                        key={product.id}
                        lg={3} 
                        md={4} 
                        sm={6} 
                        xs={12} 
                        >
							<Item post={product} />
						</Grid>
					))}
				</Grid>
			) : (
				<Box
					alignItems="center"
					display="flex"
					justifyContent="center"
					minHeight="50vh"
				>
					<Typography variant="h6">No Data Found</Typography>
				</Box>
			)}
			<Box 
            display="flex" 
            justifyContent="center" 
            mt={4}
            >
				<Button
					color="primary"
					disabled={currentPage === 1}
					onClick={handlePrevPage}
					sx={{ marginRight: 1 }}
					variant="contained"
				>
					Previous
				</Button>
				<Button
					color="primary"
					disabled={currentPage === totalPages}
					onClick={handleNextPage}
					variant="contained"
				>
					Next
				</Button>
			</Box>
		</Box>
	)
}

export default PaginatedCards
