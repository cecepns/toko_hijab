import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '../components/products/ProductGrid';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import { Product, Category } from '../types';
import { BgAboutMe, Talent3BlackAndWhite } from '../assets';

// Add testimonials data
const testimonials = [
  {
    id: 1,
    name: "Siti Aminah",
    role: "Pengusaha",
    image: "https://i.pravatar.cc/150?img=1",
    text: "Kualitas hijab Isavra Label sangat premium dan nyaman dipakai. Desainnya elegan dan timeless."
  },
  {
    id: 2,
    name: "Nurul Hidayah",
    role: "Dokter",
    image: "https://i.pravatar.cc/150?img=2",
    text: "Saya sangat puas dengan koleksi Isavra Label. Materialnya berkualitas dan tahan lama."
  },
  {
    id: 3,
    name: "Dewi Lestari",
    role: "Guru",
    image: "https://i.pravatar.cc/150?img=3",
    text: "Hijab dari Isavra Label selalu menjadi pilihan saya untuk acara formal. Sangat elegan dan nyaman."
  }
];

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoryData = await categoryService.getAllCategories();
        setCategories(categoryData);

        // Fetch featured products
        const featured = await productService.getFeaturedProducts();
        setFeaturedProducts(featured);

        // Fetch all products or filtered by category
        let productData;
        if (activeCategory === 'all') {
          productData = await productService.getAllProducts();
        } else {
          productData = await productService.getProductsByCategory(activeCategory);
        }

        setProducts(productData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-contain bg-no-repeat bg-bottom md:bg-x-100 bg-y-110" style={{ backgroundImage: `url(${Talent3BlackAndWhite})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-500 to-transparent"></div>
        </div>

        <div className="mx-4 lg:mx-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-white mb-6">Selamat Datang di <br/> IsavraLabel</h1>
            <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
              Temukan koleksi cantik busana sederhana kami yang dirancang dengan mengutamakan keanggunan dan kenyamanan.
            </p>
            <a href="#products" className="btn btn-primary text-lg px-8 py-3">
              Explore Collection
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-14 md:py-24 bg-white"
        variants={sectionVariants}
        initial
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-4 lg:mx-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
              }}
            >
              <h2 className="mb-6 text-4xl font-bold">Tentang Kami</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Isavra Label adalah brand fashion hijab asal Bandung yang menghadirkan koleksi eksklusif bagi wanita karier dan perempuan modern yang mengutamakan kualitas, keanggunan, dan penampilan berkelas. Dengan slogan "Elegansi yang Melekat," Isavra Label memposisikan diri sebagai merek hijab luxury yang mengusung desain khas, terbatas, dan dibuat dari material premium dengan detail yang halus dan elegan. Menggabungkan unsur eksklusivitas, keunikan, dan cita rasa tinggi, Isavra Label hadir sebagai simbol gaya hidup perempuan modern yang percaya diri dan berkelas.
              </p>
              <div className="flex space-x-4">
                <a href="#products" className="btn btn-primary">
                  Explore Produk
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
              }}
              className="relative h-56 md:h-[500px] rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src={BgAboutMe}
                alt="About Isavra Label"
                className="absolute inset-0 w-full h-full object-cover grayscale"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>


      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <motion.section
          className="py-16 bg-gray-50"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="mb-4">Koleksi Unggulan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Pilihan cermat kami berupa hijab premium yang mewujudkan keanggunan dan gaya.
              </p>
            </div>

            <ProductGrid
              products={featuredProducts}
              loading={loading}
              emptyMessage="Featured products will be available soon."
            />
          </div>
        </motion.section>
      )}


      {/* All Products Section */}
      <motion.section
        id="products"
        className="py-16"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Produk</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Telusuri koleksi hijab terbaik kami.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 text-sm md:text-base rounded-full transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id.toString())}
                className={`px-4 py-2 text-sm md:text-base rounded-full transition-colors ${
                  activeCategory === category.id.toString()
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <ProductGrid
            products={products}
            loading={loading}
            emptyMessage={`No products found in "${activeCategory}" category.`}
          />
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 bg-gray-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Apa Kata Mereka</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Testimoni dari pelanggan setia Isavra Label
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-lg"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default HomePage;