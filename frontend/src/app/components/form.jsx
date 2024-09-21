"use client"
import { useState } from "react";

export default function FormArtMint() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.value); // For simplicity; in a real app, you'd likely upload the image
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would call your minting function
        // Example: await mintArt(name, description, image, price);
        console.log("Minting Art:", { name, description, image, price });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={handleNameChange} required />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={handleDescriptionChange} required />
            </div>
            <div>
                <label>Image URL:</label>
                <input type="text" value={image} onChange={handleImageChange} required />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={handlePriceChange} required />
            </div>
            <button type="submit">Mint Art</button>
        </form>
    );
}
