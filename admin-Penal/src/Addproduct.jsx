import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  PackagePlus,
  ImagePlus,
  Trash2,
  Folder,
  Save,
} from "lucide-react";
import { AdminCotext } from "./AdminCotext";

function AddProduct() {
  const {
    tooken,
    SingleProduct,
    clearSingleProduct,
    fetchProducts,
    product ,setProduct
  } = useContext(AdminCotext);


  

  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);

  /* ================= PREFILL UPDATE ================= */
  useEffect(() => {
    if (SingleProduct) {
      console.log(SingleProduct);
      
      setProduct({
        name: SingleProduct.name || "",
        price: SingleProduct.price || "",
        category: SingleProduct.category || "Men",
        subcategory: SingleProduct.subcategory || "Top Wear",
        sizes: SingleProduct.sizes || [],
        stock: SingleProduct.stock || "",
        featured: SingleProduct.featured || false,
        status: SingleProduct.status || "Active",
        des: SingleProduct.des || "",
        bestseller : true
      });


      setImages([
        SingleProduct.images?.[0] || null,
        SingleProduct.images?.[1] || null,
        SingleProduct.images?.[2] || null,
        SingleProduct.images?.[3] || null,
      ]);
    }
  }, [SingleProduct]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProduct((prev) => ({ ...prev, [name]: checked }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeToggle = (size) => {
    setProduct((prev) => {
      const sizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes };
    });
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated[index] = null;
    setImages(updated);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Append all product fields
      Object.entries(product).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value)); // sizes as JSON
        } else if (typeof value === "boolean") {
          formData.append(key, value ? "true" : "false"); // featured boolean
        } else {
          formData.append(key, value);
        }
      });

      // Append images
      images.forEach((img) => {
        if (img && typeof img !== "string") {
          formData.append("images", img);
        }
      });

      const url = SingleProduct
        ? `http://localhost:8000/api/product/updateproduct/${SingleProduct._id}`
        : "http://localhost:8000/api/product/addnewproduct";

      const method = SingleProduct ? "put" : "post";

      const res = await axios({
        method,
        url,
        data: formData,
        headers: { authorization: `Bearer ${tooken}` },
      });

      if (res.data.success || res.data.status) {
        alert(
          SingleProduct
            ? "Product updated successfully ✅"
            : "Product added successfully ✅"
        );

        fetchProducts();
        clearSingleProduct();

        // Reset form
        setProduct({
          name: "",
          price: "",
          category: "Men",
          subcategory: "Top Wear",
          sizes: [],
          stock: "",
          featured: false,
          status: "Active",
          des: "",
        });
        setImages([null, null, null, null]);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Product save failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#f6f7fb] px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 rounded-2xl bg-black text-white">
            <PackagePlus size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">
              {SingleProduct ? "Update Product" : "Add New Product"}
            </h1>
            <p className="text-gray-500">
              {SingleProduct
                ? "Edit and update product"
                : "Create and publish a product"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Images */}
          <section className="bg-white p-8 rounded-3xl border">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <ImagePlus /> Product Images
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative h-44 rounded-2xl border border-dashed bg-gray-50"
                >
                  {img ? (
                    <>
                      <img
                        src={
                          typeof img === "string"
                            ? img
                            : URL.createObjectURL(img)
                        }
                        className="h-full w-full object-cover rounded-2xl"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full hover:bg-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <label className="h-full flex flex-col items-center justify-center cursor-pointer text-gray-400">
                      <ImagePlus />
                      <span className="text-sm">Upload</span>
                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(i, e)}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Product Info */}
          <section className="bg-white p-8 rounded-3xl border">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Folder /> Product Information
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleChange}
              />
              <Input
                label="Price"
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
              <Input
                label="Stock Quantity"
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
              />

              {/* Category / Subcategory */}
              <Select
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
                options={["Men", "Women", "Kids"]}
              />
              <Select
                label="Sub Category"
                name="subcategory"
                value={product.subcategory}
                onChange={handleChange}
                options={["Top Wear", "Bottom Wear"]}
              /> 

                <Select
                  label="Status"
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                  options={["Active", "Unactive"]}
                />

              {/* Sizes */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sizes
                </label>
                <div className="flex gap-3">
                  {["S", "M", "L"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`px-4 py-2 rounded-xl border ${
                        product.sizes.includes(size)
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-700 border-gray-300"
                      } transition`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured / Status */}
              <div className="flex gap-6 sm:col-span-2 items-center mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={product.featured}
                    onChange={handleChange}
                    className="w-5 h-5 accent-black"
                  />
                  <span>Featured Product</span>
                </label>

              
              </div>

              <textarea
                name="des"
                value={product.des}
                onChange={handleChange}
                placeholder="Product description"
                className="sm:col-span-2 bg-gray-100 rounded-2xl px-4 py-4 outline-none resize-none h-32"
              />
            </div>
          </section>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-white border p-6 rounded-2xl flex justify-end">
            <button
              disabled={loading}
              className="flex items-center gap-3 bg-black text-white px-10 py-4 rounded-xl text-lg hover:bg-gray-900 disabled:opacity-60"
            >
              <Save size={20} />
              {loading
                ? "Publishing..."
                : SingleProduct
                ? "Update Product"
                : "Publish Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full bg-gray-100 rounded-2xl px-4 h-14 outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

/* SELECT */
function Select({ label, options, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        {...props}
        className="w-full bg-gray-100 rounded-2xl px-4 h-14 outline-none focus:ring-2 focus:ring-black"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddProduct;
