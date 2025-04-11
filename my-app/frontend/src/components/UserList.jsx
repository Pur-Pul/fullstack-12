import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const UserList = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(initializeUsers())
	}, [])
	const users = useSelector((state) => {
		return state.users
	})

	return (
		<div>
			<h1>users</h1>
			<table>
				<tbody>
					<tr>
						<th>Username</th>
						<th>Blogs created</th>
					</tr>
					{users.map((user) => {
						return (
							<tr key={user.id}>
								<td>
									<Link to={`/users/${user.id}`}>
										{user.name}
									</Link>
								</td>
								<td>{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default UserList
