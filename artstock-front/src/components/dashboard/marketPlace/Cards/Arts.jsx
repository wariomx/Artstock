export default function CardArt() {
    const dummieCards = [
      {
        name: "Mona Lisa",
        description:
          "Wife of the Florentine merchant Francesco di Bartolomeo del Giocondo (ergo, the work’s alternative title, La Gioconda)",
        image: "mona-lisa.webp",
        price: "5 btc",
        isDeposited: "true",
        isCurated: "false",
        owner: "0xFD0Bb0b9F3B236F211033BCa5De04Cc0531B0250",
        author: "Leonardo Da Vinci",
      },
      {
        name: "Girl with a Pearl Earring",
        description:
          "Johannes Vermeer’s 1665 study of a young woman is startlingly real and startlingly modern, almost as if it were a photograph.",
        image: "girlPearl.webp",
        price: "3 btc",
        isDeposited: "true",
        isCurated: "true",
        owner: "0xFD0Bb0b9F3B236F211033BCa5De04Cc0531B0250",
        author: "Johannes Vermeer",
      },
      {
        name: "The Arnolfini Portrait",
        description:
          "One of the most significant works produced during the Northern Renaissance, this composition is believed to be one of the first paintings executed in oils.",
        image: "TheArnolfi.webp",
        price: "4 btc",
        isDeposited: "true",
        isCurated: "true",
        owner: "0xFD0Bb0b9F3B236F211033BCa5De04Cc0531B0250",
        author: "Jan van Eyck",
      },
    ];
  
    return (
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {dummieCards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 w-[230px] sm:w-[250px] flex flex-col"
          >
            <img
              src={card.image}
              alt={card.name}
              className="rounded-t-xl object-cover h-48 w-full"
            />
            <h3 className="mt-2 text-lg font-semibold text-gray-500">{card.name}</h3>
            <p className="text-sm text-gray-600">{card.author}</p>
            <p className="text-gray-500">{card.description}</p>
            <p className="mt-2 font-bold text-gray-500">{card.price}</p>
          </div>
        ))}
      </div>
    );
  }
  