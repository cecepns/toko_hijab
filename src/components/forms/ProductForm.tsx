import React, { useState } from 'react';
import { Product, Category } from '../../types';
import { compressImage } from '../../utils/imageCompression';

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (productData: FormData) => void;
  isSubmitting: boolean;
  categories: Category[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData = {},
  onSubmit,
  isSubmitting,
  categories
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    featured: false,
    ...initialData
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData.imageUrl ? `https://api.isavralabel.com${initialData.imageUrl}` : '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('Selected file:', file); // Debug log

    try {
      // Compress the image
      const compressedFile = await compressImage(file);
      console.log('Compressed file:', compressedFile); // Debug log
      setImageFile(compressedFile);

      // Create preview URL
      const previewUrl = URL.createObjectURL(compressedFile);
      setImagePreview(previewUrl);

      // Clear any previous image errors
      if (errors.image) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error processing image:', error);
      setErrors((prev) => ({
        ...prev,
        image: 'Error processing image. Please try again.'
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!imageFile && !initialData.imageUrl) {
      newErrors.image = 'Product image is required';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'Product category is required';
    }

    if (formData.price === undefined || formData.price <= 0) {
      newErrors.price = 'Product price must be greater than 0';
    }

    if (formData.stock === undefined || formData.stock < 0) {
      newErrors.stock = 'Product stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const submitData = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Convert featured boolean to integer (0 or 1)
          if (key === 'featured') {
            submitData.append(key, value ? '1' : '0');
          } else {
            submitData.append(key, value.toString());
          }
        }
      });

      // Append image file if it exists
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      onSubmit(submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`input ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className={`input ${errors.categoryId ? 'border-red-500' : ''}`}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className={`input ${errors.description ? 'border-red-500' : ''}`}
          placeholder="Enter product description"
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`input ${errors.price ? 'border-red-500' : ''}`}
            placeholder="0.00"
          />
          {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            className={`input ${errors.stock ? 'border-red-500' : ''}`}
            placeholder="0"
          />
          {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Product Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className={`input ${errors.image ? 'border-red-500' : ''}`}
        />
        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Product preview"
              className="w-40 h-40 object-cover border rounded-md"
            />
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleCheckboxChange}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
          Featured product
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full md:w-auto"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span>{initialData.id ? 'Update Product' : 'Create Product'}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;