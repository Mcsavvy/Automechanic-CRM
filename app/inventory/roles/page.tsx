"use client"
import React, { useState } from 'react'
import { MoveLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ScopeItem {
    action: string;
    label: string;
    description: string;
    checked: boolean;
}

interface Scopes {
    [category: string]: {
        allChecked: boolean;
        items: ScopeItem[];
    };
}

const initialScopes: Scopes = {
    client: {
        allChecked: false,
        items: [
            { action: "read", label: "View clients", description: "Access to view client information", checked: false },
            { action: "write", label: "Edit clients", description: "Ability to modify client details", checked: false },
            { action: "delete", label: "Delete clients", description: "Permission to remove client records", checked: false },
        ]
    },
    goods: {
        allChecked: false,
        items: [
            { action: "read", label: "View inventory", description: "Access to view inventory levels", checked: false },
            { action: "write", label: "Manage stock", description: "Ability to update stock quantities", checked: false },
            { action: "create", label: "Add new items", description: "Permission to add new products to inventory", checked: false },
        ]
    },
    orders: {
        allChecked: false,
        items: [
            { action: "read", label: "View orders", description: "Access to view order details", checked: false },
            { action: "write", label: "Process orders", description: "Ability to update order status", checked: false },
            { action: "delete", label: "Cancel orders", description: "Permission to cancel existing orders", checked: false },
        ]
    },
}

const Roles: React.FC = () => {
    const [group, setGroup] = useState<string>('')
    const [scopes, setScopes] = useState<Scopes>(initialScopes)
    const handleScopeChange = (category: string, index: number | null = null) => {
        setScopes((prev) => {
            const newScopes = { ...prev };
            if (index === null) {
                // Toggle all items in the category
                const newAllChecked = !newScopes[category].allChecked;
                newScopes[category] = {
                    allChecked: newAllChecked,
                    items: newScopes[category].items.map((item) => ({
                        ...item,
                        checked: newAllChecked,
                    })),
                };
            } else {
                // Toggle individual item
                newScopes[category] = {
                    ...newScopes[category],
                    items: newScopes[category].items.map((item, idx) =>
                        idx === index ? { ...item, checked: !item.checked } : item
                    ),
                };
                // Update allChecked based on individual items
                newScopes[category].allChecked = newScopes[category].items.every((item) => item.checked);
            }
            return newScopes;
        });
    };


    const renderCheckboxes = () => {
        return (
            <div className='w-full'>
                <h3 className="text-lg text-pri-6 font-semibold font-rambla mb-2">Scopes</h3>
                <div className=' rounded-md border border-neu-3 bg-white p-4 flex flex-col gap-4'>
                    <p className="mb-4">These scopes define the authorization level of an employee and the data they&apos;re allowed to access.
                        Each scope chosen will allow them to perform specific operations on the system.
                    </p>
                    {Object.entries(scopes).map(([category, { allChecked, items }]) => (
                        <div key={category} className='pl-4 border-t border-neu-3 py-2'>
                            <label className='flex items-center mb-2'>
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={() => handleScopeChange(category)}
                                    className="mr-2"
                                />
                                <span className="font-semibold capitalize">{category}</span>
                            </label>
                            <div className='ml-4 grid grid-cols-1 gap-2'>
                                {items.map((scope, index) => (
                                    <label key={index} className='flex items-center'>
                                        <input
                                            type="checkbox"
                                            checked={scope.checked}
                                            onChange={() => handleScopeChange(category, index)}
                                            className="mr-2"
                                        />
                                        <span className="font-medium w-32">{scope.label}</span>
                                        <span className="text-sm text-gray-600 ml-2">{scope.description}</span>
                                        <span className="text-xs text-gray-400 ml-2">({scope.action})</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const handleSave = () => {
        const dbScopes = Object.entries(scopes).reduce((acc, [category, { allChecked, items }]) => {
            if (allChecked) {
                acc[category] = true;
            } else {
                const selectedActions = items.filter(item => item.checked).map(item => item.action);
                if (selectedActions.length > 0) {
                    acc[category] = selectedActions;
                }
            }
            return acc;
        }, {} as Record<string, boolean | string[]>);

        console.log("Database Scopes:", dbScopes);
    };

    return (
        <div className="absolute h-[calc(100vh-60px)] top-[60px] w-full overflow-auto scrollbar-thin">
            {!group ? (
                <div className="md:p-[30px] p-3">
                    <ul className='flex flex-col items-start justify-start gap-5'>
                        <li className='max-w-[700px] flex flex-col gap-3 border-b border-b-pri-6 p-4 items-start justify-start'>
                            <h3 className="text-lg text-pri-6 font-semibold font-quicksand">Owner</h3>
                            <p className='font-lato'>
                                The Admin is an administrator in the organization. He is capable and responsible for managing
                                and ensuring the smmooth sailing of both staff and client alike. As such he has authorization to all necessary
                                aspects of the application and data that he may need to make the system work better
                            </p>
                            <ul className='flex flex-row flex-wrap gap-2'>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>customer</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>mechanic</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>teller</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>orders</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>goods</li>
                            </ul>
                            <Button variant="outline" className='self-end' onClick={() => setGroup('admin')}>Manage</Button>
                        </li>
                        <li className='max-w-[700px] flex flex-col gap-3 border-b border-b-pri-6 p-4 items-start justify-start'>
                            <h3 className="text-lg text-pri-6 font-semibold font-quicksand">Admin</h3>
                            <p className='font-lato'>
                                The Admin is an administrator in the organization. He is capable and responsible for managing
                                and ensuring the smmooth sailing of both staff and client alike. As such he has authorization to all necessary
                                aspects of the application and data that he may need to make the system work better
                            </p>
                            <ul className='flex flex-row gap-2'>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>customer</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>mechanic</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>teller</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>orders</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>goods</li>
                            </ul>
                            <Button variant="outline" className='self-end' onClick={() => setGroup('admin')}>Manage</Button>
                        </li>
                        <li className='max-w-[700px] flex flex-col gap-3 border-b border-b-pri-6 p-4 items-start justify-start'>
                            <h3 className="text-lg text-pri-6 font-semibold font-quicksand">Mechanic</h3>
                            <p className='font-lato'>
                                The Admin is an administrator in the organization. He is capable and responsible for managing
                                and ensuring the smmooth sailing of both staff and client alike. As such he has authorization to all necessary
                                aspects of the application and data that he may need to make the system work better
                            </p>
                            <ul className='flex flex-row gap-2'>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>customer</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>mechanic</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>teller</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>orders</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>goods</li>
                            </ul>
                            <Button variant="outline" className='self-end' onClick={() => setGroup('admin')}>Manage</Button>
                        </li>
                        <li className='max-w-[700px] flex flex-col gap-3 border-b border-b-pri-6 p-4 items-start justify-start'>
                            <h3 className="text-lg text-pri-6 font-semibold font-quicksand">Teller</h3>
                            <p className='font-lato'>
                                The Admin is an administrator in the organization. He is capable and responsible for managing
                                and ensuring the smmooth sailing of both staff and client alike. As such he has authorization to all necessary
                                aspects of the application and data that he may need to make the system work better
                            </p>
                            <ul className='flex flex-row gap-2'>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>customer</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>mechanic</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>teller</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>orders</li>
                                <li className='bg-acc-6 text-black w-auto p-1 px-2 text-sm rounded-md'>goods</li>
                            </ul>
                            <Button variant="outline" className='self-end' onClick={() => setGroup('admin')}>Manage</Button>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="md:p-[30px] p-3 max-w-[700px]">
                    <MoveLeft
                        className='cursor-pointer transition-transform active:scale-90 text-pri-6'
                        size={24} strokeWidth={2}
                        onClick={() => setGroup('')} />

                    <div className='w-full flex flex-col items-start justify-start gap-4'>
                        <div className='w-full'>
                            <h3 className="text-lg text-pri-6 font-semibold font-rambla">Name</h3>
                            <input placeholder='Admin' className='w-full border border-neu-3 rounded-md p-2' />
                        </div>
                        <div className='w-full'>
                            <h3 className="text-lg text-pri-6 font-semibold font-rambla">Description</h3>
                            <textarea
                                placeholder='Admin description'
                                className='w-full border border-neu-3 rounded-md resize-none p-3 max-h-[150px] focus:outline-none focus:border-pri-6'
                            ></textarea>
                        </div>
                        {renderCheckboxes()}
                        <Button onClick={handleSave} className="mt-4">Save</Button>
                        <div>
                            <h3 className="text-lg text-pri-6 font-semibold font-rambla">Delete Role</h3>
                            <div className="flex flex-row justify-between items-center gap-3">
                                <span>This will delete this role/group from the system. Any one with this group will lose all permissions
                                    associated with it. This action is <span text-red-500>permanent</span></span>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">Delete this role</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete 
                                                ths role and deactivate all permissions associated with it
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <div className="flex flex-row flex-wrap justify-evenly items-center gap-4">
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction asChild className="bg-red-500">
                                                <Button variant="destructive">Delete</Button>
                                            </AlertDialogAction>
                                        </div>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Roles;