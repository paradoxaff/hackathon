'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUserAlt, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { client } from "@/sanity/lib/client";

// Define the Product type
type Product = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Sanity on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "food"]{ _id, name }`;
      const products = await client.fetch<Product[]>(query);
      setProducts(products);
    };

    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    if (query) {
      const filteredProducts = products
        .filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 results
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-24">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <Link href="/Menu" className="hover:text-orange-500">
            Menu
          </Link>
          <Link href="/Blog" className="hover:text-orange-500">
            Blog
          </Link>
          <div className="relative group">
            <Link href="/About" className="hover:text-orange-500">
              About
            </Link>
            {/* Dropdown */}
            <div className="absolute hidden group-hover:block bg-gray-800 text-white py-2 rounded">
              <Link href="/About" className="block px-4 py-1 hover:bg-gray-700">
                About Us
              </Link>
              <Link href="/ChefTeam" className="block px-4 py-1 hover:bg-gray-700">
                Our Team
              </Link>
            </div>
          </div>
          <Link href="/Shop" className="hover:text-orange-500">
            Shop
          </Link>
          <Link href="/SignUp" className="hover:text-orange-500">
            Contact
          </Link>
        </nav>

        {/* Logo (Centered) */}
        <div className="text-center md:mb-10">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            Food<span className="text-white">tuck</span>
          </Link>
        </div>

        {/* Search, Cart, and Auth Icons (Right-Aligned) */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-orange-500 z-10" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-900 text-white px-4 py-2 pl-10 rounded-full focus:outline-none border border-orange-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            {/* Display search results */}
            {searchResults.length > 0 && (
              <div className="absolute top-12 left-0 bg-gray-800 text-white w-full rounded-lg shadow-lg z-20">
                {searchResults.map((product) => (
                  <Link
                    key={product._id}
                    href={`/detail/${product._id}`} // Use the product slug for routing
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link href="/Cart">
            <button className="text-white-500">
              <FaShoppingCart size={20} />
            </button>
          </Link>

          {/* User Icon */}
          <Link href="/SignUp">
            <button className="text-white-500">
              <FaUserAlt size={20} />
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="lg:hidden text-orange-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-900 px-6 py-4 space-y-4">
          <Link href="/" className="block hover:text-orange-500">
            Home
          </Link>
          <Link href="/Menu" className="block hover:text-orange-500">
            Menu
          </Link>
          <Link href="/Blog" className="block hover:text-orange-500">
            Blog
          </Link>
          <Link href="/About" className="block hover:text-orange-500">
            About
          </Link>
          <Link href="/Shop" className="block hover:text-orange-500">
            Shop
          </Link>
          <Link href="/SignUp" className="block hover:text-orange-500">
            Contact
          </Link>

          {/* Search Bar (Mobile) */}
          <div className="relative flex items-center">
            <FaSearch className="absolute left-3 text-orange-500 z-10" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-900 text-white px-4 py-2 pl-10 rounded-full focus:outline-none border border-orange-500"
              value={searchQuery}
              onChange={handleSearch}
            />
            {/* Display search results */}
            {searchResults.length > 0 && (
              <div className="absolute top-12 left-0 bg-gray-800 text-white w-full rounded-lg shadow-lg z-20">
                {searchResults.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.name}`} // Use the product slug for routing
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Icons (Mobile) */}
          <div className="flex justify-around mt-4 space-x-4">
            <Link href="/Cart">
              <button className="text-white-500">
                <FaShoppingCart size={20} />
              </button>
            </Link>
            <Link href="/SignUp">
              <button className="text-white-500">
                <FaUserAlt size={20} />
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}