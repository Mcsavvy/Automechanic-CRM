import { Fingerprint, UsersRound, Package, ReceiptText } from "lucide-react"
import React, { FC, useState } from "react"
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils';
import Log from '@/lib/types/log'
import ContactAvatar from '@/components/ui/contact-avatar'

const customMessages = {
    Buyer: {
        create: [
            " landed a new buyer: ",
            " added a new client: ",
            " registered a new buyer: "
        ],
        update: [
            " updated the details of ",
            " modified the profile of ",
            " changed the information of "
        ],
        delete: [
            " removed the buyer: ",
            " deleted the client: ",
            " erased the profile of "
        ]
    },
    Staff: {
        create: [
            " added a new staff member: ",
            " hired a new employee: ",
            " onboarded a new team member: "
        ],
        update: [
            " updated the details of ",
            " modified the profile of ",
            " changed the information of "
        ],
        delete: [
            " removed the staff member: ",
            " terminated the employee: ",
            " deleted the profile of "
        ]
    },
    Good: {
        create: [
            " added a new good: ",
            " introduced a new product: ",
            " listed a new item: "
        ],
        update: [
            " updated the inventory for ",
            " modified the details of ",
            " changed the information of "
        ],
        delete: [
            " removed the good: ",
            " deleted the product: ",
            " erased the item: "
        ]
    },
    Group: {
        create: [
            " created a new group: ",
            " formed a new team: ",
            " established a new unit: "
        ],
        update: [
            " updated the group details for ",
            " modified the information of ",
            " changed the details of "
        ],
        delete: [
            " deleted the group: ",
            " disbanded the team: ",
            " removed the unit: "
        ]
    },
    Order: {
        create: [
            " placed an order for ",
            " initiated a purchase for ",
            " made an order for "
        ],
        update: [
            " updated the order status for ",
            " modified the order details for ",
            " changed the order information for "
        ],
        delete: [
            " canceled the order for ",
            " voided the purchase for ",
            " deleted the order for "
        ]
    }
}
const getRandomMessage = (messages: string[]) => {
    return messages[Math.floor(Math.random() * messages.length)];
}
const parseLog = (log: Log) => {
    const data: any = {}
    data.message = getRandomMessage(customMessages[log.target][log.action])
    data.display = log.display
    data.createdAt = log.createdAt
    data.target = log.target
    data.action = log.action
    const { action_type, ...details } = log.details
    data.details = details
    switch (log.target) {
        case 'Buyer': {
            data.avatar = { name: log.display[1] }
            // data.link = 
            break
        }
        case 'Staff': {
            data.avatar = { icon: UsersRound }
            break
        }
        case 'Good': {
            data.avatar = { icon: Package }
            break
        }
        case 'Group': {
            data.avatar = { icon: Fingerprint }
            break
        }
        case 'Order': {
            data.avatar = { icon: ReceiptText }
            break
        }
    }
    return data
}
const LogItem: FC<Log> = (log) => {
    const [item, setItem] = useState(parseLog(log))
    return (
        <div className="flex flex-row gap-2">
            <div className='flex flex-col items-center justify-start gap-2'>
                <ContactAvatar {...item.avatar} size={40} />
                <span className="w-[3px] grow bg-neu-3 rounded-md "></span>
            </div>
            <div className="border-neu-3 p-3 py-2">
                <h3 className="text-neu-7 text-sm">{formatDateTime(item.createdAt, "time")}</h3>
                <Link href={`/inventory/customers/${log._id}`}>
                    <h3 className=' cursor-pointer text-[20px] font-semibold text-primary capitalize'>{item.display[1]}</h3>
                </Link>
                <div className="flex flex-row gap-2">
                    <span className="px-1 text-[12px] text-pri-3 border border-pri-3 lowercase">{item.action}</span>
                    <span className="px-1 text-[12px] text-pri-3 border border-pri-3 lowercase">{item.target}</span>
                </div>
                <p><span className="text-pri-6 font-normal">{item.display[0]}</span>{item.message}<span className="text-pri-6 font-semibold">{item.display[1]}</span></p>
                
                <p className='text-sm text-neu-5'>{formatDateTime(log.createdAt, "humanize")}</p>
            </div>
        </div>
    )
}

export default LogItem