import React, { useEffect, useState } from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Banner from '@components/Banner'
import foodImg1 from '@assets/fast.png'
import foodImg2 from '@assets/foodhome.png'
import cakeImg from '@assets/cake.png'
import drinImg from '@assets/drink.png'
import CardCategory from '@components/CardCategory'
import CardProduct from '@components/CardProduct'
import Product1Img from '@assets/product1.png'
import Product2Img from '@assets/product2.png'
import Product3Img from '@assets/product3.png'
import Product4Img from '@assets/product4.png'
import Product5Img from '@assets/product5.png'
import Product6Img from '@assets/product6.png'
import Product7Img from '@assets/product7.png'
import Product8Img from '@assets/product8.png'

const HomePage = () => {
    const categories = [
        {
            title: 'Fast Food',
            imgSrc: foodImg1,
            linkHref: '/category',
        },
        {
            title: 'Home Food',
            imgSrc: foodImg2,
            linkHref: '/category',
        },
        {
            title: 'Cake',
            imgSrc: cakeImg,
            linkHref: '/category',
        },
        {
            title: 'Drinks',
            imgSrc: drinImg,
            linkHref: '/category',
        },
    ]
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
            <Banner />
            <div className='flex flex-col max-w-full min-h-screen mt-10'>
                <div className='flex items-center w-40 px-4 mx-2 md:mx-[70px] text-center text-white rounded-md h-11 bg-primary'>
                    <p className='font-semibold'>Food Category</p>
                </div>
                <div className='grid grid-cols-2 mx-10 my-10 md:grid-cols-4'>
                    {categories.map((item, index) => (
                        <CardCategory
                            key={index}
                            imgSrc={item.imgSrc}
                            title={item.title}
                            linkHref={item.linkHref}
                        />
                    ))}
                </div>
                <div className='mt-10 text-center '>
                    <p className='text-3xl font-bold text-primary'>All Foods</p>
                </div>
                <div className='px-4 mt-10 text-center'>
                    <form action='#'>
                        <input
                            type='text'
                            className='w-[75%] px-2 py-4 text-primary font-normal focus:ring-primary focus:ring-1 focus:outline-none rounded-lg'
                            placeholder='Search Food...'
                        />
                        <button className='px-5 py-3 mx-2 text-lg font-semibold text-white rounded-lg bg-primary'>
                            Search
                        </button>
                    </form>
                </div>
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
            </div>

            <Footer />
        </>
    )
}

export default HomePage
