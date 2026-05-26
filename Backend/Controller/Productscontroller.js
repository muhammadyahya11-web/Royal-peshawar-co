import cloudinary from "../Config/Cloudenery.js";
import Product from "../Module/ProductModule.js";
import User from "../Module/UUserModule.js";
// ======================FILE UPLOAD TO CLOUDENERY==============================================
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );
        stream.end(fileBuffer);
    });
};
// ======================ADD NEW PRODUCT API=========================================================
const addNewProduct = async (req, res) => {
    try {
        const { name,price , des, category, subcategory, bestseller , stock , featured , sizes ,status } = req.body;

        if (!req.files || req.files.length === 0)
            return res.status(400).json({ message: "Images required" });

        if (req.files.length > 4)
            return res.status(400).json({ message: "Max 4 images allowed" });

        const imageUrls = [];
        for (const file of req.files) {
            const result = await uploadToCloudinary(file.buffer);
            imageUrls.push(result.secure_url);
        }

        const product = await Product.create({
            name,
            featured ,
            stock ,
            status ,
            price,
            des,
            category,
            subcategory,
            bestseller: bestseller || false,
            sizes: sizes ? JSON.parse(sizes) : [],
            images: imageUrls,
        });

        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// ======================PRODUCT LIST API==================================================


const ProductList = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }

}
//=============================GET SINGAL PRODUCT========================================

const getSingalProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const singleProduct = await Product.findById(id);

    if (!singleProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      singleProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

// =========================REMOVE PRODUCT==================================================

const RemoveProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const ID =id.trim()
    const product = await Product.findById(ID);
  
    


    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not available"
      });
    }

    await Product.findByIdAndDelete(ID);

    return res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      product
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Product cannot be deleted  " ,
       
    });
  }
};
// ===============================================================================
const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not available",
      });
    }
   
   
    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,       
        runValidators: true,
      }
    );
    console.log("");
    
    return res.status(200).json({
      status: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      status: false,
      message: "Product cannot update",
      error: error.message,
    });
  }
};
// =======================PRODUCT STATUS CHANGE==================================================

const productStatus = async (req, res) => {
  try {
    const { id } = req.params;  
    
        
    const { status } = req.body;    

    if (!id) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    }

    if (!status) {
      return res.status(400).json({
        message: "Status is required"
      });
    }

    
    if (!["active", "unactive"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { status : status },
      { new: true }
    );
    console.log(updatedProduct.status);
    

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product status updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};



// =======================EXPORT ROUTES======================================================
export { addNewProduct, ProductList ,getSingalProduct ,RemoveProduct ,UpdateProduct, productStatus };
