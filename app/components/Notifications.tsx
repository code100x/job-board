'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { format } from 'date-fns'
import { getAllNotifications, markNotificationAsRead } from '../actions/get-notifications'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Notification {
    id: number;
    message: string;
    userId: number;
    createdAt: Date;
    read: boolean;
    jobId: number
}

export const Notification = ({ setShowNotification }: { setShowNotification: Dispatch<SetStateAction<boolean>> }) => {
    const session = useSession()
    const router = useRouter()
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [loading, setLoading] = useState(false)

   

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true)
            const response = await getAllNotifications(session?.data?.user?.email!)
            setNotifications(response)
            setLoading(false)
        }
        fetchNotifications()
    }, [])

    const markAsRead = async (id: number) => {
        await markNotificationAsRead(id)
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        )
    }

    return (
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold p-4 bg-gray-100">Notifications</h2>
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowNotification(false)}
            >
                &#10005;
            </button>
            {loading ? (
                <p className="p-4 text-gray-500">Loading...</p>
            ) : notifications.length === 0 ? (
                <p className="p-4 text-gray-500">No new notifications</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                        <li key={notification.id} className={`p-4 hover:bg-gray-50 transition ${notification.read ? 'bg-gray-50' : ''}`}>
                            <div className="flex justify-between items-start">
                                <div
                                    className="flex-grow cursor-pointer"
                                    onClick={() => { router.push(`/jobs/apply/${notification.jobId}`) }}
                                >
                                    <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-900 font-medium'}`}>
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            markAsRead(notification.id)
                                        }}
                                        className="ml-2 px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition"
                                    >
                                        Mark as read
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
