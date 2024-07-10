import Banner from '../components/Banner';
import Highlights from '../components/Highlights';
import Benefits from '../components/Benefits';
// import FeaturedProducts from '../components/FeaturedProducts';
import Footer from '../components/Footer';
import bannerimage from '../images/bannerimage.png';

export default function Home() {

	const data = {
        title: "TechPro",
        content: "Upgrade Your Tech Game: Unleash the Power of Savings",
        destination: "/products",
        label: "Shop Now!",
        imageUrl: bannerimage
    }

    return (
        <>
            <Banner data={data}/>
			<Highlights />
            <Benefits />
            {/* <FeaturedProducts /> */}
            <Footer />
		</>
	)
}