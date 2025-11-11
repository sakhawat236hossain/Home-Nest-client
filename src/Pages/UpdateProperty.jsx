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
        console.log("Updated:", data);

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "✅ Property Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

       
        navigate(`/propertyDetails/${_id}`);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " Failed to Update Property!",
        });
      });
  };

  return (
    <div
      className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 
    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
    rounded-2xl shadow-xl border border-blue-200 dark:border-gray-700 my-12"
    >
      <div className="mb-8 text-center">
        <h2
          className="text-3xl font-extrabold bg-clip-text text-transparent 
        bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
        >
          Update Property 🏡
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
          Modify details and keep it up to date
        </p>
      </div>

      <form
        onSubmit={handleUpdateProperty}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          name="propertyName"
          type="text"
          defaultValue={propertyName}
          className="input-style"
        />

        <div>
          <label className="text-sm font-medium text-blue-700 mb-1 block">
            Category
          </label>
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

        <input
          name="price"
          type="number"
          defaultValue={price}
          className="input-style"
        />

        <input
          name="location"
          type="text"
          defaultValue={location}
          className="input-style"
        />

        <input
          name="imageLink"
          type="text"
          defaultValue={imageLink}
          className="input-style md:col-span-2"
        />

        <textarea
          name="description"
          defaultValue={description}
          className="input-style md:col-span-2 h-28"
        ></textarea>

        <input
          type="text"
          readOnly
          defaultValue={userName}
          className="input-style bg-gray-200/80 dark:bg-gray-700/70 cursor-not-allowed"
        />

        <input
          type="email"
          readOnly
          defaultValue={userEmail}
          className="input-style bg-gray-200/80 dark:bg-gray-700/70 cursor-not-allowed"
        />

        <button
          type="submit"
          className="md:col-span-2 w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 
          text-white font-semibold rounded-xl shadow-lg 
          hover:shadow-indigo-400/50 hover:scale-[1.02] 
          active:scale-95 transition-all duration-300"
        >
          ✅ Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
