'use server';

import prisma from "@/prisma/db";

export async function getAllNotifications(userEmail: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail
        },
        select: {
            notifications: true
        }
    });
    return user?.notifications || [];
}

export async function getUnreadNotifications(userEmail: string) {
    const unreadNotifications = await prisma.user.findUnique({
        where: {
            email: userEmail
        },
        select: {
            notifications: {
                where: {
                    read: false
                }
            }
        }
    });
    return unreadNotifications;
}

export async function markNotificationAsRead(notificationId: number) {
    const updatedNotification = await prisma.notification.update({
        where: {
            id: notificationId
        },
        data: {
            read: true
        }
    })
}
