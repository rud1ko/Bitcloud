'use client'

import { Button } from '@/shared/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/ui/table'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import { ADMIN_API } from '../../api'
import { useDeleteUser } from '../../api/useDeleteUser'
import { useUpdateUser } from '../../api/useUpdateUser'

interface User {
	id: string
	email: string
	name: string
	role: 'USER' | 'ADMIN'
	balance_BTC: number
	card?: {
		balance: number
	} | null
}

export function UsersTable() {
	const queryClient = useQueryClient()
	const [selectedUser, setSelectedUser] = useState<string | null>(null)
	const { data: session } = useSession()
	const { mutate: deleteUser } = useDeleteUser()
	const { mutate: updateUser } = useUpdateUser()

	const { data: users = [], isLoading } = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: ADMIN_API.getUsers,
	})

	const handleDelete = (id: string) => {
		setSelectedUser(id)
		deleteUser(id, {
			onSuccess: () => {
				setSelectedUser(null)
			},
		})
	}

	const handleRoleChange = (userId: string, newRole: 'USER' | 'ADMIN') => {
		updateUser(
			{ userId, role: newRole },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['admin-users'] })
					toast.success('User updated successfully')
				},
			}
		)
	}

	const handleBalanceChange = (userId: string, newBalance: number) => {
		updateUser(
			{ userId, btcBalance: newBalance },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['admin-users'] })
					toast.success('User updated successfully')
				},
			}
		)
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div className='rounded-md border'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>BTC Balance</TableHead>
						<TableHead>Card Balance</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map(user => (
						<TableRow key={user.id}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>
								<Select
									defaultValue={user.role}
									onValueChange={(value: 'USER' | 'ADMIN') =>
										handleRoleChange(user.id, value)
									}
								>
									<SelectTrigger className='w-[100px]'>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='USER'>User</SelectItem>
										<SelectItem value='ADMIN'>Admin</SelectItem>
									</SelectContent>
								</Select>
							</TableCell>
							<TableCell>
								<input
									type='number'
									defaultValue={user.balance_BTC}
									className='w-[100px] rounded-md border p-2'
									onBlur={e =>
										handleBalanceChange(user.id, parseFloat(e.target.value))
									}
								/>
							</TableCell>
							<TableCell>
								{user.card ? `$${user.card.balance.toFixed(2)}` : 'No card'}
							</TableCell>
							<TableCell className='text-right'>
								<Button
									variant='destructive'
									size='sm'
									onClick={() => handleDelete(user.id)}
									disabled={
										selectedUser === user.id || user.id === session?.user?.id
									}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
