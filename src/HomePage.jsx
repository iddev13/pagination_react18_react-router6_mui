import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as NavLink, useLocation, useNavigate} from 'react-router-dom'
import { Pagination, TextField, Stack, Link, PaginationItem } from '@mui/material'
import './App.scss';

const BASE_URL = 'http://hn.algolia.com/api/v1/search?'

const Home = () => {
  let location = useLocation();
  const navigate = useNavigate();

	const [posts, setPosts] = useState([])
	const [query, setQuery] = useState('react')
	const [page, setPage] = useState(parseInt(location.search?.split("=")[1] || 1))
	const [pageQty, setpageQty] = useState(0)
  
	useEffect(() => {
	  axios.get(BASE_URL + `query=${query}&page=${page - 1}`)
		.then(
		  ({ data }) => {
			setPosts(data.hits)
			setpageQty(data.nbPages)
			if (data.nbPages < page) {
			  setPage(1)
        navigate("/")
			}
		  }
		)
  
	}, [query, page, navigate])

	return (
		<>
			<TextField
        fullWidth
        label="query"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Stack spacing={2}>
        {!!pageQty && (
          <Pagination
          count={pageQty}
          page={page}
          onChange={(_, num) => setPage(num)}
          showFirstButton
          showLastButton
          sx={{ marginY: 3, marginX: "auto" }}
          renderItem={(item) => (
            <PaginationItem
              component={NavLink}
              to={`/?page=${item.page}`}
              {...item}
            />
          )}
        />
        )}
        {
          posts.map(elem => {
            return <Link href={elem.url} key={elem.objectID}>
              {elem.title || elem.story_title}
            </Link>
          })
        }
      </Stack>
		</>
	)
}

export default Home