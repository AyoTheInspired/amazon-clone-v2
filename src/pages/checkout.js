import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { selectTotal } from "../slices/basketSlice";

function Checkout() {
	const { items } = useSelector((state) => state.basket);
	const total = useSelector(selectTotal);
	const [session] = useSession();
	return (
		<div className="bg-gray-100">
			<Header />

			<main className="lg:flex max-w-screen-2xl mx-auto">
				<div className="flex-grow m-5 shadow-sm">
					<Image
						src="http://links.papareact.com/ikj"
						width={1020}
						height={250}
						objectFit="contain"
					/>

					<div className="flex flex-col p-5 space-y-10 bg-white">
						<h1 className="text-2xl font-semibold border-b pb-4">
							{items.length === 0 ? "Your Basket is Empty!" : "Shopping Basket"}
						</h1>

						{items.map((item, index) => (
							<CheckoutProduct
								key={index}
								id={item.id}
								title={item.title}
								rating={item.rating}
								price={item.price}
								description={item.description}
								category={item.category}
								image={item.image}
								hasPrime={item.hasPrime}
							/>
						))}
					</div>
				</div>

				<div className="flex flex-col p-10 bg-white shadow-md lg:mr-2">
					{items.length > 0 && (
						<>
							<h2 className="whitespace-nowrap">
								Subtotal: ({items.length} items){" "}
								<span className="font-bold">
									<Currency quantity={total} currency="GBP" />
								</span>
							</h2>

							<button
								disabled={!session}
								className={`button mt-2 ${
									!session &&
									"from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
								}`}>
								{!session ? "Sign in to Chckout" : "Proceed to Checkout"}
							</button>
						</>
					)}
				</div>
			</main>
		</div>
	);
}

export default Checkout;
