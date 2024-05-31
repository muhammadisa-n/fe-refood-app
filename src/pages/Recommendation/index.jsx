import React, { useState } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import CardProduct from '../../components/CardProduct'
import Product1Img from '@assets/product1.png'
import Product2Img from '@assets/product2.png'
import Product3Img from '@assets/product3.png'
import Product4Img from '@assets/product4.png'
import Product5Img from '@assets/product5.png'
import Product6Img from '@assets/product6.png'
import Product7Img from '@assets/product7.png'
import Product8Img from '@assets/product8.png'
const RecommendationPage = () => {
    const [isOpen, setIsOpen] = useState(false)

    const products = [
        {
            imgSrc: Product1Img,
            name: 'Product 1',
            linkHref: '/product/detail/1',
            price: '25.000,00',
        },
        {
            imgSrc: Product2Img,
            name: 'Product 2',
            linkHref: '/product/detail/2',
            price: '25.000,00',
        },
        {
            imgSrc: Product3Img,
            name: 'Product 3',
            linkHref: '/product/detail/3',
            price: '35.000,00',
        },
        {
            imgSrc: Product4Img,
            name: 'Product 4',
            linkHref: '/product/detail/4',
            price: '15.000,00',
        },
        {
            imgSrc: Product5Img,
            name: 'Product 5',
            linkHref: '/product/detail/5',
            price: '45.000,00',
        },
        {
            imgSrc: Product6Img,
            name: 'Product 6',
            linkHref: '/product/detail/6',
            price: '50.000,00',
        },
        {
            imgSrc: Product7Img,
            name: 'Product 7',
            linkHref: '/product/detail/7',
            price: '25.000,00',
        },
        {
            imgSrc: Product8Img,
            name: 'Product 8',
            linkHref: '/product/detail/8',
            price: '25.000,00',
        },
    ]

    return (
        <>
            <Header />
            <div className='flex flex-col max-w-full min-h-screen mt-10'>
                <div className='grid grid-cols-4'>
                    <div className='px-4 mt-10 text-center mx-10'>
                        <select
                            name='option1'
                            id='option1'
                            className='w-full px-3 py-3 text-sm border rounded-lg text-white font-semibold bg-primary'>
                            <option value='' id='option1'>
                                Bahan Makanan
                            </option>
                            <option value='' id='option1'>
                                Daging
                            </option>
                            <option value='' id='option1'>
                                Sayuran
                            </option>
                            <option value='' id='option1'>
                                Ikan
                            </option>
                        </select>
                    </div>
                    <div className='px-4 mt-10 text-center mx-10'>
                        <select
                            name='option2'
                            id='option2'
                            className='w-full px-3 py-3 text-sm border rounded-lg text-white font-semibold bg-primary'>
                            <option value='' id='option2'>
                                Jenis Masakan
                            </option>
                            <option value='' id='option2'>
                                Panggang
                            </option>
                            <option value='' id='option2'>
                                Rebus
                            </option>
                            <option value='' id='option1'>
                                Goreng
                            </option>
                        </select>
                    </div>
                    <div className='px-4 mt-10 text-center mx-10'>
                        <select
                            name='option3'
                            id='option3'
                            className='w-full px-3 py-3 text-sm border  text-white font-semibold bg-primary rounded-lg'>
                            <option value='' id='option2'>
                                Jenis Makanan
                            </option>
                            <option value='' id='option2'>
                                Makanan Cepat Saji
                            </option>
                            <option value='' id='option2'>
                                Makanan Rumahan
                            </option>
                        </select>
                    </div>
                    <div className='px-4 mt-10 text-center mx-10'>
                        <button
                            className='w-full px-3 py-3 text-sm border rounded-lg text-white font-semibold bg-primary'
                            onClick={() => setIsOpen(!isOpen)}>
                            Go
                        </button>
                    </div>
                </div>

                {isOpen ? (
                    <div className='grid grid-cols-3 mx-10 my-10 md:grid-cols-4'>
                        {products.map((item, index) => (
                            <CardProduct
                                key={index}
                                imgSrc={item.imgSrc}
                                name={item.name}
                                price={item.price}
                                linkHref={item.linkHref}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='mx-10 my-10 md:grid-cols-4'>
                        <h5 className='text-center text-slate-400 text-4xl'>
                            Product Not Found
                        </h5>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default RecommendationPage
