

export default function Order ({ params }: {params: {orderId: string }}) {
    return (
        <h1 className="text-xl">
            Order {params.orderId}
        </h1>
    )
}