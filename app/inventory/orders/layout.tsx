"use client"
import React, { useState, useEffect } from 'react';
import { OrderStoreProvider } from '@/lib/providers/order-store-provider';


export default function OrderLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <OrderStoreProvider>
            {children}
        </OrderStoreProvider>
    )
}
