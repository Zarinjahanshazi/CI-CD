'use client';

import { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X, Package } from 'lucide-react';

export default function App() {
  // Initial chocolate data (JSON format)
  const [chocolates, setChocolates] = useState([
    {
      id: 1,
      name: "Dark Chocolate Truffle",
      price: 5.99,
      description: "Rich dark chocolate with smooth truffle center",
      image: "https://placehold.co/300x200/3b82f6/ffffff?text=Dark+Truffle"
    },
    {
      id: 2,
      name: "Milk Chocolate Caramel",
      price: 4.99,
      description: "Creamy milk chocolate filled with gooey caramel",
      image: "https://placehold.co/300x200/8b5cf6/ffffff?text=Milk+Caramel"
    },
    {
      id: 3,
      name: "White Chocolate Raspberry",
      price: 6.49,
      description: "Sweet white chocolate with tangy raspberry filling",
      image: "https://placehold.co/300x200/ec4899/ffffff?text=White+Raspberry"
    },
    {
      id: 4,
      name: "Hazelnut Crunch",
      price: 7.25,
      description: "Milk chocolate with roasted hazelnut pieces",
      image: "https://placehold.co/300x200/f59e0b/ffffff?text=Hazelnut+Crunch"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const chocolateData = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image || `https://placehold.co/300x200/10b981/ffffff?text=${encodeURIComponent(formData.name)}`
    };

    if (editingId) {
      // Update existing chocolate
      setChocolates(chocolates.map(choc => 
        choc.id === editingId 
          ? { ...choc, ...chocolateData }
          : choc
      ));
    } else {
      // Add new chocolate
      const newChocolate = {
        ...chocolateData,
        id: Math.max(...chocolates.map(c => c.id)) + 1 || 1
      };
      setChocolates([...chocolates, newChocolate]);
    }

    // Reset form
    setFormData({ name: '', price: '', description: '', image: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (chocolate) => {
    setEditingId(chocolate.id);
    setFormData({
      name: chocolate.name,
      price: chocolate.price.toString(),
      description: chocolate.description,
      image: chocolate.image
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setChocolates(chocolates.filter(choc => choc.id !== id));
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', price: '', description: '', image: '' });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3">
            <Package className="w-8 h-8" />
            <h1 className="text-4xl font-bold">🍫 Sweet Delights Chocolate Shop</h1>
          </div>
          <p className="text-center text-amber-100 text-lg mt-2">Handcrafted chocolates made with love</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-full px-6 py-2 shadow-md">
            <span className="text-lg font-semibold text-gray-700">
              Total Chocolates: <span className="text-amber-600">{chocolates.length}</span>
            </span>
          </div>
        </div>

        {/* Add New Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleAddNew}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Chocolate
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingId ? 'Edit Chocolate' : 'Add New Chocolate'}
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Chocolate Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter chocolate name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter price"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter description"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Enter image URL or leave blank for placeholder"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Save size={20} />
                      {editingId ? 'Update Chocolate' : 'Add Chocolate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Chocolate Grid */}
        {chocolates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {chocolates.map((chocolate) => (
              <div
                key={chocolate.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={chocolate.image}
                    alt={chocolate.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
                    <span className="text-lg font-bold text-amber-600">${chocolate.price.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{chocolate.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{chocolate.description}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(chocolate)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(chocolate.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors duration-200"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍫</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No chocolates yet!</h3>
            <p className="text-gray-500 mb-6">Add your first chocolate to get started.</p>
            <button
              onClick={handleAddNew}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Add Your First Chocolate
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 Sweet Delights Chocolate Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
