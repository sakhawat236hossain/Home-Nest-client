import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateProperty = () => {
  const updateProperty = useLoaderData();
  const navigate = useNavigate();

  const {
    propertyName,
    category,
    price,
    location,
    imageLink,
    description,
    userName,
    userEmail,
    _id,
  } = updateProperty;

  const handleUpdateProperty = (e) => {
    e.preventDefault();
    const form = e.target;

    const newProperty = {
      propertyName: form.propertyName.value,
      description: form.description.value,
      category: form.category.value,
      price: Number(form.price.value),
      location: form.location.value,
      imageLink: form.imageLink.value,
      userName,
      userEmail,
    };

    fetch(`http://localhost:8000/updateProperty/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "✅ Property Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/propertyDetails/${_id}`);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to Update Property!",
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 
    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
    rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 my-12">

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold bg-clip-text text-transparent 
        bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Update Property 🏡
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
          Modify details and keep it up to date
        </p>
      </div>

      <form onSubmit={handleUpdateProperty} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Property Name */}
        <div>
          <label className="text-sm font-medium text-blue-700 mb-1 block">Property Name</label>
          <input
            name="propertyName"
            type="text"
            defaultValue={propertyName}
            placeholder="Enter Property Name"
            className="input-style h-10"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-blue-700 mb-1 block">Category</label>
          <select
            name="category"
            required
            defaultValue={category}
            className="input-style"
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm font-medium text-blue-700 mb-1 block">Price</label>
          <input
            name="price"
            type="number"
            defaultValue={price}
            placeholder="Enter price"
            className="input-style h-10"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-blue-700 mb-1 block">Location</label>
          <input
            name="location"
            type="text"
            defaultValue={location}
            placeholder="Enter Location"
            className="input-style h-10"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-blue-700 mb-1 block">Image URL</label>
          <input
            name="imageLink"
            type="text"
            defaultValue={imageLink}
            placeholder="Enter Image URL"
            className="input-style h-10"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-blue-700 mb-1 block">Description</label>
          <textarea
            name="description"
            defaultValue={description}
            placeholder="Write Description..."
            className="input-style h-24"
          ></textarea>
        </div>

        {/* User Name */}
        <div>
          <label className="text-sm font-medium text-blue-700 mb-1 block">User Name</label>
          <input
            type="text"
            readOnly
            defaultValue={userName}
            className="input-style h-10 bg-gray-200/80 dark:bg-gray-700/70 cursor-not-allowed"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="text-sm font-medium text-blue-700 mb-1 block">User Email</label>
          <input
            type="email"
            readOnly
            defaultValue={userEmail}
            className="input-style h-10 bg-gray-200/80 dark:bg-gray-700/70 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 
          text-white font-semibold rounded-xl shadow-lg 
          hover:shadow-indigo-400/50 hover:scale-[1.02] 
          active:scale-95 transition-all duration-300"
        >
           Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
